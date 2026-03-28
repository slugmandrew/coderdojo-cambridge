import { Select, Stack, Text } from '@mantine/core'
import { ProjectGrid } from 'components/ProjectGrid'
import data from 'data/ProjectData'
import React, { FC, useState } from 'react'
import { LanguageName } from 'types/LanguageName'
import { Level } from 'types/Level'
import { Project } from 'types/Project'

const levelFilter = { label: 'Level', type: Level }
const languageFilter = { label: 'Language', type: LanguageName }

export const FilterableGrid: FC = () => {
  const [currentLanguageFilter, setCurrentLanguageFilter] = useState<string>()
  const [currentLevelFilter, setCurrentLevelFilter] = useState<string>()

  const filterList = (projects: Project[]) =>
    projects
      .slice()
      .filter((project) => (currentLanguageFilter ? project.language === currentLanguageFilter : true))
      .filter((project) => (currentLevelFilter ? project.level.find((level) => level === currentLevelFilter) : true))
  const filteredProjects = filterList(data.projects)

  const onChange = (label: string, value: string | null) => {
    const selectedValue = value ? value.split('-')[1] : undefined

    switch (label) {
      case 'Level':
        setCurrentLevelFilter(selectedValue)
        break
      case 'Language':
        setCurrentLanguageFilter(selectedValue)
        break
      default:
        break
    }
  }

  return (
    <Stack w='100%'>
      <Text fw={700}>Showing {filteredProjects.length} Projects</Text>
      <Select
        data={Object.values(languageFilter.type).map((key) => ({ label: key, value: `${languageFilter.label}-${key}` }))}
        placeholder={`Select ${languageFilter.label}`}
        searchable
        clearable
        value={currentLanguageFilter ? `${languageFilter.label}-${currentLanguageFilter}` : null}
        onChange={(value) => onChange(languageFilter.label, value)}
      />

      {currentLanguageFilter && (
        <Select
          data={Object.values(levelFilter.type).map((key) => ({ label: key, value: `${levelFilter.label}-${key}` }))}
          placeholder={`Select ${levelFilter.label}`}
          clearable
          value={currentLevelFilter ? `${levelFilter.label}-${currentLevelFilter}` : null}
          onChange={(value) => onChange(levelFilter.label, value)}
        />
      )}

      <ProjectGrid projects={filteredProjects} />
    </Stack>
  )
}
