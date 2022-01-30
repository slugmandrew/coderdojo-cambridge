import { Select, Text } from '@chakra-ui/react'
import { ProjectGrid } from 'components/ProjectGrid'
import data from 'data/Projects'
import React, { FC, useEffect, useState } from 'react'
import { FilterTypeWithLabel } from 'types/Filterable'
import { Project } from 'types/Project'

export const GridFilters: FC<{ filters: Array<FilterTypeWithLabel> }> = ({ filters }, children) => {
  const [currentLanguageFilter, setCurrentLanguageFilter] = useState<string>()
  const [currentLevelFilter, setCurrentLevelFilter] = useState<string>()
  const [currentTrackFilter, setCurrentTrackFilter] = useState<string>()

  const filterList: (projects: Array<Project>) => Array<Project> = (projects: Array<Project>) => {
    return projects
      .filter((project) => (currentLanguageFilter ? project.language === currentLanguageFilter : true))
      .filter((project) => (currentLevelFilter ? project.level === currentLevelFilter : true))
    // .filter((project) => (currentTrackFilter && project.track ? project.track.name === currentTrackFilter : false))
  }

  useEffect(() => {}, [currentLanguageFilter])

  const onChange = (label: 'Language' | 'Level' | 'Track', value: string) => {
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
    <>
      <Text as="strong">Showing {filterList(data).length} Projects</Text>
      <>
        {filters.map((filter) => {
          return (
            <Select
              bgColor={'white'}
              key={filter.label}
              placeholder={`<-- Select ${filter.label} -->`}
              onChange={(event) => onChange(filter.label, event.target.value)}
            >
              {Object.values(filter.type).map((key) => {
                return (
                  <option key={key} value={`${filter.label}-${key}`}>
                    {key}
                  </option>
                )
              })}
            </Select>
          )
        })}
      </>
      <ProjectGrid projects={filterList(data)} />
    </>
  )
}
