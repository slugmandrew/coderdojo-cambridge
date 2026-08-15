import { expect, test } from 'vitest'
import { LanguageName } from 'types/LanguageName'
import { Level } from 'types/Level'
import { Project } from 'types/Project'
import { createProjectDiscovery } from './ProjectDiscovery'

const projects: Project[] = [
  {
    slug: 'scratch-story',
    title: 'Scratch story',
    url: 'https://example.com/scratch-story',
    language: LanguageName.scratch,
    level: [Level.one],
    collections: ['projects', 'storyProjects'],
  },
  {
    slug: 'python-story',
    title: 'Python story',
    url: 'https://example.com/python-story',
    language: LanguageName.python,
    level: [Level.two],
    collections: ['pythonProjects', 'storyProjects'],
  },
  {
    slug: 'python-game',
    title: 'Python game',
    url: 'https://example.com/python-game',
    language: LanguageName.python,
    level: [Level.one],
    collections: ['gameProjects'],
  },
  {
    slug: 'christmas-game',
    title: 'Christmas game',
    url: 'https://example.com/christmas-game',
    language: LanguageName.python,
    level: [Level.one],
    collections: ['gameProjects', 'christmasProjects'],
  },
]

test('combines topic, coding tool, and challenge criteria', () => {
  const discovery = createProjectDiscovery(projects, new Date('2026-08-15'))

  expect(discovery.find({ topic: 'stories' }).map((project) => project.slug)).toEqual(['scratch-story', 'python-story'])
  expect(discovery.find({ topic: 'stories', language: LanguageName.python }).map((project) => project.slug)).toEqual(['python-story'])
  expect(discovery.find({ language: LanguageName.python, level: Level.one }).map((project) => project.slug)).toEqual(['python-game'])
})

test('deduplicates projects before filtering', () => {
  const discovery = createProjectDiscovery([...projects, projects[0]], new Date('2026-08-15'))

  expect(discovery.find({ topic: 'stories' })).toHaveLength(2)
})

test('only includes Christmas topics and projects during December', () => {
  const august = createProjectDiscovery(projects, new Date('2026-08-15'))
  const december = createProjectDiscovery(projects, new Date('2026-12-15'))

  expect(august.topics.map((topic) => topic.slug)).not.toContain('christmas')
  expect(august.find({ language: LanguageName.python }).map((project) => project.slug)).not.toContain('christmas-game')
  expect(august.find({ topic: 'christmas' })).toEqual([])

  expect(december.topics.map((topic) => topic.slug)).toContain('christmas')
  expect(december.find({ language: LanguageName.python }).map((project) => project.slug)).toContain('christmas-game')
  expect(december.find({ topic: 'christmas' }).map((project) => project.slug)).toEqual(['christmas-game'])
})
