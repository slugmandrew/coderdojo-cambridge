import { Container } from '@chakra-ui/react'
import { Home } from 'pages/Home'
import { Location } from 'pages/Location'
import { Ninjas } from 'pages/Ninjas'
import { Parents } from 'pages/Parents'
import { Projects } from 'pages/Projects'
import { Scraper } from 'pages/Scraper'
import { Seasons } from 'pages/Seasons'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const Main = () => {
  return (
    <Container maxW={'full'} minH={800} bgColor={'gray.50'}>
      <Container maxW={'container.xl'} minH={800} p={5} pb={20}>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/projects' element={<Projects />} />

          {/* ABOUT */}
          <Route path='/parents' element={<Parents />} />

          {/* SEASONS */}
          <Route path='/seasons' element={<Seasons />} />

          {/* BECOME A NINJA */}
          <Route path='/ninjas' element={<Ninjas />} />

          {/* FIND US */}
          <Route path='/location' element={<Location />} />

          <Route path='/scraper' element={<Scraper />} />
        </Routes>
      </Container>
    </Container>
  )
}
