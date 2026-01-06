import { useState } from 'react'
import Swal from 'sweetalert2'
import './LoginForm.css'

const LoginForm = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const getTheme = () => {
        return document.documentElement.getAttribute('data-theme') || 'light'
    }

    const showAlert = (title, text, icon) => {
        const isDark = getTheme() === 'dark'

        Swal.fire({
            title,
            text,
            icon,
            confirmButtonText: 'OK',
            background: isDark ? '#1a2332' : '#ffffff',
            color: isDark ? '#f8f9fa' : '#1a1a1a',
            confirmButtonColor: isDark ? '#8b5cf6' : '#667eea',
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json()

            if (data.success) {
                localStorage.setItem('token', data.token)
                showAlert('Success!', 'Login successful', 'success')
                setTimeout(() => {
                    onLoginSuccess()
                }, 1500)
            } else {
                setError(data.message)
            }
        } catch (err) {
            setError('Failed to connect to server')
        } finally {
            setIsLoading(false)
        }
    }

    const handleForgotPassword = (e) => {
        e.preventDefault()
        showAlert('Not Available', 'Forgot Password feature is not yet implemented', 'info')
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        showAlert('Not Available', 'Sign Up feature is not yet implemented', 'info')
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Sign in to continue to dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="form-options">
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input" />
                            <span className="checkbox-text">Remember me</span>
                        </label>
                        <a href="#" className="forgot-link" onClick={handleForgotPassword}>
                            Forgot password?
                        </a>
                    </div>

                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? (
                            <span className="loading-spinner"></span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p className="footer-text">
                        Don't have an account?{' '}
                        <a href="#" className="signup-link" onClick={handleSignUp}>
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
