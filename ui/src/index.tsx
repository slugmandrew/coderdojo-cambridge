import { ChakraProvider } from '@chakra-ui/react'
import { App } from 'App'
import { customTheme } from 'customTheme'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import '@fontsource/open-sans/400.css'
import '@fontsource/quicksand/400.css'
import '@fontsource/big-shoulders-display/400.css'
import '@fontsource/ubuntu/400.css'
import '@fontsource/fredericka-the-great/400.css'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
