import { createHash, createHmac, randomBytes, timingSafeEqual } from 'crypto'
import { NextFunction, Request, RequestHandler, Router } from 'express'
import { CodeChallengeMethod, OAuth2Client } from 'google-auth-library'

export type Mentor = { subject: string; email: string; name?: string; picture?: string }

export type IdentityClaims = Mentor & { emailVerified: boolean }

export type IdentityProvider = {
  authorizationUrl(input: { state: string; nonce: string; codeChallenge: string }): string
  verifyCallback(input: { code: string; codeVerifier: string; nonce: string }): Promise<IdentityClaims>
}

export type MentorRequest = Request & { mentor?: Mentor }

type AuthOptions = {
  allowedEmails: string[]
  sessionSecret?: string
  publicUrl: string
  production: boolean
  identityProvider?: IdentityProvider
}

type OAuthTransaction = {
  state: string
  nonce: string
  codeVerifier: string
  returnTo: string
  expiresAt: number
}

type MentorSession = Mentor & { expiresAt: number }

const SESSION_COOKIE = 'club_session'
const OAUTH_COOKIE = 'club_oauth'
const twelveHours = 12 * 60 * 60 * 1_000
const tenMinutes = 10 * 60 * 1_000

const parseCookies = (header: string | undefined) =>
  Object.fromEntries(
    (header ?? '')
      .split(';')
      .map((part) => part.trim().split('='))
      .filter(([name, value]) => name && value)
      .map(([name, ...value]) => [name, decodeURIComponent(value.join('='))]),
  )

const cookie = (name: string, value: string, options: { maxAge: number; secure: boolean }) =>
  `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(options.maxAge / 1_000)}${options.secure ? '; Secure' : ''}`

const clearCookie = (name: string, secure: boolean) => `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? '; Secure' : ''}`

const sign = (value: unknown, secret: string) => {
  const payload = Buffer.from(JSON.stringify(value)).toString('base64url')
  const signature = createHmac('sha256', secret).update(payload).digest('base64url')
  return `${payload}.${signature}`
}

const verify = <T>(value: string | undefined, secret: string): T | undefined => {
  if (!value) return undefined
  const [payload, suppliedSignature] = value.split('.')
  if (!payload || !suppliedSignature) return undefined
  const expectedSignature = createHmac('sha256', secret).update(payload).digest()
  const supplied = Buffer.from(suppliedSignature, 'base64url')
  if (supplied.length !== expectedSignature.length || !timingSafeEqual(supplied, expectedSignature)) return undefined
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as T
  } catch {
    return undefined
  }
}

const safeReturnTo = (value: unknown) => (typeof value === 'string' && /^\/manage\/[a-z/-]+$/.test(value) ? value : '/manage/schedule')

export const createGoogleIdentityProvider = (input: { clientId: string; clientSecret: string; redirectUri: string }): IdentityProvider => {
  const client = new OAuth2Client({ clientId: input.clientId, clientSecret: input.clientSecret, redirectUri: input.redirectUri })
  return {
    authorizationUrl({ state, nonce, codeChallenge }) {
      return client.generateAuthUrl({
        access_type: 'online',
        scope: ['openid', 'email', 'profile'],
        prompt: 'select_account',
        state,
        nonce,
        code_challenge: codeChallenge,
        code_challenge_method: CodeChallengeMethod.S256,
      })
    },
    async verifyCallback({ code, codeVerifier, nonce }) {
      const { tokens } = await client.getToken({ code, codeVerifier })
      if (!tokens.id_token) throw new Error('Google did not return an identity token.')
      const ticket = await client.verifyIdToken({ idToken: tokens.id_token, audience: input.clientId })
      const payload = ticket.getPayload()
      if (!payload?.sub || !payload.email || payload.nonce !== nonce) throw new Error('Google returned an invalid identity.')
      return {
        subject: payload.sub,
        email: payload.email,
        emailVerified: payload.email_verified === true,
        ...(payload.name ? { name: payload.name } : {}),
        ...(payload.picture ? { picture: payload.picture } : {}),
      }
    },
  }
}

