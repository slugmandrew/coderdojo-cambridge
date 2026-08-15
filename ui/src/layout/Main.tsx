import { Center, Container, Loader } from '@mantine/core'
import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'

const Home = lazy(() => import('pages/Home').then(({ Home }) => ({ default: Home })))
const Location = lazy(() => import('pages/Location').then(({ Location }) => ({ default: Location })))
const ManageSchedule = lazy(() => import('pages/ManageSchedule').then(({ ManageSchedule }) => ({ default: ManageSchedule })))
const ManageProjects = lazy(() => import('pages/ManageProjects').then(({ ManageProjects }) => ({ default: ManageProjects })))
const Mentors = lazy(() => import('pages/Mentors').then(({ Mentors }) => ({ default: Mentors })))
const Coders = lazy(() => import('pages/Coders').then(({ Coders }) => ({ default: Coders })))
const Parents = lazy(() => import('pages/Parents').then(({ Parents }) => ({ default: Parents })))
const Projects = lazy(() => import('pages/Projects').then(({ Projects }) => ({ default: Projects })))
const Scraper = lazy(() => import('pages/Scraper').then(({ Scraper }) => ({ default: Scraper })))
const Workshops = lazy(() => import('pages/Workshops').then(({ Workshops }) => ({ default: Workshops })))

export const Main = () => {
  return (
    <Container fluid px={0} py={{ base: 40, md: 64 }} style={{ minHeight: 800 }}>
      <Container px={{ base: 'md', sm: 'xl' }} pb={80} style={{ minHeight: 800 }}>
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

            {/* CODERS */}
            <Route path='/coders' element={<Coders />} />

            {/* PARENTS */}
            <Route path='/parents' element={<Parents />} />

            {/* MENTORS */}
            <Route path='/mentors' element={<Mentors />} />

            {/* TOPICS */}
            <Route path='/topics' element={<Navigate to='/projects?browse=topics' replace />} />

            {/* LOCATION */}
            <Route path='/location' element={<Location />} />

            {/* WORKSHOPS */}
            <Route path='/workshops' element={<Workshops />} />

            {/* CONTENT MANAGEMENT */}
            <Route path='/manage/schedule' element={<ManageSchedule />} />
            <Route path='/manage/projects' element={<ManageProjects />} />

            {/* HIDDEN */}
            <Route path='/scraper' element={<Scraper />} />
          </Routes>
        </Suspense>
      </Container>
    </Container>
  )
}
