import '../styles/homePage.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import '../App.css'

const movies = [
  { 
    title: 'Barbie',
    image: 'src/assets/movie-posters/barbie-poster.jpg',
    theatre: 'CineNova Market Mall',
    date: '2025-11-27',
    rating: 'PG-13',
    language: 'English',
    genre: 'Comedy',
    duration: '1h 45m',
    description:
      'Barbie and Ken leave Barbie Land and discover the joys and challenges of living in the real world.'
  },
  { 
    title: 'Sinners', 
    image: 'src/assets/movie-posters/sinners-poster.jpeg',
    theatre: 'CineNova Downtown',
    date: '2025-12-01',
    rating: 'R',
    language: 'English',
    genre: 'Horror',
    duration: '2h 17m',
    description:
      'A period horror film about twin brothers who return to their hometown in the Jim Crow-era Mississippi Delta to open a juke joint, only to encounter a supernatural evil.'
  },
  { 
    title: 'Superman', 
    image: 'src/assets/movie-posters/superman-poster.jpg',
    theatre: 'CineNova Downtown',
    date: '2025-12-05',
    rating: 'PG',
    language: 'English',
    genre: 'Action',
    duration: '2h 9m',
    description:
      'Clark Kent embraces his powers to protect Earth from a powerful new threat.'
  },
  { 
    title: 'Avatar', 
    image: 'src/assets/movie-posters/avatar-poster.jpeg',
    theatre: 'CineNova Market Mall',
    date: '2025-12-01',
    rating: 'PG-13',
    language: 'English',
    genre: 'Sci-Fi',
    duration: '2h 42m',
    description:
      'On the alien world of Pandora, a reluctant hero fights to save a planet he calls home.'
  },
  {
    title: 'Jaws', 
    image: 'src/assets/movie-posters/jaws-poster.jpeg',
    theatre: 'CineNova NE',
    date: '2025-12-04',
    rating: 'PG',
    language: 'English',
    genre: 'Thriller',
    duration: '2h 04m',
    description:
      'A police chief, a marine scientist, and a fisherman hunt a man-eating great white shark.'
  },
  { 
    title: 'Zootopia 2', 
    image: 'src/assets/movie-posters/zootopia2-poster.jpg',
    theatre: 'CineNova NE',
    date: '2025-12-04',
    rating: 'G',
    language: 'English',
    genre: 'Animation',
    duration: '1h 48m',
    description:
      'Judy Hopps and Nick Wilde team up again to solve a strange new mystery in Zootopia.'
  },
  { 
    title: 'Moonlight', 
    image: 'src/assets/movie-posters/moonlight-poster.jpg',
    theatre: 'CineNova Market Mall',
    date: '2025-12-03',
    rating: 'R',
    language: 'English',
    genre: 'Drama',
    duration: '1h 51m',
    description:
      'A young Black man grapples with his identity and sexuality while growing up in Miami.'
  },
  { 
    title: 'Shrek 2', 
    image: 'src/assets/movie-posters/shrek2-poster.jpg',
    theatre: 'CineNova Downtown',
    date: '2025-12-02',
    rating: 'PG',
    language: 'English',
    genre: 'Animation',
    duration: '1h 33m',
    description:
      'Shrek and Fiona visit the kingdom of Far Far Away and meet her very surprised parents.'
  },
]

const ratingOptionsList = ['PG', 'G', 'PG-13', '14A', 'R']
const genreOptionsList = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller']
const languageOptionsList = ['English', 'French']

function toggleItem(value, selected, setSelected) {
  if (selected.includes(value)) {
    setSelected(selected.filter(v => v !== value))
  } else {
    setSelected([...selected, value])
  }
}

function uniqueOptions(list, key) {
  const set = new Set(list.map(item => item[key]))
  return ['All', ...Array.from(set)]
}

