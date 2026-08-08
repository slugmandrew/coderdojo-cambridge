import { config } from 'dotenv'
import { scryptSync, timingSafeEqual } from 'crypto'
import express from 'express'
import { mkdir, readFile, rename, writeFile } from 'fs/promises'
import path from 'path'
import puppeteer from 'puppeteer'

config()

const PORT = process.env.PORT || 3001
const scheduleFile = process.env.SCHEDULE_DATA_FILE || path.resolve(__dirname, '../data/schedule.json')

type DojoSession = {
  id: string
  date: string
  title: string
  time: string
  bookingUrl?: string
  note?: string
  cancelled?: boolean
}

type Schedule = { sessions: DojoSession[]; updatedAt: string | null }

const defaultSchedule: Schedule = {
  updatedAt: null,
  sessions: [
    { id: '2026-01-10', date: '2026-01-10', title: 'January Dojo', time: '10:00–13:00' },
    { id: '2026-02-14', date: '2026-02-14', title: 'February Dojo', time: '10:00–13:00' },
    { id: '2026-03-14', date: '2026-03-14', title: 'March Dojo', time: '10:00–13:00' },
    { id: '2026-04-11', date: '2026-04-11', title: 'April Dojo', time: '10:00–13:00' },
    { id: '2026-05-09', date: '2026-05-09', title: 'May Dojo', time: '10:00–13:00' },
    { id: '2026-06-13', date: '2026-06-13', title: 'June Dojo', time: '10:00–13:00' },
    { id: '2026-09-12', date: '2026-09-12', title: 'September Dojo', time: '10:00–13:00' },
    { id: '2026-10-10', date: '2026-10-10', title: 'October Dojo', time: '10:00–13:00' },
    { id: '2026-11-14', date: '2026-11-14', title: 'November Dojo', time: '10:00–13:00' },
    { id: '2026-12-12', date: '2026-12-12', title: 'December Dojo', time: '10:00–13:00' },
  ],
}

const isSession = (value: unknown): value is DojoSession => {
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

const readSchedule = async (): Promise<Schedule> => {
  try {
    const parsed: unknown = JSON.parse(await readFile(scheduleFile, 'utf8'))
    if (!parsed || typeof parsed !== 'object') return defaultSchedule
    const schedule = parsed as Partial<Schedule>
    if (!Array.isArray(schedule.sessions) || !schedule.sessions.every(isSession)) return defaultSchedule
    return { sessions: schedule.sessions, updatedAt: typeof schedule.updatedAt === 'string' ? schedule.updatedAt : null }
  } catch (error: unknown) {
    const code = error && typeof error === 'object' && 'code' in error ? (error as { code?: string }).code : undefined
    if (code !== 'ENOENT') console.error('Unable to read schedule:', error)
    return defaultSchedule
  }
}

const saveSchedule = async (schedule: Schedule) => {
  await mkdir(path.dirname(scheduleFile), { recursive: true })
  const temporaryFile = `${scheduleFile}.tmp`
  await writeFile(temporaryFile, `${JSON.stringify(schedule, null, 2)}\n`, { encoding: 'utf8', mode: 0o600 })
  await rename(temporaryFile, scheduleFile)
}

const editorKeyIsValid = (suppliedKey: string | undefined) => {
  const configuredHash = process.env.SCHEDULE_ADMIN_KEY_HASH
  if (!configuredHash || !suppliedKey) return false
  const [salt, expectedHex] = configuredHash.split(':')
  if (!salt || !expectedHex || !/^[a-f0-9]{64}$/i.test(expectedHex)) return false
  const expected = Buffer.from(expectedHex, 'hex')
  const actual = scryptSync(suppliedKey, salt, expected.length)
  return timingSafeEqual(actual, expected)
}

const app = express()

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../ui/build')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.get('/api/schedule', async (_req, res) => {
  res.set('Cache-Control', 'no-store')
  res.json(await readSchedule())
})

