import { Box } from '@mantine/core'
import { Footer } from 'layout/Footer'
import { Header } from 'layout/Header'
import { Main } from 'layout/Main'
import { Navbar } from 'layout/Navbar'
import React from 'react'

export const App = () => (
  <Box>
    <Header />
    <Navbar />
    <Main />
    <Footer />
  </Box>
)
