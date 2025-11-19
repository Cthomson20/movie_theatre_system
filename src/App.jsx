import './App.css'
import ShowtimesPage from './showtimespage'

function App() {
  const movies = [
    { title: 'Barbie', image: 'src/assets/movie-posters/barbie-poster.jpg'},
    { title: 'Sinners', image: 'src/assets/movie-posters/sinners-poster.jpeg'},
    { title: 'Superman', image: 'src/assets/movie-posters/superman-poster.jpg'},
    { title: 'Avatar', image: 'src/assets/movie-posters/avatar-poster.jpeg'},
    { title: 'Jaws', image: 'src/assets/movie-posters/jaws-poster.jpeg'},
    { title: 'Zootopia 2', image: 'src/assets/movie-posters/zootopia2-poster.jpg'},
    { title: 'Moonlight', image: 'src/assets/movie-posters/moonlight-poster.jpg'},
    { title: 'Shrek 2', image: 'src/assets/movie-posters/shrek2-poster.jpg'},

  ]

  return (
    <div className='app'>
      <header className='top-bar'>
        <img src='src/assets/cinenova.png' className='logo'/>
      </header>

      <div className='content'>
        <h1 className='page-title'>Movies</h1>

        <div className='filters'>
          <select className='filter-select'><option>Theatre</option></select>
          <select className='filter-select'><option>Date</option></select>
        </div>
        
      </div>

      <div className='movie-grid'>
        {movies.map((movie) => (
          <div key={movie.title} className='movie-card'>
            <div className='poster-wrapper'>
              <img src={movie.image} className='poster'/>
            </div>
            <p className='movie-title'>{movie.title} →</p>
          </div>
        ))}
      </div>
      <ShowtimesPage />
    </div>
  )
}

export default App
