import { Container } from '@chakra-ui/react'
import { About } from 'About'
import { Home } from 'Home'
import { Location } from 'Location'
import { Ninjas } from 'Ninjas'
import { ProjectList } from 'ProjectList'
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

          <Route path='/projects' element={<ProjectList />} />

          {/* ABOUT */}
          <Route path='/about' element={<About />} />

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
