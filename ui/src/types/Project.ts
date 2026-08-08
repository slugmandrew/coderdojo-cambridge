import { LanguageName } from './LanguageName.js'
import { Level } from './Level.js'
import { TrackInfo } from './TrackInfo.js'

export type Project = {
  url: string
  title: string
  level: Level[]
  language: LanguageName
  slug: string
  track?: TrackInfo
  domain?: string // for non-raspberry pi
  imageUrl?: string
}
