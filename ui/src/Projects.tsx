import { FilterableGrid } from 'components/FilterableGrid'
import { PageHeading } from 'components/PageHeading'
import { SubHeading } from 'components/SubHeading'
import React from 'react'

export const Projects = () => {
  return (
    <>
      <PageHeading>Projects</PageHeading>
      <SubHeading>Recommended projects for Scratch, Python, & HTML</SubHeading>
      <FilterableGrid />
    </>
  )
}
