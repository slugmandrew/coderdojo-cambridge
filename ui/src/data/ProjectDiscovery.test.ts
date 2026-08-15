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
]

test('combines topic, coding tool, and challenge criteria', () => {
  const discovery = createProjectDiscovery(projects)

  expect(discovery.find({ topic: 'stories' }).map((project) => project.slug)).toEqual(['scratch-story', 'python-story'])
  expect(discovery.find({ topic: 'stories', language: LanguageName.python }).map((project) => project.slug)).toEqual(['python-story'])
  expect(discovery.find({ language: LanguageName.python, level: Level.one }).map((project) => project.slug)).toEqual(['python-game'])
})

test('deduplicates projects before filtering', () => {
  const discovery = createProjectDiscovery([...projects, projects[0]])

  expect(discovery.find({ topic: 'stories' })).toHaveLength(2)
})
