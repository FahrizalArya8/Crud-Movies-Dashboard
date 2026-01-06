import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm/LoginForm'
import Dashboard from './components/Dashboard/Dashboard'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import './App.css'

function App() {
    const [theme, setTheme] = useState('light')
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light'
        const token = localStorage.getItem('token')

        setTheme(savedTheme)
        setIsAuthenticated(!!token)
        document.documentElement.setAttribute('data-theme', savedTheme)
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
    }

    const handleLoginSuccess = () => {
        setIsAuthenticated(true)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
    }

    return (
        <>
            {isAuthenticated ? (
                <Dashboard onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />
            ) : (
                <>
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                </>
            )}
        </>
    )
}

export default App
