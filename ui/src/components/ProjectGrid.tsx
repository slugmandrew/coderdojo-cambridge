import { SimpleGrid } from '@mantine/core'
import { ProjectCard } from 'components/ProjectCard'
import React, { FC } from 'react'
import { Project } from 'types/Project'

export const ProjectGrid: FC<{ projects: Array<Project> }> = ({ projects }) => {
  return (
    <SimpleGrid cols={3} spacing='md' breakpoints={[{ maxWidth: 'md', cols: 2 }, { maxWidth: 'sm', cols: 1 }]}>
      {projects.map((proj) => (
        <ProjectCard key={proj.slug} {...proj} />
      ))}
    </SimpleGrid>
  )
}
