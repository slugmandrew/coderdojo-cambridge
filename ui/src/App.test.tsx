import { MantineProvider } from '@mantine/core'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { App } from './App'
import { theme } from './theme'

test('renders title', () => {
  render(
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </MantineProvider>
  )
  const title = screen.getByText(/CoderDojo Cambridge/i)
  expect(title).toBeInTheDocument()
})
