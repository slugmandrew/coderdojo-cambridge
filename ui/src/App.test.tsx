import { MantineProvider } from '@mantine/core'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { expect, test } from 'vitest'
import { App } from './App'
import { theme } from './theme'

const renderApp = (path = '/') =>
  render(
    <MantineProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </MantineProvider>,
  )

test('renders title', () => {
  renderApp()
  const title = screen.getByText(/CoderDojo Cambridge/i)
  expect(title).toBeInTheDocument()
})

test('marks the current route in site navigation', () => {
  renderApp('/projects')

  expect(screen.getAllByRole('link', { name: 'Projects' }).some((link) => link.getAttribute('aria-current') === 'page')).toBe(true)
})

test('exposes the project language filter by name', async () => {
  renderApp('/projects')

  expect(await screen.findByRole('combobox', { name: 'Language' })).toBeInTheDocument()
})

test('filters projects by language', async () => {
  const user = userEvent.setup()
  renderApp('/projects')

  await user.click(await screen.findByRole('combobox', { name: 'Language' }))
  await user.click(within(screen.getByRole('listbox', { hidden: true })).getByText('🐍 Python'))

  expect(screen.getByText('Showing 10 Projects')).toBeInTheDocument()
  expect(screen.getByRole('combobox', { name: 'Level' })).toBeInTheDocument()
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

test.each([
  ['/topics', 'Topics'],
  ['/ninjas', 'Ninjas'],
  ['/parents', 'Parents'],
  ['/mentors', 'Mentors'],
  ['/location', 'Location'],
  ['/workshops', 'Workshops'],
  ['/manage/schedule', 'Manage the dojo calendar'],
])('renders the %s route', async (path, title) => {
  renderApp(path)

  expect(await screen.findByRole('heading', { level: 1, name: title })).toBeInTheDocument()
})

test('shows the location using a keyless OpenStreetMap embed', async () => {
  renderApp('/location')

  const map = await screen.findByTitle('Map showing CoderDojo Cambridge at 16 Mill Lane')
  expect(map).toHaveAttribute('src', expect.stringContaining('openstreetmap.org/export/embed.html'))
  expect(screen.getByRole('link', { name: /view a larger map/i })).toHaveAttribute('href', expect.stringContaining('openstreetmap.org'))
})
