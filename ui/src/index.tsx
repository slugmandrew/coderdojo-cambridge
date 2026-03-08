import { MantineProvider } from '@mantine/core'
import '@fontsource/big-shoulders-display/400.css'
import '@fontsource/quicksand/400.css'
import '@fontsource/ubuntu/400.css'
import { App } from 'App'
import { customTheme } from 'customTheme'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider withNormalizeCSS withGlobalStyles theme={customTheme as any}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()

// comment to redeploy
