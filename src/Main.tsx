import { About } from 'About'
import { FilterableGrid } from 'components/FilterableGrid'
import { Home } from 'Home'
import { Location } from 'Location'
import { Ninjas } from 'Ninjas'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { FilterTypeWithLabel } from 'types/Filterable'
import { LanguageName } from 'types/LanguageName'
import { Level } from 'types/Level'

const availableFilters: FilterTypeWithLabel[] = [
  { label: 'Language', type: LanguageName },
  { label: 'Level', type: Level },
]

export const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<FilterableGrid filters={availableFilters} />} />

      {/* ABOUT */}
      <Route path="/about" element={<About />} />

      {/* BECOME A NINJA */}
      <Route path="/ninjas" element={<Ninjas />} />

      {/* FIND US */}
      <Route path="/location" element={<Location />} />
    </Routes>
  )
}
