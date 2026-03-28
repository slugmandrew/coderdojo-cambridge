import { Box } from '@mantine/core'
import { ContentCard } from 'components/ContentCard'
import { FilterableGrid } from 'components/FilterableGrid'
import { Heading2 } from 'components/Heading2'
import { PageHeading } from 'components/PageHeading'
import React from 'react'

export const Projects = () => {
  return (
    <>
      <PageHeading>Projects</PageHeading>
      <ContentCard>
        <Box p='md'>
          <Heading2>Recommended projects for Scratch, Python, & HTML</Heading2>
          <FilterableGrid />
        </Box>
      </ContentCard>
    </>
  )
}
