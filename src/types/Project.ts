import { TrackInfo } from 'types/TrackInfo'
import { LanguageName } from 'types/LanguageName'
import { Level } from 'types/Level'

export type Project = {
  url: string
  title: string
  level: Level
  language: LanguageName
  slug: string
  track?: TrackInfo
}
