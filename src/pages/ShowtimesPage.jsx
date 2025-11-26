
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/ShowtimesPage.css";
import { useState } from "react";

function ShowtimesPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  }

  const movieFromHome = location.state?.movie || null;
  // Initialise theatre/date based on that movie (or empty if none)
  const [selectedTheatre, setSelectedTheatre] = useState(
    movieFromHome?.theatre || ""
  );
  const [selectedDate, setSelectedDate] = useState(
    movieFromHome?.date || ""
  );

  const hasSelection = selectedTheatre !== "" && selectedDate !== "";

  return (
    <div className="showtimes-page">
        {/* Top bar */}
    <header className="showtimes-header">
        <button className="back-button" onClick={handleBack}>
        ← Back
        </button>
        
        <h1 className="showtimes-title">Showtimes</h1>
       
        
        <div className ="header-icons">
            <img src="src/assets/three_lines.png" className="header-icon" alt="Menu" />
            <img src="src/assets/magnifying_glass.png" className="header-icon" alt="Search" />

        </div>
    </header>
              {/* Location + date filters */}
      <div className="filters-row">
        <select 
          className="filter-select"
          value={selectedTheatre}
          onChange={(e) => setSelectedTheatre(e.target.value)}
        >
          <option value = "">THEATRE</option>
          <option value = "CineNova Market Mall">CineNova Market Mall</option>
          <option value = "CineNova Downtown">CineNova Downtown</option>
          <option value = "CineNova NE">CineNova NE </option>
        </select>

        <select 
          className="filter-select"
          value = {selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        >
          <option value = ""> DATE</option>
          <option value = "2025-11-27"> 2025-11-27</option>
          <option value = "2025-12-01"> 2025-12-01</option>
          <option value = "2025-12-02"> 2025-12-02</option>

          {movieFromHome && (<option value={movieFromHome.date}>{movieFromHome.date}</option>)}
        </select>
      </div>

  {!hasSelection ? (
    <div className= "empty state">
      <p className="empty-message">
        Please Select a theatre and date to see showtimes.
      </p>
    </div>
  ) : (
    <>
    
            {/* REGULAR row */}
      <section className="showtime-section">
        <div className="format-and-times">

          <div className="format-row">
            <span className="format-name">REGULAR</span>
            <span className="format-badge">CC</span>
          </div>

          <div className="times-row">
            <button className="time-button">
              <span className="time-label">10:00</span>
              <img src="src/assets/seat_icon.png" className="time-seat-icon" />

            </button>

            <button className="time-button">
              <span className="time-label">12:30</span>
              <img src="src/assets/seat_icon.png" className="time-seat-icon" />
            </button>

            <button className="time-button">
              <span className="time-label">17:15</span>
              <img src="src/assets/seat_icon.png" className="time-seat-icon" />
            </button>
          </div>

        </div>
      </section>

    


    <section className="showtime-section">
        <div className="format-and-times">

          <div className="format-row">
            <span className="format-name">VIP</span>
            <span className="format-badge">CC</span>
          </div>

          <div className="times-row">
            <button className="time-button">
              <span className="time-label">18:20</span>
              <img src="src/assets/seat_icon.png" className="time-seat-icon" />

            </button>

            <button className="time-button">
              <span className="time-label">21:00</span>
              <img src="src/assets/seat_icon.png" className="time-seat-icon" />
            </button>

          </div>
        </div>
      </section>





      <section className="showtime-section">
        <div className="format-and-times">

          <div className="format-row">
            <span className="format-name">ULTRA AVX <br />DOLBY ATMOS</span>
            <span className="format-badge">CC</span>
          </div>

          <div className="times-row">
            <button className="time-button">
              <span className="time-label">14:10</span>
              <img src="src/assets/seat_icon.png" className="time-seat-icon" />

            </button>

            <button className="time-button">
              <span className="time-label">20:30</span>
              <img src="src/assets/seat_icon.png" className="time-seat-icon" />
            </button>
          </div>

        </div>
      </section>

    </>
  )}  


    </div>
   
  );
}

export default ShowtimesPage;
