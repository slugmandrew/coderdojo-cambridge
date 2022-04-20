import { Container } from '@chakra-ui/react'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { Main } from 'Main'
import { Navbar } from 'Navbar'
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
