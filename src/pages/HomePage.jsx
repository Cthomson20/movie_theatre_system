import '../styles/homePage.css'
import '../styles/payment.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import '../App.css'
import { AlignCenter } from 'lucide-react'

function generateNextDays(numDays) {
  const result = []
  const today = new Date()

  for (let i = 0; i < numDays; i++) {
    const d = new Date()
    d.setDate(today.getDate() + i)

    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')

    result.push(`${year}-${month}-${day}`)
  }

  return result
}

function formatNiceDate(dateString) {
  if (!dateString) return 'Choose date'

  const [yStr, mStr, dStr] = dateString.split('-')
  const year = Number(yStr)
  const monthIndex = Number(mStr) - 1  
  const dayNum = Number(dStr)

  const d = new Date(year, monthIndex, dayNum)
  if (Number.isNaN(d.getTime())) {
    return dateString
  }

  const today = new Date()
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth()
  const todayDay = today.getDate()

  const isToday =
    year === todayYear &&
    monthIndex === todayMonth &&
    dayNum === todayDay

  const dayName = d.toLocaleDateString('en-US', { weekday: 'long' })
  const monthName = d.toLocaleDateString('en-US', { month: 'short' })

  if (isToday) {
    return `Today, ${monthName} ${dayNum}`
  }

  return `${dayName}, ${monthName} ${dayNum}`
}


function getTodayString() {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}


