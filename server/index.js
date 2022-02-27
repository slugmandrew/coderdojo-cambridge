const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { Client } = require('pg')
var multer = require('multer')

const PORT = process.env.PORT || 3001

const app = express()
var upload = multer()

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../ui/build')))

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// for parsing multipart/form-data
app.use(upload.array())

require('dotenv').config()
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

  return res.json({ message: url })
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
