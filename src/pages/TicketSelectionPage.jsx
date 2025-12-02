import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, Menu, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import SeatSelectionPage from './SeatSelectionPage';
import barbiePoster from '../assets/movie-posters/barbie-poster.jpg';
import '../styles/TicketSelectionPage.css';

export default function TicketSelectionPage() {
  const navigate = useNavigate();
  const { bookingData, updateBooking } = useBooking();
  
  const [generalTickets, setGeneralTickets] = useState(bookingData.tickets.general);
  const [childTickets, setChildTickets] = useState(bookingData.tickets.child);
  const [seniorTickets, setSeniorTickets] = useState(bookingData.tickets.senior);
  const [selectedSeats, setSelectedSeats] = useState(bookingData.seats);
  const [showSeatSelection, setShowSeatSelection] = useState(false);

  const PRICES = { general: 20, child: 15, senior: 10 };

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

  const styles = {
    page: {
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      borderBottom: '1px solid transparent',
      backgroundColor: '#000',
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      background: 'none',
      border: 'none',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '1.125rem',
      gap: '0.5rem',
    },
    headerTitle: {
      fontSize: '2rem',
      fontWeight: 300,
      margin: 0,
    },
    headerIcons: { display: 'flex', gap: '1rem' },

    contentContainer: {
      display: 'flex',
      width: '100vw',
      height: 'calc(100vh - 70px)',
      overflow: 'hidden',
    },

    leftColumn: {
      width: '320px',
      flexShrink: 0,
      padding: '1rem 2rem 2rem 2rem',
      overflowY: 'auto',
      backgroundColor: '#000',
    },
    movieTitle: {
      fontSize: '2rem',
      marginBottom: '1rem',
      fontWeight: 400,
    },
    posterContainer: { marginBottom: '1rem' },
    moviePoster: {
      width: '100%',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    },
    showtimeDetails: { color: '#aaa', lineHeight: 1.4 },

    middleColumn: {
      flex: 1,
      padding: '6rem 3rem 2rem 3rem', 
      overflowY: 'auto',
      backgroundColor: '#000',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      borderRight: '1px solid transparent',
    },

    formatBadge: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' },
    formatText: { fontSize: '2.25rem' },
    ccBadge: {
      backgroundColor: '#666',
      color: '#fff',
      fontSize: '0.75rem',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem',
    },
    ticketCounters: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    ticketRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.5rem 0',
    },
    ticketLabel: { fontSize: '1.125rem' },
    counterControls: { display: 'flex', alignItems: 'center', gap: '1rem' },
    counterButton: {
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '50%',
      border: '2px solid #fff',
      background: 'none',
      color: '#fff',
      fontSize: '1.25rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    counterValue: { fontSize: '1.25rem', width: '2rem', textAlign: 'center' },

    totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.25rem', marginTop: '2rem' },
    totalValue: { fontSize: '1.5rem', fontWeight: 500 },

    promoButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      background: 'transparent',
      color: '#fff',
      border: 'none',
      padding: '0.75rem 0',
      marginTop: '1rem',
      cursor: 'pointer',
      textAlign: 'left',
      borderBottom: '1px solid #444',
    },
    promoLabelStrong: { fontWeight: 700 },

    orderTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '1.75rem',
      fontWeight: 600,
      marginTop: '2rem',
    },

    rightColumn: {
      width: '350px',
      flexShrink: 0,
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '1.5rem',
      backgroundColor: '#000',
      position: 'relative',
    },

    selectSeatsButton: {
      backgroundColor: '#fbbf24',
      color: '#000',
      padding: '1.25rem 1.5rem',
      borderRadius: '0.5rem',
      border: 'none',
      fontSize: '1.5rem',
      fontWeight: 600,
      cursor: 'pointer',
      marginBottom: '1rem',
      width: '40%', 
      alignSelf: 'center', 
    },

    selectedSeatsInfo: {
      backgroundColor: '#1a1a1a',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      border: '1px solid #333',
      marginBottom: '1rem',
    },
    seatsLabel: { color: '#aaa', marginBottom: '1rem', fontSize: '1rem' },
    seatsValue: { color: '#fff', margin: 0, fontSize: '1.1rem', lineHeight: '1.6' },

    continueButton: {
      position: 'absolute',
      right: '16px',
      bottom: '16px',
      backgroundColor: '#666',
      color: '#fff',
      padding: '1.25rem 2rem',
      borderRadius: '0.5rem',
      border: 'none',
      fontSize: '1.25rem',
      fontWeight: 600,
      cursor: 'pointer',
    },

    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem',
    },
    modalContent: { 
        maxWidth: '1100px',  
        maxHeight: '90vh',  
        width: '80%',        
        height: 'auto',     
        overflow: 'auto', 
        borderRadius: '24px',
        padding: '2rem',     
        backgroundColor: '#1f2937' 
    },
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
            <h2 className="ticket-movie-title">{bookingData.movie?.title || 'Barbie'}</h2>
            <div className="ticket-poster-container">
              <img src={bookingData.movie?.image || barbiePoster} alt="Movie Poster" className="ticket-movie-poster" />
            </div>
            <div className="ticket-showtime-details">
              <p style={{ fontWeight: 500 }}>{bookingData.date || 'Today, Sep 26, 2025'}</p>
              <p>{bookingData.time || '10:00 AM'}</p>
              <p style={{ fontWeight: 500 }}>{bookingData.theatre || 'CineNova MarketMall'}</p>
              <p>3625 Shaganappi Trail NW</p>
              <p>Calgary, AB</p>
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