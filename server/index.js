import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import authRoutes from './routes/auth.js'
import moviesRoutes from './routes/movies.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/movies', moviesRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Auth API Server is running' })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
