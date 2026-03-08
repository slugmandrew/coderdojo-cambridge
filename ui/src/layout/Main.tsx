import { Box, Container } from '@mantine/core'
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

export const Main = () => (
  <Box bg='#f8f9fa' py='lg' mih='70vh'>
    <Container size='xl'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/ninjas' element={<Ninjas />} />
        <Route path='/parents' element={<Parents />} />
        <Route path='/mentors' element={<Mentors />} />
        <Route path='/topics' element={<Topics />} />
        <Route path='/location' element={<Location />} />
        <Route path='/workshops' element={<Workshops />} />
        <Route path='/scraper' element={<Scraper />} />
      </Routes>
    </Container>
  </Box>
)
