import { Heading } from '@chakra-ui/react'
import { FilterableGrid } from 'components/FilterableGrid'
import React from 'react'
import { FilterTypeWithLabel } from 'types/Filterable'
import { LanguageName } from 'types/LanguageName'
import { Level } from 'types/Level'

const availableFilters: FilterTypeWithLabel[] = [
  { label: 'Language', type: LanguageName },
  { label: 'Level', type: Level },
]

export const Projects = () => {
  return (
    <>
      <Heading size={'xl'}>Projects to try</Heading>

      <FilterableGrid filters={availableFilters} />
    </>
  )
}
