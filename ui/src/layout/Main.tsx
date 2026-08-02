import { Center, Container, Loader } from '@mantine/core'
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'

const Home = lazy(() => import('pages/Home').then(({ Home }) => ({ default: Home })))
const Location = lazy(() => import('pages/Location').then(({ Location }) => ({ default: Location })))
const Mentors = lazy(() => import('pages/Mentors').then(({ Mentors }) => ({ default: Mentors })))
const Ninjas = lazy(() => import('pages/Ninjas').then(({ Ninjas }) => ({ default: Ninjas })))
const Parents = lazy(() => import('pages/Parents').then(({ Parents }) => ({ default: Parents })))
const Projects = lazy(() => import('pages/Projects').then(({ Projects }) => ({ default: Projects })))
const Scraper = lazy(() => import('pages/Scraper').then(({ Scraper }) => ({ default: Scraper })))
const Topics = lazy(() => import('pages/Topics').then(({ Topics }) => ({ default: Topics })))
const Workshops = lazy(() => import('pages/Workshops').then(({ Workshops }) => ({ default: Workshops })))

export const Main = () => {
  return (
    <Container fluid px={0} py='xl' style={(theme) => ({ backgroundColor: theme.colors.gray[0], minHeight: 800 })}>
      <Container px='md' pb={80} style={{ minHeight: 800 }}>
        <Suspense
          fallback={
            <Center role='status' aria-label='Loading page' py='xl'>
              <Loader />
            </Center>
          }>
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
        </Suspense>
      </Container>
    </Container>
  )
}
