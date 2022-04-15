import { Container, HStack, Link } from '@chakra-ui/react'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { Main } from 'Main'
import React from 'react'

export const App = () => {
  return (
    <Container maxW={'full'} minW={'container.xs'} padding={0}>
      <Header />

      <HStack>
        <Link href={'/'}>Home</Link>
        <Link href={'about'}>About</Link>
        <Link href={'seasons'}>Seasons</Link>
        <Link href={'ninjas'}>Become A Ninja</Link>
        <Link href={'location'}>Find Us</Link>
        <Link href={'projects'}>Projects</Link>
        <Link href={'scraper'}>Scraper</Link>
      </HStack>

      <Main />
      <Footer />
    </Container>
  )
}
