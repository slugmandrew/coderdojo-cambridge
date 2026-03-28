import { Container } from '@mantine/core'
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
    <Container fluid px={0} py="xl" sx={(theme) => ({ backgroundColor: theme.colors.gray[0], minHeight: 800 })}>
      <Container px="md" pb={80} sx={{ minHeight: 800 }}>
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