const movies = [
  { 
    title: 'Barbie',
    image: `${import.meta.env.BASE_URL}movie-posters/barbie-poster.jpg`,
    showtimes: [
      {
        theatre: "CineNova Market Mall",
        dates: generateNextDays(20)   
      },
      {
        theatre: "CineNova Downtown",
        dates: generateNextDays(20)   
      }
    ],
    rating: 'PG-13',
    language: 'English',
    genre: 'Comedy',
    duration: '1h 45m',
    description:
      'Barbie and Ken leave Barbie Land and discover the joys and challenges of living in the real world.'
  },
  { 
    title: 'Sinners', 
    image: `${import.meta.env.BASE_URL}movie-posters/sinners-poster.jpeg`,
    showtimes: [
      {
        theatre: "CineNova Downtown",
        dates: generateNextDays(30)   
      }
    ],
    rating: 'R',
    language: 'English',
    genre: 'Horror',
    duration: '2h 17m',
    description:
      'A period horror film about twin brothers who return to their hometown in the Jim Crow-era Mississippi Delta to open a juke joint, only to encounter a supernatural evil.'
  },
  { 
    title: 'Superman', 
    image: `${import.meta.env.BASE_URL}movie-posters/superman-poster.jpg`,
    showtimes: [
      {
        theatre: "CineNova Market Mall",
        dates: generateNextDays(10)   
      },
      {
        theatre: "CineNova Downtown",
        dates: generateNextDays(10)   
      }
    ],
    rating: 'PG',
    language: 'English',
    genre: 'Action',
    duration: '2h 9m',
    description:
      'Clark Kent embraces his powers to protect Earth from a powerful new threat.'
  },
  { 
    title: 'Avatar', 
    image: `${import.meta.env.BASE_URL}movie-posters/avatar-poster.jpeg`,
    showtimes: [
      {
        theatre: "CineNova Market Mall",
        dates: generateNextDays(10)   
      },
      {
        theatre: "CineNova Downtown",
        dates: generateNextDays(10)   
      },
      {
        theatre: "CineNova NE",
        dates: generateNextDays(10)   
      },
      {
        theatre: "CineNova Macleod Trail",
        dates: generateNextDays(10)   
      }
    ],
    rating: 'PG-13',
    language: 'English',
    genre: 'Sci-Fi',
    duration: '2h 42m',
    description:
      'On the alien world of Pandora, a reluctant hero fights to save a planet he calls home.'
  },
  {
    title: 'Jaws', 
    image: `${import.meta.env.BASE_URL}movie-posters/jaws-poster.jpeg`,
    showtimes: [
      {
        theatre: "CineNova Market Mall",
        dates: generateNextDays(5)   
      },
      {
        theatre: "CineNova Macleod Trail",
        dates: generateNextDays(5)   
      }
    ],
    rating: 'PG',
    language: 'English',
    genre: 'Thriller',
    duration: '2h 04m',
    description:
      'A police chief, a marine scientist, and a fisherman hunt a man-eating great white shark.'
  },
  { 
    title: 'Zootopia 2', 
    image: `${import.meta.env.BASE_URL}movie-posters/zootopia2-poster.jpg`,
    showtimes: [
      {
        theatre: "CineNova Market Mall",
        dates: generateNextDays(30)   
      },
      {
        theatre: "CineNova Downtown",
        dates: generateNextDays(30)   
      }
    ],
    rating: 'G',
    language: 'English',
    genre: 'Animation',
    duration: '1h 48m',
    description:
      'Judy Hopps and Nick Wilde team up again to solve a strange new mystery in Zootopia.'
  },
  { 
    title: 'Moonlight', 
    image: `${import.meta.env.BASE_URL}movie-posters/moonlight-poster.jpg`,
    showtimes: [
      {
        theatre: "CineNova NE",
        dates: generateNextDays(30)   
      },
      {
        theatre: "CineNova Downtown",
        dates: generateNextDays(30)   
      }
    ],
    rating: 'R',
    language: 'English',
    genre: 'Drama',
    duration: '1h 51m',
    description:
      'A young Black man grapples with his identity and sexuality while growing up in Miami.'
  },
  { 
    title: 'Shrek 2', 
    image: `${import.meta.env.BASE_URL}movie-posters/shrek2-poster.jpg`,
    showtimes: [
      {
        theatre: "CineNova Macleod Trail",
        dates: generateNextDays(20)   
      },
      {
        theatre: "CineNova NE",
        dates: generateNextDays(20)   
      }
    ],
    rating: 'PG',
    language: 'English',
    genre: 'Animation',
    duration: '1h 33m',
    description:
      'Shrek and Fiona visit the kingdom of Far Far Away and meet her very surprised parents.'
  },
  {
    title: 'Bugonia',
    image: `${import.meta.env.BASE_URL}movie-posters/bugonia-poster.jpg`,
    showtimes: [
      {
        theatre: 'CineNova Market Mall',
        dates: generateNextDays(30)
      },
      {
        theatre: 'CineNova Downtown',
        dates: generateNextDays(30)
      },
      {
        theatre: "CineNova Macleod Trail",
        dates: generateNextDays(30)   
      },
      {
        theatre: "CineNova NE",
        dates: generateNextDays(30)   
      }
    ],
    rating: 'R',
    language: 'English',
    genre: 'Comedy',
    duration: '1h 58m',
    description:
      "Two conspiracy-obsessed men kidnap the CEO of a major company when they become convinced that she's an alien who wants to destroy Earth."
  },
  {
    title: 'One Battle After Another',
    image: `${import.meta.env.BASE_URL}movie-posters/oneb-poster.jpg`,
    showtimes: [
      {
        theatre: 'CineNova NE',
        dates: generateNextDays(30)
      },
      {
        theatre: 'CineNova Macleod Trail',
        dates: generateNextDays(30)
      },
      {
        theatre: 'CineNova Downtown',
        dates: generateNextDays(30)
      }
    ],
    rating: 'R',
    language: 'English',
    genre: 'Action',
    duration: '2h 42m',
    description:
      'When their evil enemy resurfaces after 16 years, a group of ex-revolutionaries reunite to rescue the daughter of one of their own.'
  },
  {
    title: 'F1',
    image: `${import.meta.env.BASE_URL}movie-posters/f1-poster.jpg`,
    showtimes: [
      {
        theatre: 'CineNova Market Mall',
        dates: generateNextDays(25)
      },
      {
        theatre: 'CineNova Downtown',
        dates: generateNextDays(25)
      },
      {
        theatre: 'CineNova NE',
        dates: generateNextDays(25)
      }
    ],
    rating: 'PG-13',
    language: 'English',
    genre: 'Drama',
    duration: '2h 35m',
    description:
      "A Formula One driver comes out of retirement to mentor and team up with a younger driver."
  },
  {
    title: 'Interstellar',
    image: `${import.meta.env.BASE_URL}movie-posters/interstellar-poster.jpg`,
    showtimes: [
      {
        theatre: 'CineNova Market Mall',
        dates: generateNextDays(30)
      },
      {
        theatre: 'CineNova Downtown',
        dates: generateNextDays(30)
      },
      {
        theatre: 'CineNova NE',
        dates: generateNextDays(30)
      },
      {
        theatre: 'CineNova Macleod Trail',
        dates: generateNextDays(30)
      }
    ],
    rating: 'PG-13',
    language: 'English',
    genre: 'Sci-Fi',
    duration: '2h 49m',
    description:
      "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans."
  },
  {
    title: 'Lady Bird',
    image: `${import.meta.env.BASE_URL}movie-posters/ladybird-poster.jpg`,
    showtimes: [
      {
        theatre: 'CineNova Market Mall',
        dates: generateNextDays(20)
      },
      {
        theatre: 'CineNova Downtown',
        dates: generateNextDays(20)
      },
      {
        theatre: 'CineNova NE',
        dates: generateNextDays(20)
      },
      {
        theatre: 'CineNova Macleod Trail',
        dates: generateNextDays(20)
      }
    ],
    rating: 'R',
    language: 'English',
    genre: 'Drama',
    duration: '1h 35m',
    description:
      "A fiercely independent teenager tries to make her own way in the world while wanting to get out of her hometown of Sacramento, California."
  }
]

