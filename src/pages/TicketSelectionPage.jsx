import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import SeatSelectionPage from './SeatSelectionPage';
import '../styles/TicketSelectionPage.css';
import { formatNiceDate } from '../utils/dateUtils';

// Theatre Data
const theatres = [
  {
    name: 'CineNova Market Mall',
    address: '3625 Shaganappi Trail NW',
    city: 'Calgary, AB'
  },
  {
    name: 'CineNova Downtown',
    address: '500 Centre Street SE',
    city: 'Calgary, AB'
  },
  {
    name: 'CineNova NE',
    address: '4920 130 Avenue NE',
    city: 'Calgary, AB'
  },
  {
    name: 'CineNova Macleod Trail',
    address: '1011 Macleod Trail South SW',
    city: 'Calgary, AB'
  }
];

function getTheatreInfo(theatreName) {
  return theatres.find(theatre => theatre.name === theatreName);
}

export default function TicketSelectionPage() {
  const navigate = useNavigate();
  const { bookingData, updateBooking } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false)
  
  const [generalTickets, setGeneralTickets] = useState(bookingData.tickets.general);
  const [childTickets, setChildTickets] = useState(bookingData.tickets.child);
  const [seniorTickets, setSeniorTickets] = useState(bookingData.tickets.senior);
  const [selectedSeats, setSelectedSeats] = useState(bookingData.seats);
  const [showSeatSelection, setShowSeatSelection] = useState(false);

  const PRICES = { general: 20, child: 15, senior: 10 };

  // Get theatre information
  const theatreInfo = getTheatreInfo(bookingData.theatre);

  // Sync state to context whenever tickets or seats change
  useEffect(() => {
    const total = calculateTotal();
    updateBooking({
      tickets: { general: generalTickets, child: childTickets, senior: seniorTickets },
      seats: selectedSeats,
      total
    });
  }, [generalTickets, childTickets, seniorTickets, selectedSeats]);

  const calculateTotal = () =>
    generalTickets * PRICES.general +
    childTickets * PRICES.child +
    seniorTickets * PRICES.senior;

  const getTotalTickets = () => generalTickets + childTickets + seniorTickets;

  const handleIncrement = (type) => {
    if (type === 'general') setGeneralTickets((p) => p + 1);
    if (type === 'child') setChildTickets((p) => p + 1);
    if (type === 'senior') setSeniorTickets((p) => p + 1);
  };

  const handleDecrement = (type) => {
    const totalTickets = getTotalTickets();
    const newTotal = totalTickets - 1;
    
    if (newTotal < selectedSeats.length) {
      setSelectedSeats([]);
    }
    
    if (type === 'general') setGeneralTickets((p) => Math.max(0, p - 1));
    if (type === 'child') setChildTickets((p) => Math.max(0, p - 1));
    if (type === 'senior') setSeniorTickets((p) => Math.max(0, p - 1));
  };

  const handleSeatsSelected = (seats) => setSelectedSeats(seats);
  
  const handleBack = () => navigate('/showtimes');
  
  const handleContinue = () => {
    navigate('/payment');
  };

  return (
    <div className="ticket-page">
       <header className="payment-header">
      <div className="header-content">
        <img
          src={`${import.meta.env.BASE_URL}cinenova.png`}
          className="cinenova-logo"
          alt="CineNova"
        />

        <div className="header-icons">
          <div className="menu-wrapper">
            <button
              type="button"
              className="menu-button"
              onClick={() => setMenuOpen(prev => !prev)}
            >
              <img
                src={`${import.meta.env.BASE_URL}three_lines.png`}
                className="header-icon"
                alt="Menu"
              />
            </button>

            {menuOpen && (
              <div className="menu-dropdown">
                <button
                  type="button"
                  className="menu-item"
                  onClick={() => {
                    setMenuOpen(false)
                    navigate('/')    // Example: Home
                  }}
                >
                  Homepage
                </button>
                <button
                  type="button"
                  className="menu-item"
                  onClick={() => {
                    setMenuOpen(false)
                    navigate('/locations')
                  }}
                >
                  Locations
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>

      <main className="ticket-main-content">
        <button onClick={handleBack} className="ticket-back-button">
          <span>← Back</span>
        </button>
        <div className="ticket-container">

          {/* Left Column */}
          <div className="ticket-left-column">
            <h2 className="ticket-movie-title">{bookingData.movie?.title || 'Barbie'}</h2>
            <div className="ticket-poster-container">
              <img src={bookingData.movie?.image} alt="Movie Poster" className="ticket-movie-poster" />
            </div>
            <div className="ticket-showtime-details">
              <p style={{ fontWeight: 500 }}>{formatNiceDate(bookingData.date) || ''}</p>
              <p>{bookingData.time || '10:00 AM'}</p>
              <p style={{ fontWeight: 500 }}>{bookingData.theatre || 'CineNova MarketMall'}</p>
              <p>{theatreInfo?.address || '3625 Shaganappi Trail NW'}</p>
              <p>{theatreInfo?.city || 'Calgary, AB'}</p>
            </div>
          </div>

          {/* Middle Column */}
          <div className="ticket-middle-column">
            <div className="ticket-format-badge">
              <span className="ticket-format-text">{bookingData.format}</span>
              <span className="ticket-cc-badge">CC</span>
            </div>

            <div className="ticket-counters">
              <div className="ticket-row">
                <span className="ticket-label">General (14 - 64) <span className="ticket-price">$20</span></span>
                <div className="ticket-counter-controls">
                  <button onClick={() => handleDecrement('general')} className="ticket-counter-button">-</button>
                  <span className="ticket-counter-value">{generalTickets}</span>
                  <button onClick={() => handleIncrement('general')} className="ticket-counter-button">+</button>
                </div>
              </div>

              <div className="ticket-row">
                <span className="ticket-label">Child (3 - 13) <span className="ticket-price">$15</span></span>
                <div className="ticket-counter-controls">
                  <button onClick={() => handleDecrement('child')} className="ticket-counter-button">-</button>
                  <span className="ticket-counter-value">{childTickets}</span>
                  <button onClick={() => handleIncrement('child')} className="ticket-counter-button">+</button>
                </div>
              </div>

              <div className="ticket-row">
                <span className="ticket-label">Senior (65+) <span className="ticket-price">$10</span></span>
                <div className="ticket-counter-controls">
                  <button onClick={() => handleDecrement('senior')} className="ticket-counter-button">-</button>
                  <span className="ticket-counter-value">{seniorTickets}</span>
                  <button onClick={() => handleIncrement('senior')} className="ticket-counter-button">+</button>
                </div>
              </div>
            </div>

            <div className="ticket-total-row">
              <span>Tickets Total</span>
              <span className="ticket-total-value">{getTotalTickets()}</span>
            </div>

            <button className="ticket-promo-button">
              <span>Add a <strong className="ticket-promo-label-strong">Discount/Promotion</strong></span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ArrowRight size={20} />
              </div>
            </button>

            <div className="ticket-order-total">
              <span>Order Total</span>
              <span>$ {calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="ticket-right-column">
            <button onClick={() => setShowSeatSelection(true)} className="ticket-select-seats-button">
              Select Seats
            </button>

            <div className="ticket-selected-seats-info">
              <p className="ticket-seats-label">Seat(s) Selected:</p>
              <p className="ticket-seats-value">
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : '- No Seats Selected Yet -'}
              </p>
            </div>

            <button
              onClick={handleContinue}
              disabled={selectedSeats.length !== getTotalTickets()}
              className="ticket-continue-button"
            >
              Continue
            </button>
          </div>
        </div>
      </main>

      {showSeatSelection && (
        <div className="ticket-modal-overlay" onClick={() => setShowSeatSelection(false)}>
          <div className="ticket-modal-content" onClick={(e) => e.stopPropagation()}>
            <SeatSelectionPage
              onClose={() => setShowSeatSelection(false)}
              onSeatsSelected={handleSeatsSelected}
              maxSeats={getTotalTickets()}
            />
          </div>
        </div>
      )}
    </div>
  );
}