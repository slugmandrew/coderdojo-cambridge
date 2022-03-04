import { Box, Heading } from '@chakra-ui/react'
import { FilterableGrid } from 'components/FilterableGrid'
import React from 'react'

export const ProjectList = () => {
  return (
    <>
      <Heading size={'xl'}>Projects to try</Heading>
      <FilterableGrid />
    </>
  )
}
