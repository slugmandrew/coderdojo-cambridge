import { ProjectList } from 'ProjectList'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const Main = () => {
  return (
    <Routes>
      {/*<Route path="/" element={<Home />} />*/}
      <Route path="/" element={<ProjectList />} />

      {/* ABOUT */}
      {/*<Route path="/about" element={<About />} />*/}

      {/* BECOME A NINJA */}
      {/*<Route path="/ninjas" element={<Ninjas />} />*/}

      {/* FIND US */}
      {/*<Route path="/location" element={<Location />} />*/}
    </Routes>
  )
}
