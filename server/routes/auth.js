import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.post('/login', (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username and password are required'
        })
    }

    const validUsername = process.env.ADMIN_USERNAME?.trim()
    const validPassword = process.env.ADMIN_PASSWORD?.trim()

    if (username === validUsername && password === validPassword) {
        const token = jwt.sign(
            { username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        return res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                username
            }
        })
    } else {
        return res.status(401).json({
            success: false,
            message: 'Invalid username or password'
        })
    }
})

router.post('/verify', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return res.json({
            success: true,
            user: {
                username: decoded.username
            }
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        })
    }
})

export default router
