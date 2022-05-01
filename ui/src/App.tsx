import { Container } from '@chakra-ui/react'
import { Footer } from 'layout/Footer'
import { Header } from 'layout/Header'
import { Main } from 'layout/Main'
import { Navbar } from 'layout/Navbar'
import React from 'react'

export const App = () => {
  return (
    <Container maxW={'full'} minW={'container.xs'} padding={0}>
      <Header />
      <Navbar />
      <Main />
      <Footer />
    </Container>
  )
}
