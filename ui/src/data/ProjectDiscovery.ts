import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faHtml5, faRaspberryPi, faUnity } from '@fortawesome/free-brands-svg-icons'
import { faBookOpen, faCube, faGamepad, faGift, faGlobe, faMicrochip } from '@fortawesome/free-solid-svg-icons'
import { ComponentType } from 'react'
import christmasJumper from 'image/christmas_jumper.png'
import birthdayCard from 'image/birthday-card.png'
import bookReader from 'image/book-reader.png'
import makecodeEditor from 'image/makecode-arcade.png'
import microBitInHands from 'image/microbit_in_hands.png'
import schematic from 'image/printing-schematic.png'
import senseHatGif from 'image/raspberry-pi-sense-hat.gif'
import { Christmas } from 'topics/Christmas'
import { Games } from 'topics/Games'
import { MicroBit } from 'topics/MicroBit'
import { Printing } from 'topics/Printing'
import { SenseHat } from 'topics/SenseHat'
import { Stories } from 'topics/Stories'
import { WebDesign } from 'topics/WebDesign'
import { LanguageName } from 'types/LanguageName'
import { Level } from 'types/Level'
import { Project } from 'types/Project'

export type BrowseMode = 'topics' | 'languages'
export type TopicSlug = 'games' | 'stories' | 'web-design' | '3d-printing' | 'microbit' | 'christmas' | 'sense-hat'

export type TopicDefinition = {
  slug: TopicSlug
  collection: string
  prompt: string
  title: string
  summary: string
  ages: string
  equipment: string
  image: string
  icon: IconDefinition
  Guide: ComponentType
}

export const topicDefinitions: TopicDefinition[] = [
  {
    slug: 'games',
    collection: 'gameProjects',
    prompt: 'I want to make a game',
    title: 'Make a game',
    summary: 'Create your own rules, characters, challenges, and worlds.',
    ages: 'Ages 7+',
    equipment: 'No special equipment',
    image: makecodeEditor,
    icon: faGamepad,
    Guide: Games,
  },
  {
    slug: 'stories',
    collection: 'storyProjects',
    prompt: 'I want to write a story',
    title: 'Code your own stories',
    summary: 'Tell an interactive story with blocks, web pages, or Python.',
    ages: 'Ages 7+',
    equipment: 'No special equipment',
    image: bookReader,
    icon: faBookOpen,
    Guide: Stories,
  },
  {
    slug: 'web-design',
    collection: 'webDesignProjects',
    prompt: 'I want to build a website',
    title: 'Web design',
    summary: 'Use HTML, CSS, and JavaScript to make something for the web.',
    ages: 'Ages 9+',
    equipment: 'No special equipment',
    image: birthdayCard,
    icon: faGlobe,
    Guide: WebDesign,
  },
  {
    slug: '3d-printing',
    collection: 'printingProjects',
    prompt: 'I want to 3D print something',
    title: '3D printing',
    summary: 'Design a real object and learn how a 3D printer builds it.',
    ages: 'Ages 9+',
    equipment: '3D printer session',
    image: schematic,
    icon: faCube,
    Guide: Printing,
  },
  {
    slug: 'microbit',
    collection: 'microBitProjects',
    prompt: 'I want to make a micro:bit gadget',
    title: 'A bit of micro:bit',
    summary: 'Use buttons, lights, sensors, and radio to build a tiny gadget.',
    ages: 'Ages 7+',
    equipment: 'micro:bit available at the club',
    image: microBitInHands,
    icon: faMicrochip,
    Guide: MicroBit,
  },
  {
    slug: 'christmas',
    collection: 'christmasProjects',
    prompt: 'I want to make something festive',
    title: 'Christmas coding',
    summary: 'Make a winter game, pattern, animation, or musical project.',
    ages: 'Ages 7+',
    equipment: 'No special equipment',
    image: christmasJumper,
    icon: faGift,
    Guide: Christmas,
  },
  {
    slug: 'sense-hat',
    collection: 'raspberryPiProjects',
    prompt: 'I want to explore a Raspberry Pi',
    title: 'Raspberry Pi and Sense HAT',
    summary: 'Use a tiny computer, colourful display, joystick, and sensors.',
    ages: 'Ages 11+',
    equipment: 'Raspberry Pi and Sense HAT',
    image: senseHatGif,
    icon: faRaspberryPi,
    Guide: SenseHat,
  },
]

type LanguageOption = {
  value: LanguageName
  description: string
  ages: string
  icon?: IconDefinition
  note?: string
}

export const languageOptions: LanguageOption[] = [
  { value: LanguageName.scratch, description: 'Make games and animations', ages: 'Ages 7+' },
  { value: LanguageName.html, description: 'Build web pages', ages: 'Ages 9+', icon: faHtml5 },
  { value: LanguageName.python, description: 'Write real code', ages: 'Ages 11+' },
  {
    value: LanguageName.unity,
    description: 'Build in 3D',
    ages: 'Ages 14+',
    icon: faUnity,
    note: 'Own laptop needed · Install Unity before the session',
  },
]

export type DiscoveryCriteria = {
  topic?: TopicSlug
  language?: LanguageName
  level?: Level
}

export const createProjectDiscovery = (projects: Project[], today = new Date()) => {
  const uniqueProjects = [...new Map(projects.map((project) => [project.slug, project])).values()]
  const christmasIsVisible = today.getMonth() === 11
  const visibleProjects = christmasIsVisible ? uniqueProjects : uniqueProjects.filter((project) => !project.collections?.includes('christmasProjects'))
  const visibleTopics = topicDefinitions.filter((topic) => christmasIsVisible || topic.slug !== 'christmas')

  return {
    topics: visibleTopics.filter((topic) => visibleProjects.some((project) => project.collections?.includes(topic.collection))),
    languages: languageOptions.filter((language) => visibleProjects.some((project) => project.language === language.value)),
    find(criteria: DiscoveryCriteria) {
      const topic = criteria.topic ? topicDefinitions.find((candidate) => candidate.slug === criteria.topic) : undefined
      return visibleProjects.filter(
        (project) =>
          (!topic || project.collections?.includes(topic.collection)) &&
          (!criteria.language || project.language === criteria.language) &&
          (!criteria.level || project.level.includes(criteria.level)),
      )
    },
  }
}

export const isBrowseMode = (value: string | null): value is BrowseMode => value === 'topics' || value === 'languages'
export const isTopicSlug = (value: string | null): value is TopicSlug => topicDefinitions.some((topic) => topic.slug === value)
export const isLanguageName = (value: string | null): value is LanguageName => Object.values(LanguageName).some((language) => language === value)
export const isLevel = (value: string | null): value is Level => Object.values(Level).some((level) => level === value)
