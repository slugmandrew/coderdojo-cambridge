import { Box, Heading } from '@chakra-ui/react'
import { FilterableGrid } from 'components/FilterableGrid'
import React from 'react'

export const ProjectList = () => {
  return (
    <Box bgColor={'gray.50'} p={5}>
      <Heading color={'custom.teal'} size={'xl'}>
        Projects to try
      </Heading>
      <FilterableGrid />
    </Box>
  )
}
