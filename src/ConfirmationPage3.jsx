// ConfirmationPage3.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfirmationPage.css';

const ConfirmationPage3 = () => {
  const navigate = useNavigate();
  
  const orderInfo = {
    orderNumber: '#H7MN324B6',
    movie: {
      title: 'Barbie',
      poster: 'src/assets/movie-posters/barbie-poster.jpg',
      date: 'Sep 26, 2025',
      time: '10:00 AM'
    },
    theater: {
      name: 'CineNova MarketMall',
      address: '3625 Shaganappi Trail NW',
      city: 'Calgary',
      province: 'AB'
    }
  };

  const handleContinueBrowsing = () => {
    navigate('/');
  };

  return (
    <div className="confirmation-page">
      <header className="confirmation-header">
        <div className="header-content">
          <img src="src/assets/cinenova.png" className="cinenova-logo" alt="CineNova" />
          <div className="header-icons">
            <img src="src/assets/three_lines.png" className="header-icon" alt="Menu" />
            <img src="src/assets/magnifying_glass.png" className="header-icon" alt="Search" />
          </div>
        </div>
      </header>

      <main className="confirmation-main">
        <div className="confirmation-container">
          <div className="content-grid">
            {/* Left Column: Movie Info */}
            <div className="movie-section">
              <img 
                src={orderInfo.movie.poster} 
                className="movie-poster" 
                alt={orderInfo.movie.title}
              />
              
              <div className="movie-details">
                <h1 className="movie-title">{orderInfo.movie.title}</h1>
                <div className="showtime-info">
                  <p>{orderInfo.movie.date}</p>
                  <p>{orderInfo.movie.time}</p>
                </div>

                <div className="theater-info">
                  <p className="theater-name">{orderInfo.theater.name}</p>
                  <p className="theater-address">{orderInfo.theater.address}</p>
                  <p className="theater-location">{orderInfo.theater.city}, {orderInfo.theater.province}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Success Confirmation */}
            <section className="confirmation-section">
              <div className="confirmation-text">
                <h2 className="thank-you">Thank you for your purchase!</h2>
                <p className="success-message">Your Tickets have been successfully sent!</p>
                <p className="order-number">Order Number: {orderInfo.orderNumber}</p>
              </div>

              <div className="qr-code">
                <img src="src/assets/QRcode.png" alt="QR Code" className="qr-image" />
              </div>

              <div className="action-buttons">
                <button className="btn print-btn">Print Tickets</button>
                <button className="btn share-btn">Share Tickets</button>
              </div>

              <div className="continue-section">
                <button onClick={handleContinueBrowsing} className="continue-link">
                  Continue browsing
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfirmationPage3;