import { Text } from '@chakra-ui/react'
import { FilterableGrid } from 'components/FilterableGrid'
import { PageHeading } from 'components/PageHeading'
import React from 'react'

export const ProjectList = () => {
  return (
    <>
      <PageHeading>Projects</PageHeading>
      <Text my={5}>Recommended projects for Scratch, Python, & HTML</Text>
      <FilterableGrid />
    </>
  )
}