export const createMentorAuth = (options: AuthOptions) => {
  const router = Router()
  const allowedEmails = new Set(options.allowedEmails.map((email) => email.trim().toLowerCase()).filter(Boolean))
  const configured = Boolean(options.identityProvider && options.sessionSecret && options.sessionSecret.length >= 32 && allowedEmails.size > 0)
  const expectedOrigin = new URL(options.publicUrl).origin

  const currentMentor = (req: Request): Mentor | undefined => {
    if (!configured || !options.sessionSecret) return undefined
    const session = verify<MentorSession>(parseCookies(req.get('cookie'))[SESSION_COOKIE], options.sessionSecret)
    if (!session || session.expiresAt <= Date.now() || !allowedEmails.has(session.email.toLowerCase())) return undefined
    return {
      subject: session.subject,
      email: session.email,
      ...(session.name ? { name: session.name } : {}),
      ...(session.picture ? { picture: session.picture } : {}),
    }
  }

  const requireMentor: RequestHandler = (req: MentorRequest, res, next) => {
    const mentor = currentMentor(req)
    if (!mentor) return res.status(401).json({ message: 'Sign in with an approved mentor account to make changes.' })
    req.mentor = mentor
    next()
  }

  const requireSameOrigin: RequestHandler = (req, res, next) => {
    const origin = req.get('origin')
    if (!origin || origin !== expectedOrigin) return res.status(403).json({ message: 'This request did not come from the Code Club site.' })
    next()
  }

  router.get('/api/auth/me', (req, res) => {
    const mentor = currentMentor(req)
    res.set('Cache-Control', 'no-store')
    res.json({ configured, authenticated: Boolean(mentor), ...(mentor ? { mentor } : {}) })
  })

  router.get('/auth/google', (req, res) => {
    if (!configured || !options.sessionSecret || !options.identityProvider) {
      return res.status(503).send('Mentor sign-in has not been configured.')
    }
    const codeVerifier = randomBytes(32).toString('base64url')
    const transaction: OAuthTransaction = {
      state: randomBytes(32).toString('base64url'),
      nonce: randomBytes(32).toString('base64url'),
      codeVerifier,
      returnTo: safeReturnTo(req.query.returnTo),
      expiresAt: Date.now() + tenMinutes,
    }
    const codeChallenge = createHash('sha256').update(codeVerifier).digest('base64url')
    res.setHeader('Set-Cookie', cookie(OAUTH_COOKIE, sign(transaction, options.sessionSecret), { maxAge: tenMinutes, secure: options.production }))
    res.redirect(options.identityProvider.authorizationUrl({ state: transaction.state, nonce: transaction.nonce, codeChallenge }))
  })

  router.get('/auth/google/callback', async (req, res, next: NextFunction) => {
    try {
      if (!configured || !options.sessionSecret || !options.identityProvider) return res.status(503).send('Mentor sign-in has not been configured.')
      const transaction = verify<OAuthTransaction>(parseCookies(req.get('cookie'))[OAUTH_COOKIE], options.sessionSecret)
      const code = typeof req.query.code === 'string' ? req.query.code : undefined
      const state = typeof req.query.state === 'string' ? req.query.state : undefined
      if (!transaction || transaction.expiresAt <= Date.now() || !code || state !== transaction.state)
        return res.status(400).send('This sign-in attempt has expired. Please try again.')
      const identity = await options.identityProvider.verifyCallback({ code, codeVerifier: transaction.codeVerifier, nonce: transaction.nonce })
      const normalizedEmail = identity.email.trim().toLowerCase()
      if (!identity.emailVerified || !allowedEmails.has(normalizedEmail)) return res.status(403).send('This Google account is not on the mentor allowlist.')
      const session: MentorSession = {
        subject: identity.subject,
        email: normalizedEmail,
        expiresAt: Date.now() + twelveHours,
        ...(identity.name ? { name: identity.name } : {}),
        ...(identity.picture ? { picture: identity.picture } : {}),
      }
      res.setHeader('Set-Cookie', [
        cookie(SESSION_COOKIE, sign(session, options.sessionSecret), { maxAge: twelveHours, secure: options.production }),
        clearCookie(OAUTH_COOKIE, options.production),
      ])
      res.redirect(transaction.returnTo)
    } catch (error) {
      next(error)
    }
  })

  router.post('/auth/logout', requireSameOrigin, (_req, res) => {
    res.setHeader('Set-Cookie', clearCookie(SESSION_COOKIE, options.production))
    res.status(204).end()
  })

  return { router, configured, currentMentor, requireMentor, requireSameOrigin }
}

export type MentorAuth = ReturnType<typeof createMentorAuth>
