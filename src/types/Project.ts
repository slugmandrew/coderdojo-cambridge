import { LanguageName } from 'types/LanguageName'
import { Level } from 'types/Level'
import { TrackInfo } from 'types/TrackInfo'

export type Project = {
  url: string
  title: string
  level: Level[]
  language: LanguageName
  slug: string
  track?: TrackInfo
  domain?: string // for non-raspberry pi
}