export default function HomePage() {
  const navigate = useNavigate()
  const { updateBooking } = useBooking()

  const [theatreFilter, setTheatreFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('All')

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedRatings, setSelectedRatings] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedLanguages, setSelectedLanguages] = useState([])

  const [activeMovie, setActiveMovie] = useState(null)

  const theatreOptions = uniqueOptions(movies, 'theatre')
  const dateOptions = uniqueOptions(movies, 'date')
  
  const filteredMovies = movies.filter(movie => {
    const matchesTheatre =
      theatreFilter === 'All' || movie.theatre === theatreFilter

    const matchesDate =
      dateFilter === 'All' || movie.date === dateFilter

    const matchesRating =
      selectedRatings.length === 0 || selectedRatings.includes(movie.rating)

    const matchesGenre =
      selectedGenres.length === 0 || selectedGenres.includes(movie.genre)

    const matchesLanguage =
      selectedLanguages.length === 0 || selectedLanguages.includes(movie.language)

    return (
      matchesTheatre &&
      matchesDate &&
      matchesRating &&
      matchesGenre &&
      matchesLanguage
    )
  })

  function handleMovieClick(movie) {
    setActiveMovie(movie)
  }

  function handleCloseModal() {
    setActiveMovie(null)
  }

  function handleBookTickets() {
    if (!activeMovie) return

    const datesForThisMovie = movies
    .filter(m=> m.title === activeMovie.title)
    .map(m => m.date)

    updateBooking({ 
      movie: activeMovie, 
      datesForMovie: datesForThisMovie 
    })
    
    navigate('/showtimes')
  }

  return (
    <div className="app">
      <header className="top-bar">
        <img
          src="src/assets/cinenova.png"
          className="logo"
          alt="CineNova"
        />
      </header>

      <div className="content">
        <h1 className="page-title">Movies</h1>

        {/* FILTER BAR */}
        <div className="filters-row">
        <div className="filters-left">
            <select
            className="filter-select"
            value={theatreFilter}
            onChange={e => setTheatreFilter(e.target.value)}
            >
            {theatreOptions.map(option => (
                <option key={option} value={option}>
                {option === 'All' ? 'All theatres' : option}
                </option>
            ))}
            </select>

            <select
            className="filter-select"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            >
            {dateOptions.map(option => (
                <option key={option} value={option}>
                {option === 'All' ? 'Date' : option}
                </option>
            ))}
            </select>
        </div>

        <div className="filters-right">
            <button
            className="filters-toggle-btn"
            type="button"
            onClick={() => setIsFilterOpen(prev => !prev)}
            >
            <img
                src="src/assets/filter.png"
                alt="Filters"
                className="filters-toggle-img"
            />
            </button>
        </div>

        {isFilterOpen && (
            <div className="filters-panel">
            <div className="filters-section">
                <p className="filters-section-title">Rating</p>
                {ratingOptionsList.map(r => (
                <label key={r} className="checkbox-label">
                    <input
                    type="checkbox"
                    checked={selectedRatings.includes(r)}
                    onChange={() =>
                        toggleItem(r, selectedRatings, setSelectedRatings)
                    }
                    />
                    <span>{r}</span>
                </label>
                ))}
            </div>

            <div className="filters-section">
                <p className="filters-section-title">Genre</p>
                {genreOptionsList.map(g => (
                <label key={g} className="checkbox-label">
                    <input
                    type="checkbox"
                    checked={selectedGenres.includes(g)}
                    onChange={() =>
                        toggleItem(g, selectedGenres, setSelectedGenres)
                    }
                    />
                    <span>{g}</span>
                </label>
                ))}
            </div>

            <div className="filters-section">
                <p className="filters-section-title">Language</p>
                {languageOptionsList.map(l => (
                <label key={l} className="checkbox-label">
                    <input
                    type="checkbox"
                    checked={selectedLanguages.includes(l)}
                    onChange={() =>
                        toggleItem(l, selectedLanguages, setSelectedLanguages)
                    }
                    />
                    <span>{l}</span>
                </label>
                ))}
            </div>

            <div className="filters-panel-footer">
                <button
                type="button"
                className="filters-clear"
                onClick={() => {
                    setSelectedRatings([])
                    setSelectedGenres([])
                    setSelectedLanguages([])
                }}
                >
                Clear Filters
                </button>

                <button
                type="button"
                className="filters-apply"
                onClick={() => setIsFilterOpen(false)}
                >
                Close
                </button>
            </div>
            </div>
        )}
        </div>


        {/* MOVIES GRID */}
        <div className="movie-grid">
          {filteredMovies.map(movie => (
            <div
              key={movie.title}
              className="movie-card"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="poster-wrapper">
                <img
                  src={movie.image}
                  className="poster"
                  alt={movie.title}
                />
              </div>
              <p className="movie-title">{movie.title} →</p>
            </div>
          ))}
        </div>
      </div>

      {activeMovie && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div
            className="modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-poster-wrapper">
              <img
                src={activeMovie.image}
                alt={activeMovie.title}
                className="modal-poster"
              />
            </div>

            <div className="modal-info">
              <button
                className="modal-close"
                onClick={handleCloseModal}
              >
                ×
              </button>

              <h2 className="modal-title">{activeMovie.title}</h2>
              <p className="modal-meta">
                {activeMovie.genre} · {activeMovie.rating} ·{' '}
                {activeMovie.duration}
              </p>
              <p className="modal-meta">
                {activeMovie.theatre} · {activeMovie.date}
              </p>

              <p className="modal-description">
                {activeMovie.description}
              </p>

              <button
                className="primary-button"
                onClick={handleBookTickets}
              >
                Book tickets
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
