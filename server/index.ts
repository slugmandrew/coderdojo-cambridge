import { config } from 'dotenv'
import { createApp } from './app'

config()

const port = Number(process.env.PORT || 3001)
const { app } = createApp()

app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})
