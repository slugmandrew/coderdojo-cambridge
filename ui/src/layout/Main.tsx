import { Container } from '@chakra-ui/react'
import { Home } from 'pages/Home'
import { Location } from 'pages/Location'
import { Mentors } from 'pages/Mentors'
import { Ninjas } from 'pages/Ninjas'
import { Parents } from 'pages/Parents'
import { Projects } from 'pages/Projects'
import { Scraper } from 'pages/Scraper'
import { Topics } from 'pages/Topics'
import { Workshops } from 'pages/Workshops'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const Main = () => {
  return (
    <Container maxW={'full'} minH={800} bgColor={'gray.50'} p={[0, 0, 5]}>
      <Container maxW={'container.xl'} minH={800} p={[3, null, 5]} pb={20}>
        <Routes>
          {/* HOME */}
          <Route path='/' element={<Home />} />

          {/* PROJECTS */}
          <Route path='/projects' element={<Projects />} />

          {/* NINJAS */}
          <Route path='/ninjas' element={<Ninjas />} />

          {/* PARENTS */}
          <Route path='/parents' element={<Parents />} />

          {/* MENTORS */}
          <Route path='/mentors' element={<Mentors />} />

          {/* TOPICS */}
          <Route path='/topics' element={<Topics />} />

          {/* LOCATION */}
          <Route path='/location' element={<Location />} />

          {/* WORKSHOPS */}
          <Route path='/workshops' element={<Workshops />} />

          {/* HIDDEN */}
          <Route path='/scraper' element={<Scraper />} />
        </Routes>
      </Container>
    </Container>
  )
}
