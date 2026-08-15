import { existsSync, mkdirSync, readFileSync } from 'fs'
import path from 'path'
import { DatabaseSync } from 'node:sqlite'
import seedCatalog from '../ui/src/data/ProjectData'

export type ClubSession = {
  id: string
  date: string
  title: string
  time: string
  bookingUrl?: string
  note?: string
  cancelled?: boolean
}

export type Schedule = { sessions: ClubSession[]; updatedAt: string | null }

export type Project = {
  slug: string
  url: string
  title: string
  level: string[]
  language: string
  track?: { name: string; position: number }
  domain?: string
  imageUrl?: string
  collections: string[]
}

export type ProjectCatalog = {
  projects: Project[]
}

export type NewProject = Pick<Project, 'title' | 'url' | 'language' | 'level'> & { imageUrl?: string; collections?: string[] }

const defaultSchedule: Schedule = {
  updatedAt: null,
  sessions: [
    { id: '2026-01-10', date: '2026-01-10', title: 'January Code Club', time: '10:00–13:00' },
    { id: '2026-02-14', date: '2026-02-14', title: 'February Code Club', time: '10:00–13:00' },
    { id: '2026-03-14', date: '2026-03-14', title: 'March Code Club', time: '10:00–13:00' },
    { id: '2026-04-11', date: '2026-04-11', title: 'April Code Club', time: '10:00–13:00' },
    { id: '2026-05-09', date: '2026-05-09', title: 'May Code Club', time: '10:00–13:00' },
    { id: '2026-06-13', date: '2026-06-13', title: 'June Code Club', time: '10:00–13:00' },
    { id: '2026-09-12', date: '2026-09-12', title: 'September Code Club', time: '10:00–13:00' },
    { id: '2026-10-10', date: '2026-10-10', title: 'October Code Club', time: '10:00–13:00' },
    { id: '2026-11-14', date: '2026-11-14', title: 'November Code Club', time: '10:00–13:00' },
    { id: '2026-12-12', date: '2026-12-12', title: 'December Code Club', time: '10:00–13:00' },
  ],
}

const collectionNames = Object.keys(seedCatalog) as Array<keyof typeof seedCatalog>
const topicCollectionNames: string[] = collectionNames.filter((name) => !['projects', 'pythonProjects'].includes(name))
const allowedLanguages = new Set(['💻 Hardware', '🐱 Scratch', '🐍 Python', 'Unity', 'HTML', 'MakeCode'])
const allowedLevels = new Set(['Level 1', 'Level 2', 'Level 3'])

export class ContentValidationError extends Error {}

