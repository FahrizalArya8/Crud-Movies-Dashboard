import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import './Dashboard.css'

const Dashboard = ({ onLogout, theme, toggleTheme }) => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMovies()
    }, [])

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/movies')
            const data = await response.json()
            if (data.success) {
                setMovies(data.movies)
            }
        } catch (error) {
            console.error('Failed to fetch movies:', error)
        } finally {
            setLoading(false)
        }
    }

    const getTheme = () => {
        return document.documentElement.getAttribute('data-theme') || 'light'
    }

    const getSwalTheme = () => {
        const isDark = getTheme() === 'dark'
        return {
            background: isDark ? '#1a2332' : '#ffffff',
            color: isDark ? '#f8f9fa' : '#1a1a1a',
            confirmButtonColor: isDark ? '#8b5cf6' : '#667eea',
            cancelButtonColor: isDark ? '#6b7280' : '#9ca3af',
        }
    }

    const handleAddMovie = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Add New Movie',
            html: `
        <input id="swal-title" class="swal2-input" placeholder="Title" style="width: 80%">
        <input id="swal-year" class="swal2-input" type="number" placeholder="Year" style="width: 80%">
        <input id="swal-rating" class="swal2-input" type="number" step="0.1" placeholder="IMDB Rating" style="width: 80%">
        <input id="swal-banner" class="swal2-input" placeholder="Banner URL" style="width: 80%">
        <input id="swal-genres" class="swal2-input" placeholder="Genres (comma separated)" style="width: 80%">
        <textarea id="swal-synopsis" class="swal2-textarea" placeholder="Synopsis" style="width: 80%"></textarea>
      `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Add Movie',
            cancelButtonText: 'Cancel',
            ...getSwalTheme(),
            preConfirm: () => {
                const title = document.getElementById('swal-title').value
                const year = document.getElementById('swal-year').value
                const rating = document.getElementById('swal-rating').value
                const banner = document.getElementById('swal-banner').value
                const genres = document.getElementById('swal-genres').value
                const synopsis = document.getElementById('swal-synopsis').value

                if (!title || !year || !rating || !banner || !genres || !synopsis) {
                    Swal.showValidationMessage('Please fill all fields')
                    return false
                }

                return {
                    title,
                    year: parseInt(year),
                    imdbRating: parseFloat(rating),
                    banner,
                    genres: genres.split(',').map(g => g.trim()),
                    synopsis
                }
            }
        })

        if (formValues) {
            try {
                const response = await fetch('http://localhost:5000/api/movies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                })

                const data = await response.json()

                if (data.success) {
                    await fetchMovies()
                    Swal.fire({
                        title: 'Success!',
                        text: 'Movie added successfully',
                        icon: 'success',
                        ...getSwalTheme()
                    })
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: data.message || 'Failed to add movie',
                        icon: 'error',
                        ...getSwalTheme()
                    })
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add movie',
                    icon: 'error',
                    ...getSwalTheme()
                })
            }
        }
    }

    const handleDeleteMovie = (movieId, movieTitle) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete "${movieTitle}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            ...getSwalTheme()
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:5000/api/movies/${movieId}`, {
                        method: 'DELETE',
                    })

                    const data = await response.json()

                    if (data.success) {
                        await fetchMovies()
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Movie has been deleted',
                            icon: 'success',
                            ...getSwalTheme()
                        })
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: data.message || 'Failed to delete movie',
                            icon: 'error',
                            ...getSwalTheme()
                        })
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete movie',
                        icon: 'error',
                        ...getSwalTheme()
                    })
                }
            }
        })
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Dashboard</h1>
                <div className="header-actions">
                    <button onClick={handleAddMovie} className="add-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Movie
                    </button>
                    <button onClick={onLogout} className="logout-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                    </button>
                    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'light' ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            <div className="movies-grid">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <button
                            className="delete-btn"
                            onClick={() => handleDeleteMovie(movie.id, movie.title)}
                            aria-label="Delete movie"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                        <div className="movie-banner">
                            <img src={movie.banner} alt={movie.title} />
                            <div className="movie-rating">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                {movie.imdbRating}
                            </div>
                        </div>

                        <div className="movie-content">
                            <h3 className="movie-title">{movie.title}</h3>
                            <div className="movie-meta">
                                <span className="movie-year">{movie.year}</span>
                                <span className="movie-genres">
                                    {movie.genres.join(', ')}
                                </span>
                            </div>
                            <p className="movie-synopsis">{movie.synopsis}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
