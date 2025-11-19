
import "./ShowtimesPage.css";

function ShowtimesPage() {
  return (
    <div className="showtimes-page">
        {/* Top bar */}
    <header className="showtimes-header">
        <button className="back-button">← Back</button>

        <h1 className="showtimes-title">Showtimes</h1>

        <div className ="header-icons">
            <img src="src/assets/three_lines.png" className="header-icon" alt="Menu" />
            <img src="src/assets/magnifying_glass.png" className="header-icon" alt="Search" />
        </div>
        </header>
              {/* Location + date filters */}
      <div className="filters-row">
        <select className="filter-select">
          <option>CineNova Market Mall</option>
        </select>

        <select className="filter-select">
          <option>Today</option>
        </select>
      </div>

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

      


    </div>
  );
}

export default ShowtimesPage;
