import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { ProjectCard } from 'components/ProjectCard'
import React, { FC } from 'react'
import { Project } from 'types/Project'

export const ProjectGrid: FC<{ projects: Array<Project> }> = ({ projects }) => {
  return (
    <SimpleGrid w={'full'} spacing={[3, null, 5]} minChildWidth={300}>
      {projects.map((proj) => (
        <GridItem key={proj.slug}>
          <ProjectCard {...proj} />
        </GridItem>
      ))}
    </SimpleGrid>
  )
}
