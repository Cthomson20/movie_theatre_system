import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import SeatSelectionPage from './SeatSelectionPage';
import barbiePoster from '../assets/movie-posters/barbie-poster.jpg';
import '../styles/TicketSelectionPage.css';

export default function TicketSelectionPage() {
  const navigate = useNavigate();
  const [generalTickets, setGeneralTickets] = useState(1);
  const [childTickets, setChildTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSeatSelection, setShowSeatSelection] = useState(false);

  const PRICES = { general: 20, child: 15, senior: 10 };

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
          <img src="src/assets/cinenova.png" className="cinenova-logo" alt="CineNova" />
          <div className="header-icons">
            <img src="src/assets/three_lines.png" className="header-icon" alt="Menu" />
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
            <h2 className="ticket-movie-title">Barbie</h2>
            <div className="ticket-poster-container">
              <img src={barbiePoster} alt="Barbie Movie Poster" className="ticket-movie-poster" />
            </div>
            <div className="ticket-showtime-details">
              <p style={{ fontWeight: 500 }}>Today, Sep 26, 2025</p>
              <p>10:00 AM</p>
              <p style={{ fontWeight: 500 }}>CineNova MarketMall</p>
              <p>3625 Shaganappi Trail NW</p>
              <p>Calgary, AB</p>
            </div>
          </div>

          {/* Middle Column */}
          <div className="ticket-middle-column">
            <div className="ticket-regular-badge">
              <span className="ticket-regular-text">Regular</span>
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
              disabled={selectedSeats.length === 0}
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