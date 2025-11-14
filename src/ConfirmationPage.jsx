// ConfirmationPage.jsx
import React from 'react';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const orderInfo = {
    orderNumber: '#H7MN324B6',
    movie: {
      title: 'Barbie',
      poster: '/src/assets/movie-posters/barbie-poster.jpg',
      date: 'Today, Sep 26, 2025',
      time: '10:00 AM'
    },
    theater: {
      name: 'CineNova MarketMall',
      address: '3625 Shaganappi Trail NW',
      city: 'Calgary',
      province: 'AB'
    }
  };

  return (
    <div className="confirmation-page">
      <header className="confirmation-header">
        <div className="header-content">
          <img src="/src/assets/cinenova.png" className="cinenova-logo" alt="CineNova" />
          <div className="header-icons">
            <img src="/src/assets/magnifying_glass.png" className="header-icon" alt="Search" />
            <img src="/src/assets/three_lines.png" className="header-icon" alt="Menu" />
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
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="poster-placeholder" style={{ display: 'none' }}>
                Movie Poster
              </div>
              
              <div className="movie-details">
                <h1 className="movie-title">{orderInfo.movie.title}</h1>
                <div className="showtime-info">
                  <p>{orderInfo.movie.date}</p>
                  <p>{orderInfo.movie.time}</p>
                </div>
                <div className="theater-info">
                  <p className="theater-name"><strong>{orderInfo.theater.name}</strong></p>
                  <p className="theater-address">{orderInfo.theater.address}</p>
                  <p className="theater-location">{orderInfo.theater.city}, {orderInfo.theater.province}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Confirmation */}
            <section className="confirmation-section">
              <div className="confirmation-text">
                <h2 className="thank-you">Thank you for your purchase!</h2>
                <p className="order-number">Order Number: {orderInfo.orderNumber}</p>
              </div>

              <div className="qr-section">
                <p className="scan-text"><strong>Scan for Ticket</strong></p>
                <div className="qr-code">
                  <img 
                    src="/src/assets/QRcode.png" 
                    alt="QR Code" 
                    className="qr-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="qr-placeholder" style={{ display: 'none' }}>
                    QR Code
                  </div>
                </div>
              </div>

              <div className="action-buttons">
                <button className="btn print-btn">Print Tickets</button>
                <button className="btn share-btn">Share Tickets</button>
              </div>

              <div className="continue-section">
                <a href="/movies" className="continue-link">Continue browsing</a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfirmationPage;