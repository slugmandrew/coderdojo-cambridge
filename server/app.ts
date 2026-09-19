import express from 'express'
import { mkdirSync, writeFileSync } from 'fs'
import { randomUUID } from 'crypto'
import path from 'path'
import puppeteer from 'puppeteer'
import { createGoogleIdentityProvider, createMentorAuth, IdentityProvider, MentorRequest } from './auth'
import { ContentStore, ContentValidationError, createContentStore, ProjectInput } from './content'

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
  projectImageDirectory?: string
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
  const databaseFile = options.databaseFile ?? process.env.CONTENT_DATABASE_FILE ?? path.resolve(__dirname, '../data/codeclub.sqlite')
  const content = options.contentStore ?? createContentStore(databaseFile, options.legacyScheduleFile ?? process.env.SCHEDULE_DATA_FILE)
  const projectImageDirectory =
    options.projectImageDirectory ?? path.resolve(path.dirname(databaseFile === ':memory:' ? 'data/codeclub.sqlite' : databaseFile), 'project-images')
  mkdirSync(projectImageDirectory, { recursive: true })
  const auth = createMentorAuth({
    allowedEmails: options.allowedEmails ?? emailsFromEnvironment(),
    sessionSecret: options.sessionSecret ?? process.env.SESSION_SECRET,
    publicUrl,
    production,
    identityProvider,
  })

  const app = express()
  app.use(express.static(path.resolve(__dirname, '../ui/build')))
  app.use('/project-images', express.static(projectImageDirectory, { fallthrough: false }))
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
      const project = content.addProject(req.body as ProjectInput, req.mentor!.subject)
      res.status(201).json(project)
    } catch (error) {
      if (error instanceof ContentValidationError) return res.status(400).json({ message: error.message })
      throw error
    }
  })

  app.patch('/api/projects/:slug', auth.requireSameOrigin, auth.requireMentor, (req, res) => {
    try {
      const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug
      res.json(content.updateProject(slug, req.body as ProjectInput))
    } catch (error) {
      if (error instanceof ContentValidationError) return res.status(error.message.includes('not be found') ? 404 : 400).json({ message: error.message })
      throw error
    }
  })

  app.post(
    '/api/project-images',
    auth.requireSameOrigin,
    auth.requireMentor,
    express.raw({ type: ['image/jpeg', 'image/png', 'image/webp'], limit: '2mb' }),
    (req, res) => {
      const contentType = req.get('Content-Type')?.split(';')[0]
      const extensions: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }
      const extension = contentType ? extensions[contentType] : undefined
      if (!extension || !Buffer.isBuffer(req.body) || req.body.length === 0) {
        return res.status(400).json({ message: 'Choose a JPEG, PNG, or WebP picture.' })
      }
      const signatures = {
        jpg: req.body[0] === 0xff && req.body[1] === 0xd8 && req.body[2] === 0xff,
        png: req.body.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
        webp: req.body.subarray(0, 4).toString() === 'RIFF' && req.body.subarray(8, 12).toString() === 'WEBP',
      }
      if (!signatures[extension as keyof typeof signatures]) return res.status(400).json({ message: 'The uploaded picture is not a valid image.' })

      const filename = `${randomUUID()}.${extension}`
      writeFileSync(path.join(projectImageDirectory, filename), req.body, { flag: 'wx' })
      res.status(201).json({ imageUrl: `/project-images/${filename}` })
    },
  )

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
