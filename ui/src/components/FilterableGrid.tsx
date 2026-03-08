import { Select, Stack, Text } from '@mantine/core'
import { ProjectGrid } from 'components/ProjectGrid'
import data from 'data/ProjectData'
import React, { FC, useMemo, useState } from 'react'
import { LanguageName } from 'types/LanguageName'
import { Level } from 'types/Level'

export const FilterableGrid: FC = () => {
  const [language, setLanguage] = useState<string | null>(null)
  const [level, setLevel] = useState<string | null>(null)

  const filteredProjects = useMemo(
    () => data.projects
      .filter((project) => (language ? project.language === language : true))
      .filter((project) => (level ? project.level.includes(level as Level) : true)),
    [language, level]
  )

  return (
    <Stack spacing='md'>
      <Text fw={700}>Showing {filteredProjects.length} projects</Text>
      <Select
        placeholder='Filter by language'
        data={Object.values(LanguageName).map((v) => ({ value: v, label: v }))}
        value={language}
        onChange={setLanguage}
        clearable
      />
      <Select
        placeholder='Filter by level'
        data={Object.values(Level).map((v) => ({ value: v, label: v }))}
        value={level}
        onChange={setLevel}
        clearable
      />
      <ProjectGrid projects={filteredProjects} />
    </Stack>
  )
}
