import { Container } from '@chakra-ui/react'
import { Parents } from 'About'
import { Home } from 'Home'
import { Location } from 'Location'
import { Ninjas } from 'Ninjas'
import { Projects } from 'Projects'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Scraper } from 'Scraper'
import { Seasons } from 'Seasons'

export const Main = () => {
  return (
    <Container maxW={'full'} minH={800} bgColor={'gray.50'}>
      <Container maxW={'container.xl'} minH={800} p={5}>
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
