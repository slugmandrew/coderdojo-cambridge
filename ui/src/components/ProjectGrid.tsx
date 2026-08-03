import { SimpleGrid } from '@mantine/core'
import { ProjectCard } from 'components/ProjectCard'
import React, { FC } from 'react'
import { Project } from 'types/Project'

export const ProjectGrid: FC<{ projects: Array<Project> }> = ({ projects }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='md'>
      {projects.map((proj) => (
        <ProjectCard key={proj.slug} {...proj} />
      ))}
    </SimpleGrid>
  )
}
