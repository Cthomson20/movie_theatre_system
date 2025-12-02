import { useLocation, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import "../styles/ShowtimesPage.css";
import { useState } from "react";
import SeatPreviewPage from "../pages/SeatPreviewPage";

const baseShowtimesByMovie = {
  Barbie: {
    GENERAL: ["16:00", "19:30", "21:45"],
    VIP: ["18:20", "21:00"],
    "ULTRA AVX DOLBY ATMOS": ["17:10", "20:30"],
  },

  Sinners: {
    GENERAL: ["16:00", "19:30", "21:45"],
    VIP: ["18:20", "21:00"],
    "ULTRA AVX DOLBY ATMOS": ["17:10", "20:30"],
  },

  Superman: {
    GENERAL: ["11:00", "12:30", "16:45", "19:45"],
    VIP: ["14:00", "18:20", "21:00"],
    "ULTRA AVX DOLBY ATMOS": ["17:10", "20:30"],
  },

  Avatar: {
    GENERAL: ["13:00", "16:30", "21:00"],
    VIP: ["20:00"],
  },

  Jaws: {
    GENERAL: ["18:00", "21:45"],
    VIP: ["16:20", "21:00"],
    "ULTRA AVX DOLBY ATMOS": ["20:30"],
  },

  "Zootopia 2": {
    GENERAL: ["11:00", "13:30", "16:45"],
    VIP: ["18:20", "21:00"],
    "ULTRA AVX DOLBY ATMOS": [],
  },

  Moonlight: {
    GENERAL: ["12:30", "16:30", "20:45"],
    VIP: ["18:20", "21:00"],
    "ULTRA AVX DOLBY ATMOS": ["17:10"],
  },

  "Shrek 2": {
    GENERAL: ["12:00", "14:30", "16:00", "18:15"],
    VIP: ["13:30", "15:20"],
    "ULTRA AVX DOLBY ATMOS": ["17:30"],
  },
};

function ShowtimesPage() {
  const navigate = useNavigate();
  const { bookingData, updateBooking } = useBooking();

  const handleBack = () => {
    navigate('/');
  };

  const movieFromHome = bookingData.movie;
  const datesForMovie = bookingData.datesForMovie || [];

  // Initialise theatre/date based on that movie (or empty if none)
  const [selectedTheatre, setSelectedTheatre] = useState(
    movieFromHome?.theatre || bookingData.theatre || ""
  );
  const [selectedDate, setSelectedDate] = useState(
    movieFromHome?.date || bookingData.date || ""
  );

  const [isSeatPreviewOpen, setIsSeatPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const hasSelection = selectedTheatre !== "" && selectedDate !== "";

  const movieTitle = movieFromHome?.title || null;
  const baseShowtimes = movieTitle
    ? baseShowtimesByMovie[movieTitle] || null
    : null;

  // Get all showtimes for this movie (could be undefined)
  const showtimesForMovie = movieTitle
    ? baseShowtimesByMovie[movieTitle]
    : null;

  const isPlayingOnSelectedDate =
    selectedDate !== "" && datesForMovie.includes(selectedDate);

  // For the currently selected date
  const showtimesForSelectedDate =
    hasSelection && isPlayingOnSelectedDate && baseShowtimes
      ? baseShowtimes
      : null;

  const handleShowtimeClick = (format, time) => {
    if (!movieFromHome) return;

    updateBooking({
      theatre: selectedTheatre,
      date: selectedDate,
      format,
      time
    });

    navigate("/ticket-selection");
  };

  const handleSeatIconClick = (format, time) => {
    if (!movieFromHome) return;

    setPreviewData({
      movie: movieFromHome,
      theatre: selectedTheatre,
      date: selectedDate,
      format,
      time,
    });
    setIsSeatPreviewOpen(true);
  };

  const handleBookFromPreview = () => {
    if (!previewData) return;

    updateBooking({
      theatre: previewData.theatre,
      date: previewData.date,
      format: previewData.format,
      time: previewData.time
    });

    navigate('/ticket-selection');

    setIsSeatPreviewOpen(false);
};

  return (
    <div className="showtimes-page">
      {/* Top bar */}
      <header className="showtimes-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>

        <h1 className="showtimes-title">Showtimes</h1>

        <div className="header-icons">
          <img
            src="src/assets/three_lines.png"
            className="header-icon"
            alt="Menu"
          />
          <img
            src="src/assets/magnifying_glass.png"
            className="header-icon"
            alt="Search"
          />
        </div>
      </header>

      {/* Location + date filters */}
      <div className="filters-row">
        <select
          className="filter-select"
          value={selectedTheatre}
          onChange={(e) => setSelectedTheatre(e.target.value)}
        >
          <option value="">THEATRE</option>
          <option value="CineNova Market Mall">CineNova Market Mall</option>
          <option value="CineNova Downtown">CineNova Downtown</option>
          <option value="CineNova NE">CineNova NE</option>
        </select>

        <select
          className="filter-select"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">DATE</option>
          <option value="2025-11-27">2025-11-27</option>
          <option value="2025-12-01">2025-12-01</option>
          <option value="2025-12-02">2025-12-02</option>
          <option value="2025-12-03">2025-12-03</option>
          <option value="2025-12-04">2025-12-04</option>
          <option value="2025-12-05">2025-12-05</option>
        </select>
      </div>

      {!hasSelection ? (
        <div className="empty-state">
          <p className="empty-message">
            Please Select a theatre and date to see showtimes.
          </p>
        </div>
      ) : (
        <>
          {showtimesForSelectedDate ? (
            Object.entries(showtimesForSelectedDate).map(
              ([formatName, times]) => (
                <section className="showtime-section" key={formatName}>
                  <div className="format-and-times">
                    <div className="format-row">
                      <span className="format-name">
                        {formatName.includes("DOLBY ATMOS") ? (
                          <>
                            ULTRA AVX <br />
                            DOLBY ATMOS
                          </>
                        ) : (
                          formatName
                        )}
                      </span>
                      <span className="format-badge">CC</span>
                    </div>

                    <div className="times-row">
                      {times.map((time) => (
                        <div className="time-seat-pair" key={time}>
                          {/* time button */}
                          <button
                            className="time-button"
                            onClick={() =>
                              handleShowtimeClick(formatName, time)
                            }
                          >
                            <span className="time-label">{time}</span>
                          </button>

                          {/* seat button */}
                          <button
                            className="seat-button"
                            onClick={() =>
                              handleSeatIconClick(formatName, time)
                            }
                          >
                            <img
                              src="src/assets/seat_icon.png"
                              className="time-seat-icon"
                              alt="Seat"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )
            )
          ) : (
            <div className="empty-state">
              <p className="empty-message">
                No showtimes available for this date.
              </p>
            </div>
          )}
        </>
      )}

      {/* Seat preview modal */}
      {isSeatPreviewOpen && previewData && (
        <div
          className="seat-preview-overlay"
          onClick={() => setIsSeatPreviewOpen(false)}
        >
          <div
            className="seat-preview-content"
            onClick={(e) => e.stopPropagation()}
          >
            <SeatPreviewPage
              movie={previewData.movie}
              theatre={previewData.theatre}
              date={previewData.date}
              format={previewData.format}
              time={previewData.time}
              onClose={() => setIsSeatPreviewOpen(false)}
              onBookTickets={handleBookFromPreview}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowtimesPage;
