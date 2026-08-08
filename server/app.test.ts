import { AddressInfo } from 'net'
import { afterEach, describe, expect, test } from 'vitest'
import { IdentityClaims, IdentityProvider } from './auth'
import { createApp } from './app'

const openServers: Array<{ close: () => void }> = []

afterEach(() => {
  while (openServers.length) openServers.pop()?.close()
})

const identityProvider = (claims: IdentityClaims): IdentityProvider => ({
  authorizationUrl(input) {
    const url = new URL('https://identity.example/sign-in')
    url.searchParams.set('state', input.state)
    url.searchParams.set('nonce', input.nonce)
    url.searchParams.set('code_challenge', input.codeChallenge)
    return url.toString()
  },
  async verifyCallback() {
    return claims
  },
})

const startApp = (email = 'mentor@example.com') => {
  const instance = createApp({
    databaseFile: ':memory:',
    allowedEmails: ['mentor@example.com'],
    sessionSecret: 'test-session-secret-with-at-least-32-characters',
    publicUrl: 'https://club.example',
    production: true,
    identityProvider: identityProvider({ subject: 'google-123', email, emailVerified: true, name: 'Test Mentor' }),
  })
  const server = instance.app.listen(0)
  const port = (server.address() as AddressInfo).port
  openServers.push({
    close: () => {
      server.close()
      instance.close()
    },
  })
  return `http://127.0.0.1:${port}`
}

const signIn = async (baseUrl: string) => {
  const start = await fetch(`${baseUrl}/auth/google?returnTo=/manage/projects`, { redirect: 'manual' })
  expect(start.status).toBe(302)
  const authorizationUrl = new URL(start.headers.get('location')!)
  const oauthCookie = start.headers.get('set-cookie')!.split(';')[0]
  const callback = await fetch(`${baseUrl}/auth/google/callback?code=valid-code&state=${authorizationUrl.searchParams.get('state')}`, {
    headers: { Cookie: oauthCookie },
    redirect: 'manual',
  })
  return callback
}

describe('mentor content management', () => {
  test('rejects schedule changes without a mentor session', async () => {
    const baseUrl = startApp()
    const response = await fetch(`${baseUrl}/api/schedule`, {
      method: 'PUT',
      headers: { Origin: 'https://club.example', 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessions: [] }),
    })

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ message: 'Sign in with an approved mentor account to make changes.' })
  })

  test('signs in an allowlisted Google account and publishes content', async () => {
    const baseUrl = startApp()
    const callback = await signIn(baseUrl)
    expect(callback.status).toBe(302)
    expect(callback.headers.get('location')).toBe('/manage/projects')
    const sessionCookie = callback.headers.get('set-cookie')!.split(';')[0]

    const scheduleResponse = await fetch(`${baseUrl}/api/schedule`, {
      method: 'PUT',
      headers: { Cookie: sessionCookie, Origin: 'https://club.example', 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessions: [] }),
    })
    expect(scheduleResponse.status).toBe(200)

    const projectResponse = await fetch(`${baseUrl}/api/projects`, {
      method: 'POST',
      headers: { Cookie: sessionCookie, Origin: 'https://club.example', 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Mentor project', url: 'https://example.com/project', language: '🐍 Python', level: ['Level 1'] }),
    })
    expect(projectResponse.status).toBe(201)
    await expect(projectResponse.json()).resolves.toMatchObject({ slug: 'mentor-project', title: 'Mentor project' })

    const catalog = (await (await fetch(`${baseUrl}/api/projects`)).json()) as { projects: Array<{ slug: string }> }
    expect(catalog.projects.some(({ slug }) => slug === 'mentor-project')).toBe(true)
  })

  test('rejects a verified account that is not on the mentor allowlist', async () => {
    const callback = await signIn(startApp('visitor@example.com'))
    expect(callback.status).toBe(403)
    await expect(callback.text()).resolves.toContain('not on the mentor allowlist')
  })

  test('reports when production sign-in configuration is incomplete', async () => {
    const instance = createApp({ databaseFile: ':memory:', allowedEmails: [], publicUrl: 'https://club.example', production: true })
    const server = instance.app.listen(0)
    const port = (server.address() as AddressInfo).port
    openServers.push({ close: () => (server.close(), instance.close()) })

    const response = await fetch(`http://127.0.0.1:${port}/api/auth/me`)
    await expect(response.json()).resolves.toEqual({ configured: false, authenticated: false })
  })
})
