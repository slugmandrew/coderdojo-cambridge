import { Box } from '@chakra-ui/react'
import { ContentCard } from 'components/ContentCard'
import { FilterableGrid } from 'components/FilterableGrid'
import { PageHeading } from 'components/PageHeading'
import { SubHeading } from 'components/SubHeading'
import React from 'react'

export const Projects = () => {
  return (
    <>
      <PageHeading>Projects</PageHeading>
      <ContentCard>
        <Box p={5}>
          <SubHeading>Recommended projects for Scratch, Python, & HTML</SubHeading>
          <FilterableGrid />
        </Box>
      </ContentCard>
    </>
  )
}
