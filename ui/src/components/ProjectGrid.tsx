import { SimpleGrid } from '@mantine/core'
import { ProjectCard } from 'components/ProjectCard'
import React, { FC } from 'react'
import { Project } from 'types/Project'

export const ProjectGrid: FC<{ projects: Array<Project> }> = ({ projects }) => (
  <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'md', cols: 2 }, { maxWidth: 'sm', cols: 1 }]} spacing='md'>
    {projects.map((proj) => (
      <ProjectCard key={proj.slug} {...proj} />
    ))}
  </SimpleGrid>
)