const ratingOptionsList = ['PG', 'G', 'PG-13', '14A', 'R']
const genreOptionsList = ['Action', 'Comedy', 'Drama', 'Horror', 'Thriller', 'Sci-Fi']
const languageOptionsList = ['English', 'French']

function toggleItem(value, selected, setSelected) {
  if (selected.includes(value)) {
    setSelected(selected.filter(v => v !== value))
  } else {
    setSelected([...selected, value])
  }
}

// function uniqueOptions(list, key) {
//   const set = new Set(list.map(item => item[key]))
//   return ['All', ...Array.from(set)]
// }

function Calendar({ onSelect, validDates = new Set(), selectedDate }) {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0)
  const today = new Date()

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate()
  }

  function format(d) {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const parsedDates = Array.from(validDates)
    .map(str => new Date(str))
    .filter(d => !Number.isNaN(d.getTime()))

  const datesForMonths = parsedDates.filter(d => d >= todayStart)
  const baseDates = datesForMonths.length > 0 ? datesForMonths : parsedDates

  const monthKeys = Array.from(
    new Set(
      baseDates.map(d => `${d.getFullYear()}-${d.getMonth()}`)
    )
  ).sort()

  const monthsToShow = monthKeys.map(key => {
    const [yStr, mStr] = key.split('-')
    return { year: Number(yStr), month: Number(mStr) }
  })

  const { year, month } = monthsToShow[currentMonthIndex] || monthsToShow[0]
  const monthDate = new Date(year, month, 1)
  const monthName = monthDate.toLocaleString('default', { month: 'long' })
  const days = getDaysInMonth(year, month)
  const firstDayOfWeek = monthDate.getDay() // 0 = Sunday, 1 = Monday, etc.

  return (
    <div className="calendar-container">
      <div className="calendar-month">
        <div className="cal-header">
          <button
            className="cal-nav-btn"
            onClick={() => setCurrentMonthIndex(Math.max(0, currentMonthIndex - 1))}
            disabled={currentMonthIndex === 0}
          >
            ‹
          </button>
          <h3 className="cal-month-title">
            {monthName} {year}
          </h3>
          <button
            className="cal-nav-btn"
            onClick={() => setCurrentMonthIndex(Math.min(monthsToShow.length - 1, currentMonthIndex + 1))}
            disabled={currentMonthIndex === monthsToShow.length - 1}
          >
            ›
          </button>
        </div>

        <div className="cal-grid">
          {/* Empty cells for days before the 1st */}
          {[...Array(firstDayOfWeek)].map((_, i) => (
            <div key={`empty-${i}`} className="cal-day-empty"></div>
          ))}
          
          {/* Actual days of the month */}
          {[...Array(days)].map((_, i) => {
            const dateObj = new Date(year, month, i + 1)
            const formatted = format(dateObj)
            const isActive = validDates.has(formatted)
            const isSelected = selectedDate === formatted

            return (
              <button
                key={i}
                className={`cal-day ${!isActive ? 'cal-day-disabled' : ''} ${isSelected ? 'cal-day-selected' : ''}`}
                onClick={isActive ? () => onSelect(formatted) : undefined}
                disabled={!isActive}
              >
                {i + 1}
              </button>
              
            )
          })}
        </div>
      </div>
    </div>
  )
}