const isSession = (value: unknown): value is ClubSession => {
  if (!value || typeof value !== 'object') return false
  const session = value as Record<string, unknown>
  return (
    typeof session.id === 'string' &&
    session.id.length > 0 &&
    session.id.length <= 80 &&
    typeof session.date === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(session.date) &&
    !Number.isNaN(Date.parse(`${session.date}T12:00:00Z`)) &&
    typeof session.title === 'string' &&
    session.title.length > 0 &&
    session.title.length <= 120 &&
    typeof session.time === 'string' &&
    session.time.length > 0 &&
    session.time.length <= 80 &&
    (session.bookingUrl === undefined ||
      (typeof session.bookingUrl === 'string' && /^https:\/\//.test(session.bookingUrl) && session.bookingUrl.length <= 500)) &&
    (session.note === undefined || (typeof session.note === 'string' && session.note.length <= 500)) &&
    (session.cancelled === undefined || typeof session.cancelled === 'boolean')
  )
}

const legacySchedule = (filename: string | undefined): Schedule | undefined => {
  if (!filename || !existsSync(filename)) return undefined
  try {
    const parsed = JSON.parse(readFileSync(filename, 'utf8')) as Partial<Schedule>
    if (!Array.isArray(parsed.sessions) || !parsed.sessions.every(isSession)) return undefined
    return { sessions: parsed.sessions, updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : null }
  } catch {
    return undefined
  }
}

const projectSlug = (title: string) =>
  title
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)

const validateProject = (value: NewProject) => {
  if (typeof value.title !== 'string' || value.title.trim().length < 2 || value.title.trim().length > 120) {
    throw new ContentValidationError('Give the project a title between 2 and 120 characters.')
  }
  if (typeof value.url !== 'string' || value.url.length > 500) throw new ContentValidationError('Give the project a valid HTTPS link.')
  try {
    if (new URL(value.url).protocol !== 'https:') throw new Error()
  } catch {
    throw new ContentValidationError('Give the project a valid HTTPS link.')
  }
  if (!allowedLanguages.has(value.language)) throw new ContentValidationError('Choose a supported project language.')
  if (!Array.isArray(value.level) || value.level.length === 0 || !value.level.every((level) => allowedLevels.has(level))) {
    throw new ContentValidationError('Choose at least one supported project level.')
  }
  if (value.collections && (!Array.isArray(value.collections) || !value.collections.every((collection) => topicCollectionNames.includes(collection)))) {
    throw new ContentValidationError('Choose supported project topics.')
  }
  if (value.imageUrl) {
    try {
      if (new URL(value.imageUrl).protocol !== 'https:') throw new Error()
    } catch {
      throw new ContentValidationError('The image must use a valid HTTPS link.')
    }
  }
}

type ProjectRow = {
  slug: string
  url: string
  title: string
  language: string
  domain: string | null
  image_url: string | null
  track_name: string | null
  track_position: number | null
}

export const createContentStore = (databaseFile: string, legacyScheduleFile?: string) => {
  if (databaseFile !== ':memory:') mkdirSync(path.dirname(databaseFile), { recursive: true })
  const database = new DatabaseSync(databaseFile, { timeout: 5_000 })
  database.exec('PRAGMA foreign_keys = ON')
  if (databaseFile !== ':memory:') database.exec('PRAGMA journal_mode = WAL')
  database.exec(`
    CREATE TABLE IF NOT EXISTS metadata (
      key TEXT PRIMARY KEY,
      value TEXT
    ) STRICT;
    CREATE TABLE IF NOT EXISTS club_sessions (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      title TEXT NOT NULL,
      time TEXT NOT NULL,
      booking_url TEXT,
      note TEXT,
      cancelled INTEGER NOT NULL DEFAULT 0
    ) STRICT;
    CREATE TABLE IF NOT EXISTS projects (
      slug TEXT PRIMARY KEY,
      url TEXT NOT NULL,
      title TEXT NOT NULL,
      language TEXT NOT NULL,
      domain TEXT,
      image_url TEXT,
      track_name TEXT,
      track_position INTEGER,
      created_by TEXT,
      created_at TEXT NOT NULL
    ) STRICT;
    CREATE TABLE IF NOT EXISTS project_levels (
      project_slug TEXT NOT NULL REFERENCES projects(slug) ON DELETE CASCADE,
      level TEXT NOT NULL,
      PRIMARY KEY (project_slug, level)
    ) STRICT;
    CREATE TABLE IF NOT EXISTS project_collections (
      project_slug TEXT NOT NULL REFERENCES projects(slug) ON DELETE CASCADE,
      collection TEXT NOT NULL,
      position INTEGER NOT NULL,
      PRIMARY KEY (project_slug, collection)
    ) STRICT;
  `)

  const insertSession = database.prepare('INSERT INTO club_sessions (id, date, title, time, booking_url, note, cancelled) VALUES (?, ?, ?, ?, ?, ?, ?)')
  const seedSchedule = legacySchedule(legacyScheduleFile) ?? defaultSchedule
  const scheduleInitialized = database.prepare("SELECT 1 FROM metadata WHERE key = 'schedule_initialized'").get()
  if (!scheduleInitialized) {
    for (const session of seedSchedule.sessions) {
      insertSession.run(session.id, session.date, session.title, session.time, session.bookingUrl ?? null, session.note ?? null, session.cancelled ? 1 : 0)
    }
    database.prepare('INSERT OR REPLACE INTO metadata (key, value) VALUES (?, ?)').run('schedule_updated_at', seedSchedule.updatedAt)
    database.prepare('INSERT OR REPLACE INTO metadata (key, value) VALUES (?, ?)').run('schedule_initialized', '1')
  }

  const insertProject = database.prepare(
    `INSERT OR IGNORE INTO projects
      (slug, url, title, language, domain, image_url, track_name, track_position, created_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  const insertLevel = database.prepare('INSERT OR IGNORE INTO project_levels (project_slug, level) VALUES (?, ?)')
  const insertCollection = database.prepare('INSERT OR IGNORE INTO project_collections (project_slug, collection, position) VALUES (?, ?, ?)')
  const seededAt = new Date(0).toISOString()
  for (const collection of collectionNames) {
    seedCatalog[collection].forEach((project, position) => {
      insertProject.run(
        project.slug,
        project.url,
        project.title,
        project.language,
        project.domain ?? null,
        null,
        project.track?.name ?? null,
        project.track?.position ?? null,
        null,
        seededAt,
      )
      for (const level of project.level) insertLevel.run(project.slug, level)
      insertCollection.run(project.slug, collection, position)
    })
  }
  database.prepare("INSERT OR IGNORE INTO project_levels (project_slug, level) SELECT project_slug, 'Level 1' FROM project_levels WHERE level = 'Intro'").run()
  database.prepare("DELETE FROM project_levels WHERE level = 'Intro'").run()
  database.prepare('INSERT OR REPLACE INTO metadata (key, value) VALUES (?, ?)').run('projects_initialized', '1')

  const projectFromRow = (row: ProjectRow): Project => {
    const levelRows = database.prepare('SELECT level FROM project_levels WHERE project_slug = ? ORDER BY level').all(row.slug) as Array<{ level: string }>
    const collectionRows = database.prepare('SELECT collection FROM project_collections WHERE project_slug = ? ORDER BY collection').all(row.slug) as Array<{
      collection: string
    }>
    return {
      slug: row.slug,
      url: row.url,
      title: row.title,
      language: row.language,
      level: levelRows.map(({ level }) => level),
      collections: collectionRows.map(({ collection }) => collection),
      ...(row.domain ? { domain: row.domain } : {}),
      ...(row.image_url ? { imageUrl: row.image_url } : {}),
      ...(row.track_name && row.track_position ? { track: { name: row.track_name, position: row.track_position } } : {}),
    }
  }

  return {
    getSchedule(): Schedule {
      const rows = database.prepare('SELECT id, date, title, time, booking_url, note, cancelled FROM club_sessions ORDER BY date, id').all() as Array<{
        id: string
        date: string
        title: string
        time: string
        booking_url: string | null
        note: string | null
        cancelled: number
      }>
      const updated = database.prepare("SELECT value FROM metadata WHERE key = 'schedule_updated_at'").get() as { value: string | null } | undefined
      return {
        sessions: rows.map((row) => ({
          id: row.id,
          date: row.date,
          title: row.title,
          time: row.time,
          ...(row.booking_url ? { bookingUrl: row.booking_url } : {}),
          ...(row.note ? { note: row.note } : {}),
          ...(row.cancelled ? { cancelled: true } : {}),
        })),
        updatedAt: updated?.value ?? null,
      }
    },

    saveSchedule(sessions: unknown): Schedule {
      if (!Array.isArray(sessions) || sessions.length > 40 || !sessions.every(isSession)) {
        throw new ContentValidationError('Check each session has a title, valid date, and time.')
      }
      if (new Set(sessions.map((session) => session.id)).size !== sessions.length) {
        throw new ContentValidationError('Each session must have a unique id.')
      }
      const updatedAt = new Date().toISOString()
      database.exec('BEGIN IMMEDIATE')
      try {
        database.exec('DELETE FROM club_sessions')
        for (const session of [...sessions].sort((left, right) => left.date.localeCompare(right.date))) {
          insertSession.run(session.id, session.date, session.title, session.time, session.bookingUrl ?? null, session.note ?? null, session.cancelled ? 1 : 0)
        }
        database.prepare('INSERT OR REPLACE INTO metadata (key, value) VALUES (?, ?)').run('schedule_updated_at', updatedAt)
        database.prepare('INSERT OR REPLACE INTO metadata (key, value) VALUES (?, ?)').run('schedule_initialized', '1')
        database.exec('COMMIT')
      } catch (error) {
        database.exec('ROLLBACK')
        throw error
      }
      return this.getSchedule()
    },

    listProjects(): ProjectCatalog {
      const rows = database
        .prepare(
          `SELECT p.slug, p.url, p.title, p.language, p.domain, p.image_url, p.track_name, p.track_position
           FROM projects p
           ORDER BY p.created_at, p.title`,
        )
        .all() as ProjectRow[]
      return { projects: rows.map(projectFromRow) }
    },

    addProject(input: NewProject, mentorSubject: string): Project {
      validateProject(input)
      const baseSlug = projectSlug(input.title) || 'project'
      let slug = baseSlug
      let suffix = 2
      while (database.prepare('SELECT 1 FROM projects WHERE slug = ?').get(slug)) slug = `${baseSlug}-${suffix++}`
      const parsedUrl = new URL(input.url)
      const hostname = parsedUrl.hostname.replace(/^www\./, '')
      const domain = hostname === 'projects.raspberrypi.org' ? 'raspberrypi.org' : hostname
      const project: Project = {
        slug,
        title: input.title.trim(),
        url: input.url,
        language: input.language,
        level: [...new Set(input.level)],
        collections: ['projects', ...new Set(input.collections ?? [])],
        domain,
        ...(input.imageUrl ? { imageUrl: input.imageUrl } : {}),
      }
      database.exec('BEGIN IMMEDIATE')
      try {
        insertProject.run(
          slug,
          project.url,
          project.title,
          project.language,
          domain,
          project.imageUrl ?? null,
          null,
          null,
          mentorSubject,
          new Date().toISOString(),
        )
        for (const level of project.level) insertLevel.run(slug, level)
        const position = (
          database.prepare("SELECT COALESCE(MAX(position), -1) + 1 AS position FROM project_collections WHERE collection = 'projects'").get() as {
            position: number
          }
        ).position
        insertCollection.run(slug, 'projects', position)
        for (const collection of new Set(input.collections ?? [])) {
          const topicPosition = (
            database.prepare('SELECT COALESCE(MAX(position), -1) + 1 AS position FROM project_collections WHERE collection = ?').get(collection) as {
              position: number
            }
          ).position
          insertCollection.run(slug, collection, topicPosition)
        }
        database.exec('COMMIT')
      } catch (error) {
        database.exec('ROLLBACK')
        throw error
      }
      return project
    },

    close() {
      database.close()
    },
  }
}

export type ContentStore = ReturnType<typeof createContentStore>
