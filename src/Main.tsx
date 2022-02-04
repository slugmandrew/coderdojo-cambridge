import { About } from 'About'
import { Home } from 'Home'
import { Location } from 'Location'
import { Ninjas } from 'Ninjas'
import { Projects } from 'Projects'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />

      {/* ABOUT */}
      <Route path="/about" element={<About />} />

      {/* BECOME A NINJA */}
      <Route path="/ninjas" element={<Ninjas />} />

      {/* FIND US */}
      <Route path="/location" element={<Location />} />
    </Routes>
  )
}
