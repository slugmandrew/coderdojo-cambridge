import { LanguageName } from 'types/LanguageName'
import { Level } from 'types/Level'
import { TrackName } from 'types/TrackName'

export type FilterableType = typeof LanguageName | typeof TrackName | typeof Level

export type FilterableValue = LanguageName | TrackName | Level

export type FilterValueWithLabel = {
  label: 'Language' | 'Level' | 'Track'
  value: FilterableValue
}

export type FilterTypeWithLabel = {
  label: 'Language' | 'Level' | 'Track'
  type: FilterableType
}

export type FilterValue<Filterable> = {
  filterTypeWithLabel: FilterTypeWithLabel
  value: FilterValueWithLabel
}
