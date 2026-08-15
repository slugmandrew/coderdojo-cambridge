import { MantineProvider } from '@mantine/core'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import seedCatalog from 'data/ProjectData'
import { MemoryRouter } from 'react-router'
import { beforeEach, expect, test, vi } from 'vitest'
import { App } from './App'
import { theme } from './theme'

const seedProjects = new Map<string, (typeof seedCatalog.projects)[number] & { collections: string[] }>()
for (const [collection, projects] of Object.entries(seedCatalog)) {
  for (const project of projects) {
    const existing = seedProjects.get(project.slug)
    if (existing) existing.collections.push(collection)
    else seedProjects.set(project.slug, { ...project, collections: [collection] })
  }
}
const discoveryCatalog = { projects: [...seedProjects.values()] }

const renderApp = (path = '/') =>
  render(
    <MantineProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </MantineProvider>,
  )

const mockFetch = (auth = { configured: true, authenticated: false, mentor: undefined as undefined | { subject: string; email: string; name?: string } }) => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input)
      if (url.endsWith('/api/projects')) return new Response(JSON.stringify(discoveryCatalog), { status: 200 })
      if (url.endsWith('/api/auth/me')) return new Response(JSON.stringify(auth), { status: 200 })
      if (url.endsWith('/api/schedule')) return new Response(JSON.stringify({ sessions: [], updatedAt: null }), { status: 200 })
      return new Response(null, { status: 204 })
    }),
  )
}

beforeEach(() => {
  mockFetch()
})

test('renders title', () => {
  renderApp()
  const title = screen.getByText('Code Club Cambridge', { exact: true })
  expect(title).toBeInTheDocument()
})

test('marks the current route in site navigation', () => {
  renderApp('/projects')

  expect(screen.getAllByRole('link', { name: 'Projects' }).some((link) => link.getAttribute('aria-current') === 'page')).toBe(true)
})

test('shows a ticket icon on every Get tickets link', async () => {
  const user = userEvent.setup()
  renderApp()

  for (const link of screen.getAllByRole('link', { name: 'Get tickets' })) {
    expect(link.querySelector('[data-icon="ticket"]')).toBeInTheDocument()
  }

  await user.click(screen.getByRole('button', { name: 'Toggle menu' }))
  const dialog = await screen.findByRole('dialog', { name: 'Menu' })
  expect(within(dialog).getByRole('link', { name: 'Get tickets' }).querySelector('[data-icon="ticket"]')).toBeInTheDocument()
})

test('offers two ways to find a project', async () => {
  renderApp('/projects')

  expect(await screen.findByRole('button', { name: /what do you want to make/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /what do you want to code with/i })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /python.*write real code/i })).not.toBeInTheDocument()
})

test.each(['Ages 7+', 'Ages 9+', 'Ages 11+', 'Ages 14+'])('shows the %s project recommendation', async (ages) => {
  const user = userEvent.setup()
  renderApp('/projects')

  await user.click(await screen.findByRole('button', { name: /what do you want to code with/i }))
  expect(await screen.findByText(ages)).toBeInTheDocument()
})

test('guides coders through coding tool and optional challenge filters', async () => {
  const user = userEvent.setup()
  renderApp('/projects')

  await user.click(await screen.findByRole('button', { name: /what do you want to code with/i }))
  const python = await screen.findByRole('button', { name: /python.*write real code/i })
  await user.click(python)
  const levelOne = screen.getByRole('button', { name: 'Level 1' })
  await user.click(levelOne)

  expect(screen.getByText(/projects to explore/)).toBeInTheDocument()
  expect(python).toHaveAttribute('aria-pressed', 'true')
  expect(levelOne).toHaveAttribute('aria-pressed', 'true')
})

test('shows a topic guide and matching projects after choosing an interest', async () => {
  const user = userEvent.setup()
  renderApp('/projects?browse=topics')

  await user.click(await screen.findByRole('button', { name: /i want to write a story/i }))

  expect(screen.getByRole('heading', { level: 2, name: 'Code your own stories' })).toBeInTheDocument()
  expect(screen.getByText(/projects to explore/)).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 3, name: 'Full of Stories' })).toBeInTheDocument()
})

test('redirects the old topics page into topic discovery', async () => {
  renderApp('/topics')

  expect(await screen.findByRole('heading', { level: 3, name: 'Pick something that sounds fun' })).toBeInTheDocument()
})

test('navigates from the mobile menu and closes it', async () => {
  const user = userEvent.setup()
  renderApp()

  await user.click(screen.getByRole('button', { name: 'Toggle menu' }))
  const dialog = await screen.findByRole('dialog', { name: 'Menu' })
  await user.click(within(dialog).getByRole('link', { name: 'Projects' }))

  expect(await screen.findByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument()
  await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Menu' })).not.toBeInTheDocument())
})

test('scrolls to the top after navigating to another page', async () => {
  const user = userEvent.setup()
  const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
  renderApp()
  scrollTo.mockClear()

  await user.click(await screen.findByRole('link', { name: 'Browse project ideas' }))
  expect(await screen.findByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument()
  expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' })

  scrollTo.mockRestore()
})

test.each([
  ['/coders', 'Coders'],
  ['/parents', 'Parents'],
  ['/mentors', 'Mentors'],
  ['/location', 'Location'],
  ['/workshops', 'Workshops'],
  ['/manage/schedule', 'Manage the Code Club calendar'],
  ['/manage/projects', 'Add a project'],
])('renders the %s route', async (path, title) => {
  renderApp(path)

  expect(await screen.findByRole('heading', { level: 1, name: title })).toBeInTheDocument()
})

test('shows the location using a keyless OpenStreetMap embed', async () => {
  renderApp('/location')

  const map = await screen.findByTitle('Map showing Code Club Cambridge at 16 Mill Lane')
  expect(map).toHaveAttribute('src', expect.stringContaining('openstreetmap.org/export/embed.html'))
  expect(screen.getByRole('link', { name: /view a larger map/i })).toHaveAttribute('href', expect.stringContaining('openstreetmap.org'))
})

test('asks an anonymous mentor to sign in before showing calendar controls', async () => {
  renderApp('/manage/schedule')

  expect(await screen.findByRole('link', { name: 'Sign in with Google' })).toHaveAttribute('href', '/auth/google?returnTo=/manage/schedule')
  expect(screen.queryByRole('button', { name: 'Save and publish' })).not.toBeInTheDocument()
})

test('shows project publishing controls to an authenticated mentor', async () => {
  mockFetch({ configured: true, authenticated: true, mentor: { subject: 'google-123', email: 'mentor@example.com', name: 'Test Mentor' } })
  renderApp('/manage/projects')

  expect(await screen.findByRole('textbox', { name: 'Project title' })).toBeInTheDocument()
  expect(screen.getByText('Signed in as Test Mentor')).toBeInTheDocument()
  expect(screen.getByRole('combobox', { name: 'Topics (optional)' })).toBeInTheDocument()
})