export default function HomePage() {
  const navigate = useNavigate()
  const { updateBooking } = useBooking()

  const [theatreFilter, setTheatreFilter] = useState('All')
  const todayString = getTodayString()
  const [dateFilter, setDateFilter] = useState(todayString)


  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedRatings, setSelectedRatings] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedLanguages, setSelectedLanguages] = useState([])

  const [activeMovie, setActiveMovie] = useState(null)

  const [calendarOpen, setCalendarOpen] = useState(false)
  const [theatreMenuOpen, setTheatreMenuOpen] = useState(false)

  const validDates = new Set(
    movies.flatMap(movie =>
      movie.showtimes.flatMap(st => st.dates)
    )
  )

  const theatreOptions = [
    'All',
    ...Array.from(
      new Set(
        movies.flatMap(movie =>
          movie.showtimes.map(st => st.theatre)
        )
      )
    )
  ]

  const filteredMovies = movies.filter(movie => {
  const matchesTheatre =
    theatreFilter === 'All' ||
    movie.showtimes.some(st => st.theatre === theatreFilter)

  const matchesDate =
    dateFilter === 'All' ||
    movie.showtimes.some(st => st.dates.includes(dateFilter))

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

    let selectedTheatre = ''
    let selectedDate = ''

    if (activeMovie) {
      const preferredTheatre =
        theatreFilter !== 'All' ? theatreFilter : null

      // start with the first showtime
      let showtime = activeMovie.showtimes[0]

      // if a theatre is selected and this movie plays there, use that
      if (preferredTheatre) {
        const matchByTheatre = activeMovie.showtimes.find(
          st => st.theatre === preferredTheatre
        )
        if (matchByTheatre) {
          showtime = matchByTheatre
        }
      }

      // pick a date for that showtime
      let date = showtime.dates[0]
      if (
        dateFilter &&
        dateFilter !== 'All' &&
        showtime.dates.includes(dateFilter)
      ) {
        date = dateFilter
      }

      selectedTheatre = showtime.theatre
      selectedDate = date
    }

  function handleMovieClick(movie) {
    setActiveMovie(movie)
  }

  function handleCloseModal() {
    setActiveMovie(null)
  }

  function handleBookTickets() {
    if (!activeMovie) return

    const datesForThisMovie = Array.from(
      new Set(
        activeMovie.showtimes.flatMap(st => st.dates)
      )
    )

    updateBooking({
      movie: activeMovie,
      theatre: selectedTheatre,
      date: selectedDate,
      datesForMovie: datesForThisMovie
    })

    navigate('/showtimes')
  }


  return (
    <div className="app">
      <header className="payment-header">
        <div className="header-content">
          <img 
            src={`${import.meta.env.BASE_URL}cinenova.png`} 
            className="cinenova-logo" 
            alt="CineNova" 
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
          <div className="header-icons">
            <img src={`${import.meta.env.BASE_URL}three_lines.png`} className="header-icon" alt="Menu" />
          </div>
        </div>
      </header>
      <div className='homepage-main'>
        <div className="content">
          {(isFilterOpen || calendarOpen || theatreMenuOpen) && (
            <div
              className="click-overlay"
              onClick={() => {
                setIsFilterOpen(false)
                setCalendarOpen(false)
                setTheatreMenuOpen(false)
              }}
            />
          )}
          <h1 className="page-title" style={{ textAlign: 'center' }}>Movies</h1>

          {/* Filter bar */}
          <div className="filters-row">
          <div className="filters-left">
            <div className="theatre-wrapper">
              <button
                type="button"
                className="filter-select date-button theatre-button"
                onClick={() => setTheatreMenuOpen(prev => !prev)}
              >
                <span>
                  {theatreFilter === 'All' ? 'All theatres' : theatreFilter}
                </span>
                <svg
                  className="date-arrow"
                  width="12"
                  height="12"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7L10 12L15 7"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {theatreMenuOpen && (
                <div className="theatre-dropdown">
                  {theatreOptions.map(option => (
                    <button
                      key={option}
                      type="button"
                      className={
                        'theatre-option' +
                        (theatreFilter === option ? ' theatre-option-active' : '')
                      }
                      onClick={() => {
                        setTheatreFilter(option)
                        setTheatreMenuOpen(false)
                      }}
                    >
                      {option === 'All' ? 'All theatres' : option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="date-wrapper">
              <button
                type="button"
                className="filter-select date-button"
                onClick={() => setCalendarOpen(prev => !prev)}
              >
                <span>{formatNiceDate(dateFilter)}</span>
                <svg
                  className="date-arrow"
                  width="12"
                  height="12"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7L10 12L15 7"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

              </button>

              {calendarOpen && (
                <div className="calendar-dropdown">
                  <Calendar 
                  validDates={validDates}
                  selectedDate={dateFilter} 
                  onSelect={(date) => { setDateFilter(date); setCalendarOpen(false) }} />
                </div>
              )}
            </div>
          </div>


          <div className="filters-right">
            <div className='filters-wrapper'>
              <button
              className="filters-toggle-btn"
              type="button"
              onClick={() => setIsFilterOpen(prev => !prev)}
              >
              <img
                  src={`${import.meta.env.BASE_URL}filter.png`}
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
          </div>


          {/* Movies grid */}
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
                <p className="movie-title">{movie.title}</p>
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
                  {selectedTheatre} · {selectedDate}
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
    </div>
  )
}
