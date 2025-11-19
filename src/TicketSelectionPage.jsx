import React, { useState } from 'react';
import { ArrowRight, Search, Menu, ChevronLeft } from 'lucide-react';
import SeatSelectionPage from './Components_SeatSelectionPage';
import barbiePoster from './assets/movie-posters/barbie-poster.jpg';

export default function TicketSelection() {
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
    if (type === 'general') setGeneralTickets((p) => Math.max(0, p - 1));
    if (type === 'child') setChildTickets((p) => Math.max(0, p - 1));
    if (type === 'senior') setSeniorTickets((p) => Math.max(0, p - 1));
  };

  const handleSeatsSelected = (seats) => setSelectedSeats(seats);
  const handleBack = () => window.history.back();
  const handleContinue = () => {
    console.log('Continue to checkout with:', {
      tickets: { general: generalTickets, child: childTickets, senior: seniorTickets },
      seats: selectedSeats,
      total: calculateTotal(),
    });
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

    regularBadge: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' },
    regularText: { fontSize: '2.25rem' },
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
    <div style={styles.page}>
      <header style={styles.header}>
        <button onClick={handleBack} style={styles.backButton}>
          <ChevronLeft size={24} />
          <span>Back</span>
        </button>

        <h1 style={styles.headerTitle}>Ticket Selection</h1>

        <div style={styles.headerIcons}>
          <button style={{ background: 'none', border: 'none', color: '#fff' }}>
            <Search size={24} />
          </button>
          <button style={{ background: 'none', border: 'none', color: '#fff' }}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      <div style={styles.contentContainer}>
        <div style={styles.leftColumn}>
          <h2 style={styles.movieTitle}>Barbie (2023)</h2>
          <div style={styles.posterContainer}>
            <img src={barbiePoster} alt="Barbie Movie Poster" style={styles.moviePoster} />
          </div>
          <div style={styles.showtimeDetails}>
            <p style={{ margin: 0 }}>Today, Sep 26, 2025</p>
            <p style={{ margin: '0.25rem 0' }}>10:00 AM</p>
            <p style={{ margin: '0.25rem 0' }}>CineNova MarketMall</p>
            <p style={{ margin: '0.25rem 0' }}>3625 Shaganappi Trail NW</p>
            <p style={{ margin: '0.25rem 0' }}>Calgary, AB</p>
          </div>
        </div>

        <div style={styles.middleColumn}>
          <div>
            <div style={styles.regularBadge}>
              <span style={styles.regularText}>Regular</span>
              <span style={styles.ccBadge}>CC</span>
            </div>

            <div style={styles.ticketCounters}>
              <div style={styles.ticketRow}>
                <span style={styles.ticketLabel}>General (14 - 64)</span>
                <div style={styles.counterControls}>
                  <button onClick={() => handleDecrement('general')} style={styles.counterButton}>-</button>
                  <span style={styles.counterValue}>{generalTickets}</span>
                  <button onClick={() => handleIncrement('general')} style={styles.counterButton}>+</button>
                </div>
              </div>

              <div style={styles.ticketRow}>
                <span style={styles.ticketLabel}>Child (3 - 13)</span>
                <div style={styles.counterControls}>
                  <button onClick={() => handleDecrement('child')} style={styles.counterButton}>-</button>
                  <span style={styles.counterValue}>{childTickets}</span>
                  <button onClick={() => handleIncrement('child')} style={styles.counterButton}>+</button>
                </div>
              </div>

              <div style={styles.ticketRow}>
                <span style={styles.ticketLabel}>Senior (65+)</span>
                <div style={styles.counterControls}>
                  <button onClick={() => handleDecrement('senior')} style={styles.counterButton}>-</button>
                  <span style={styles.counterValue}>{seniorTickets}</span>
                  <button onClick={() => handleIncrement('senior')} style={styles.counterButton}>+</button>
                </div>
              </div>
            </div>

            <div style={styles.totalRow}>
              <span>Tickets Total</span>
              <span style={styles.totalValue}>{getTotalTickets()}</span>
            </div>

            <button style={styles.promoButton}>
              <span>
                Add a <strong style={styles.promoLabelStrong}>Discount/Promotion</strong>
              </span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ArrowRight size={20} />
              </div>
            </button>

            <div style={styles.orderTotal}>
              <span>Order Total</span>
              <span>$ {calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div style={styles.rightColumn}>
          <button onClick={() => setShowSeatSelection(true)} style={styles.selectSeatsButton}>
            Select Seats
          </button>

          <div style={styles.selectedSeatsInfo}>
            <p style={styles.seatsLabel}>Seat(s) Selected:</p>
            <p style={styles.seatsValue}>
              {selectedSeats.length > 0 ? selectedSeats.join(', ') : '- No Seats Selected Yet -'}
            </p>
          </div>

          <button
            onClick={handleContinue}
            disabled={selectedSeats.length === 0}
            style={{
              position: 'absolute',
              right: '16px',
              bottom: '16px',
              backgroundColor: selectedSeats.length === 0 ? '#666' : '#fff',
              color: selectedSeats.length === 0 ? '#aaa' : '#000',
              padding: '1.25rem 2rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontSize: '1.25rem',
              fontWeight: 600,
              cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            Continue
          </button>
        </div>
      </div>

      {showSeatSelection && (
        <div style={styles.modalOverlay} onClick={() => setShowSeatSelection(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <SeatSelectionPage
              onClose={() => setShowSeatSelection(false)}
              onSeatsSelected={handleSeatsSelected}
            />
          </div>
        </div>
      )}
    </div>
  );
}