app.put('/api/schedule', async (req, res) => {
  const configuredHash = process.env.SCHEDULE_ADMIN_KEY_HASH
  const suppliedKey = req.get('authorization')?.replace(/^Bearer\s+/i, '')

  if (!configuredHash) return res.status(503).json({ message: 'Schedule editing has not been configured.' })
  if (!editorKeyIsValid(suppliedKey)) return res.status(401).json({ message: 'That editor key is not valid.' })

  const sessions = (req.body as { sessions?: unknown })?.sessions
  if (!Array.isArray(sessions) || sessions.length > 40 || !sessions.every(isSession)) {
    return res.status(400).json({ message: 'Check each session has a title, valid date, and time.' })
  }
  if (new Set(sessions.map((session) => session.id)).size !== sessions.length) {
    return res.status(400).json({ message: 'Each session must have a unique id.' })
  }

  const schedule: Schedule = { sessions: [...sessions].sort((left, right) => left.date.localeCompare(right.date)), updatedAt: new Date().toISOString() }
  await saveSchedule(schedule)
  res.json(schedule)
})

// const dbSetup = async () => {
//   client =
//     process.env.NODE_ENV === 'production'
//       ? new Client({
//           connectionString: process.env.DATABASE_URL,
//           ssl: {
//             rejectUnauthorized: false,
//           },
//         })
//       : new Client({
//           connectionString: process.env.DATABASE_URL,
//         })
//   await client.connect()
//   const res2 = await client.query('SELECT table_schema,table_name FROM information_schema.tables')
//   console.log(res2.rows)
// }
//
// void dbSetup()

app.get('/api', (req, res) => {
  console.log('GET api')
  setTimeout(() => res.json({ message: 'Hello from server, buddy!' }), 500)
})

app.post('/api/scrape', async (req, res) => {
  console.log('POST scrape')

  const { url } = req.body
  if (typeof url !== 'string') return res.status(400).send('A URL is required')

  try {
    const parsedUrl = new URL(url)
    if (parsedUrl.protocol !== 'https:' || parsedUrl.hostname !== 'projects.raspberrypi.org') {
      return res.status(400).send('Only Raspberry Pi project URLs are supported')
    }

    const slug = (path.basename(parsedUrl.pathname) || 'screenshot').replace(/[^a-z0-9-_]/gi, '-')
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] })

    try {
      await browser.setCookie(
        {
          domain: 'projects.raspberrypi.org',
          name: 'CookieConsent',
          value:
            '{stamp:%27PLNUquZuahjJMTgLlcAwWIVqRTJLYviRbJV2qEKXPYrRWxlTN0cwDg==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:1%2Cutc:1655543841539%2Cregion:%27gb%27}',
        },
        { domain: 'projects.raspberrypi.org', name: 'surveyBannerHide', value: 'true' },
      )
      const page = await browser.newPage()
      await page.setViewport({ width: 1024, height: 768 })
      await page.goto(parsedUrl.href, { waitUntil: 'networkidle2' })
      await page.screenshot({ path: path.resolve(__dirname, `../ui/public/screenshot/${slug}.png`) })
      return res.json({ message: parsedUrl.href, slug })
    } finally {
      await browser.close()
    }
  } catch (reason: unknown) {
    return res.status(400).send(reason instanceof Error ? reason.message : 'Screenshot failed')
  }
})

// app.post('/api/login', (req, res) => {
//   const { username, password } = req.body
//
//   console.log('username', username)
//
//   if (username === 'admin') return res.status(200).send(username)
//   else return res.status(401).send('Failed to login due to incorrect credentials')
// })

// app.get('/api/dreams', async (req, res) => {
//   const result = await client.query('SELECT * FROM dreams')
//   return res.json(result.rows)
// })
//
// app.get('/api/dreams/by-id/:id', async (req, res) => {
//   const { id } = req.params
//   const result = await client.query('SELECT * FROM dreams WHERE id=$1', [id])
//   return res.json(result.rows)
// })
//
// app.get('/api/users', async (req, res) => {
//   const result = await client.query('SELECT * FROM users')
//   return res.json(result.rows)
// })
//
// app.get('/api/users/by-id/:id', async (req, res) => {
//   const { id } = req.params
//   const result = await client.query('SELECT * FROM users WHERE id=$1', [id])
//   return res.json(result.rows)
// })

// All other GET requests not handled before will return our React app
app.get('/{*splat}', (req, res) => {
  console.log('GET *')
  res.sendFile(path.resolve(__dirname, '../ui/build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
