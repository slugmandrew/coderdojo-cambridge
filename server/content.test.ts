import { mkdtempSync, rmSync } from 'fs'
import { DatabaseSync } from 'node:sqlite'
import { tmpdir } from 'os'
import path from 'path'
import { afterEach, expect, test } from 'vitest'
import { createContentStore } from './content'

const temporaryDirectories: string[] = []

afterEach(() => {
  while (temporaryDirectories.length) rmSync(temporaryDirectories.pop()!, { recursive: true })
})

test('an intentionally empty schedule remains empty after reopening the database', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'codeclub-content-'))
  temporaryDirectories.push(directory)
  const databaseFile = path.join(directory, 'content.sqlite')
  const first = createContentStore(databaseFile)
  first.saveSchedule([])
  first.close()

  const reopened = createContentStore(databaseFile)
  expect(reopened.getSchedule().sessions).toEqual([])
  reopened.close()
})

test('lists one unified project catalogue with topic memberships', () => {
  const store = createContentStore(':memory:')
  const catalog = store.listProjects()

  expect(catalog.projects.length).toBeGreaterThan(60)
  expect(new Set(catalog.projects.map((project) => project.slug)).size).toBe(catalog.projects.length)
  expect(catalog.projects.find((project) => project.slug === 'storytime')?.collections).toEqual(expect.arrayContaining(['pythonProjects', 'storyProjects']))
  expect(catalog.projects.find((project) => project.slug === 'web-design-module-1')?.collections).toContain('webDesignProjects')
  expect(catalog.projects.flatMap((project) => project.level)).not.toContain('Intro')

  store.close()
})

test('migrates existing Intro projects to Level 1', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'codeclub-content-'))
  temporaryDirectories.push(directory)
  const databaseFile = path.join(directory, 'content.sqlite')
  createContentStore(databaseFile).close()

  const legacyDatabase = new DatabaseSync(databaseFile)
  legacyDatabase
    .prepare(
      `INSERT INTO projects (slug, url, title, language, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .run('legacy-setup', 'https://example.com/setup', 'Legacy setup', '💻 Hardware', new Date(0).toISOString())
  legacyDatabase.prepare('INSERT INTO project_levels (project_slug, level) VALUES (?, ?)').run('legacy-setup', 'Intro')
  legacyDatabase.prepare('INSERT INTO project_collections (project_slug, collection, position) VALUES (?, ?, ?)').run('legacy-setup', 'projects', 999)
  legacyDatabase.close()

  const migrated = createContentStore(databaseFile)
  expect(migrated.listProjects().projects.find((project) => project.slug === 'legacy-setup')?.level).toEqual(['Level 1'])
  migrated.close()
})

test('publishes a project into the main catalogue and selected topics', () => {
  const store = createContentStore(':memory:')

  store.addProject(
    {
      title: 'A new story',
      url: 'https://example.com/new-story',
      language: '🐱 Scratch',
      level: ['Level 1'],
      collections: ['storyProjects', 'gameProjects'],
    },
    'mentor-123',
  )

  expect(store.listProjects().projects.find((project) => project.slug === 'a-new-story')?.collections).toEqual(
    expect.arrayContaining(['projects', 'storyProjects', 'gameProjects']),
  )
  store.close()
})
