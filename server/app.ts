import express from 'express'
import path from 'path'
import puppeteer from 'puppeteer'
import { createGoogleIdentityProvider, createMentorAuth, IdentityProvider, MentorRequest } from './auth'
import { ContentStore, ContentValidationError, createContentStore, NewProject } from './content'

type AppOptions = {
  contentStore?: ContentStore
  databaseFile?: string
  legacyScheduleFile?: string
  allowedEmails?: string[]
  sessionSecret?: string
  publicUrl?: string
  production?: boolean
  identityProvider?: IdentityProvider
  googleClientId?: string
  googleClientSecret?: string
  googleRedirectUri?: string
}

const emailsFromEnvironment = () =>
  (process.env.AUTH_ALLOWED_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)

export const createApp = (options: AppOptions = {}) => {
  const publicUrl = options.publicUrl ?? process.env.PUBLIC_URL ?? 'http://localhost:5173'
  const production = options.production ?? process.env.NODE_ENV === 'production'
  const googleClientId = options.googleClientId ?? process.env.GOOGLE_CLIENT_ID
  const googleClientSecret = options.googleClientSecret ?? process.env.GOOGLE_CLIENT_SECRET
  const googleRedirectUri = options.googleRedirectUri ?? process.env.GOOGLE_REDIRECT_URI ?? `${publicUrl}/auth/google/callback`
  const identityProvider =
    options.identityProvider ??
    (googleClientId && googleClientSecret
      ? createGoogleIdentityProvider({ clientId: googleClientId, clientSecret: googleClientSecret, redirectUri: googleRedirectUri })
      : undefined)
  const content =
    options.contentStore ??
    createContentStore(
      options.databaseFile ?? process.env.CONTENT_DATABASE_FILE ?? path.resolve(__dirname, '../data/codeclub.sqlite'),
      options.legacyScheduleFile ?? process.env.SCHEDULE_DATA_FILE,
    )
  const auth = createMentorAuth({
    allowedEmails: options.allowedEmails ?? emailsFromEnvironment(),
    sessionSecret: options.sessionSecret ?? process.env.SESSION_SECRET,
    publicUrl,
    production,
    identityProvider,
  })

  const app = express()
  app.use(express.static(path.resolve(__dirname, '../ui/build')))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(auth.router)

  app.get('/healthz', (_req, res) => {
    res.status(200).json({ status: 'ok' })
  })

  app.get('/api/schedule', (_req, res) => {
    res.set('Cache-Control', 'no-store')
    res.json(content.getSchedule())
  })

  app.put('/api/schedule', auth.requireSameOrigin, auth.requireMentor, (req, res) => {
    try {
      res.json(content.saveSchedule((req.body as { sessions?: unknown })?.sessions))
    } catch (error) {
      if (error instanceof ContentValidationError) return res.status(400).json({ message: error.message })
      throw error
    }
  })

  app.get('/api/projects', (_req, res) => {
    res.set('Cache-Control', 'no-store')
    res.json(content.listProjects())
  })

  app.post('/api/projects', auth.requireSameOrigin, auth.requireMentor, (req: MentorRequest, res) => {
    try {
      const project = content.addProject(req.body as NewProject, req.mentor!.subject)
      res.status(201).json(project)
    } catch (error) {
      if (error instanceof ContentValidationError) return res.status(400).json({ message: error.message })
      throw error
    }
  })

  app.get('/api', (_req, res) => {
    setTimeout(() => res.json({ message: 'Hello from server, buddy!' }), 500)
  })

  app.post('/api/scrape', auth.requireSameOrigin, auth.requireMentor, async (req, res) => {
    const { url } = req.body as { url?: unknown }
    if (typeof url !== 'string') return res.status(400).send('A URL is required')

    try {
      const parsedUrl = new URL(url)
      if (parsedUrl.protocol !== 'https:' || parsedUrl.hostname !== 'projects.raspberrypi.org') {
        return res.status(400).send('Only Raspberry Pi project URLs are supported')
      }
      const slug = (path.basename(parsedUrl.pathname) || 'screenshot').replace(/[^a-z0-9-_]/gi, '-')
      const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
      try {
        await browser.setCookie(
          {
            domain: 'projects.raspberrypi.org',
            name: 'CookieConsent',
            value:
              '{stamp:%27PLNUquZuahjJMTgLlcAwWIVqRTJLYviRbJV2qEKXPYrRWxlTN0cwDg==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:1%2Cutc:1655543841539%2Cregion:%27GB%27}',
          },
          { domain: 'projects.raspberrypi.org', name: 'surveyBannerHide', value: 'true' },
        )
        const page = await browser.newPage()
        await page.setViewport({ width: 1024, height: 768 })
        await page.goto(parsedUrl.href, { waitUntil: 'networkidle2' })
        await page.screenshot({ path: path.resolve(__dirname, `../ui/public/screenshot/${slug}.png`) })
        return res.json({ message: parsedUrl.href, slug })
      } finally {
        await browser.close()
      }
    } catch (reason: unknown) {
      return res.status(400).send(reason instanceof Error ? reason.message : 'Screenshot failed')
    }
  })

  app.get('/{*splat}', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../ui/build', 'index.html'))
  })

  app.use((error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    void next
    console.error(error)
    res.status(500).json({ message: 'The server could not complete that request.' })
  })

  return { app, auth, content, close: () => options.contentStore || content.close() }
}
