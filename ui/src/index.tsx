import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import './app.css'
import '@fontsource/big-shoulders-display/400'
import '@fontsource/quicksand/400'
import '@fontsource/ubuntu/400'
import { App } from 'App'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { theme } from 'theme'

const root = document.getElementById('root')

if (!root) throw new Error('Root element was not found')

createRoot(root).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
)
