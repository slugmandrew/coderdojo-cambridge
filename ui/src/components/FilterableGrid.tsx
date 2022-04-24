import { Select, Text, VStack } from '@chakra-ui/react'
import { ProjectGrid } from 'components/ProjectGrid'
import data from 'data/ProjectData'
import React, { FC, useEffect, useState } from 'react'
import { LanguageName } from 'types/LanguageName'
import { Level } from 'types/Level'
import { Project } from 'types/Project'

const levelFilter = { label: 'Level', type: Level }
const languageFilter = { label: 'Language', type: LanguageName }

export const FilterableGrid: FC = () => {
  const [currentLanguageFilter, setCurrentLanguageFilter] = useState<string>()
  const [currentLevelFilter, setCurrentLevelFilter] = useState<string>()
  const [currentTrackFilter, setCurrentTrackFilter] = useState<string>()
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(data.projects)

  const filterList: (projects: Array<Project>) => Array<Project> = (projects: Array<Project>) => {
    return projects
      .slice()
      .filter((project) => (currentLanguageFilter ? project.language === currentLanguageFilter : true))
      .filter((project) => (currentLevelFilter ? project.level.find((l) => l === currentLevelFilter) : true))
    // .filter((project) => (currentTrackFilter && project.track ? project.track.name === currentTrackFilter : false))
  }

  useEffect(() => {
    setFilteredProjects(filterList(data.projects))
  }, [currentLanguageFilter, currentLevelFilter])

  const onChange = (label: string | 'Track', value: string) => {
    if (value) {
      console.info('Found value, Setting filter...', value)
      let newFilter = value.split('-')
      console.info('newFilter', newFilter)

      if (newFilter.length === 2)
        switch (newFilter[0]) {
          case 'Level':
            setCurrentLevelFilter(newFilter[1])
            break
          case 'Language':
            setCurrentLanguageFilter(newFilter[1])
            break
          case 'Track':
            setCurrentTrackFilter(newFilter[1])
            break
          default:
            break
        }
      else throw Error('Should have a length of two')
    } else {
      console.info('No value, clearing filter...')
      switch (label) {
        case 'Level':
          console.info('level')
          setCurrentLevelFilter(undefined)
          break
        case 'Language':
          console.info('language')
          setCurrentLanguageFilter(undefined)
          break
        case 'Track':
          console.info('track')
          setCurrentTrackFilter(undefined)
          break
      }
    }
  }

  return (
    <VStack maxW={'full'} h={'full'} borderBottom={'1px solid'} borderBottomColor={'gray.500'}>
      <Text as='strong'>Showing {filterList(data.projects).length} Projects</Text>
      <>
        <Select
          bgColor={'white'}
          key={languageFilter.label}
          placeholder={`Select ${languageFilter.label}`}
          onChange={(event) => onChange(levelFilter.label, event.target.value)}>
          {Object.values(languageFilter.type).map((key) => {
            return (
              <option key={key} value={`${languageFilter.label}-${key}`}>
                {key}
              </option>
            )
          })}
        </Select>

        {currentLanguageFilter && (
          <Select
            bgColor={'white'}
            key={levelFilter.label}
            placeholder={`Select ${levelFilter.label}`}
            onChange={(event) => onChange(levelFilter.label, event.target.value)}>
            {Object.values(levelFilter.type).map((key) => {
              return (
                <option key={key} value={`${levelFilter.label}-${key}`}>
                  {key}
                </option>
              )
            })}
          </Select>
        )}
      </>
      <ProjectGrid projects={filteredProjects} />
    </VStack>
  )
}
