import { mkdtempSync, rmSync } from 'fs'
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
