import { config } from 'dotenv'
import express from 'express'
import getMetaData from 'metadata-scraper'
import multer from 'multer'
import Pageres from 'pageres'
import path from 'path'

const PORT = process.env.PORT || 3001

const app = express()
var upload = multer()

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../ui/build')))

app.use(express.json())
app.use(express.urlencoded())

// for parsing multipart/form-data
// app.use(upload.array());

config()
console.log(process.env)

let client

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

app.post('/api/scrape', (req, res) => {
  console.log('POST scrape')

  const { url } = req.body
  console.log('URL', url)

  const slug = url.split('/').pop()
  console.log('slug', slug)

  getMetaData(url).then((data) => {
    console.log(data)
  })

  return new Pageres({
    filename: slug,
    launchOptions: { args: ['--no-sandbox'] },
    cookies: [
      {
        domain: 'projects.raspberrypi.org',
        name: 'CookieConsent',
        value:
          '{stamp:%27PLNUquZuahjJMTgLlcAwWIVqRTJLYviRbJV2qEKXPYrRWxlTN0cwDg==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:1%2Cutc:1655543841539%2Cregion:%27gb%27}',
      },
      {
        domain: 'projects.raspberrypi.org',
        name: 'surveyBannerHide',
        value: 'true',
      },
    ],
  })
    .src(url, ['1024x768'])
    .dest(path.resolve(__dirname, '../ui/public/screenshot'))
    .run()
    .then((result) => res.json({ message: url, slug: slug }))
    .catch((reason) => res.status(400).send(reason))
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
app.get('*', (req, res) => {
  console.log('GET *')
  res.sendFile(path.resolve(__dirname, '../ui/build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
