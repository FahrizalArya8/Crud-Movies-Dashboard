import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()
const moviesFilePath = path.join(__dirname, '../..', 'src', 'data', 'movies.json')

const readMovies = () => {
    const data = fs.readFileSync(moviesFilePath, 'utf8')
    return JSON.parse(data)
}

const writeMovies = (movies) => {
    fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2))
}

router.get('/', (req, res) => {
    try {
        const movies = readMovies()
        res.json({ success: true, movies })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to read movies' })
    }
})

router.post('/', (req, res) => {
    try {
        const movies = readMovies()
        const newMovie = {
            id: movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1,
            ...req.body
        }
        movies.unshift(newMovie)
        writeMovies(movies)
        res.json({ success: true, movie: newMovie })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add movie' })
    }
})

router.delete('/:id', (req, res) => {
    try {
        const movies = readMovies()
        const movieId = parseInt(req.params.id)
        const filteredMovies = movies.filter(m => m.id !== movieId)

        if (filteredMovies.length === movies.length) {
            return res.status(404).json({ success: false, message: 'Movie not found' })
        }

        writeMovies(filteredMovies)
        res.json({ success: true, message: 'Movie deleted' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete movie' })
    }
})

export default router
