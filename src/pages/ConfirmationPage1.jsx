// ConfirmationPage1.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import '../styles/ConfirmationPage.css';

const ConfirmationPage1 = () => {
  const navigate = useNavigate();
  const { bookingData } = useBooking();
  
  const orderInfo = {
    orderNumber: '#H7MN324B6',
    movie: {
      title: bookingData.movie?.title || 'Barbie',
      poster: bookingData.movie?.image || 'src/assets/movie-posters/barbie-poster.jpg',
      date: bookingData.date || 'Sep 26, 2025',
      time: bookingData.time || '10:00 AM'
    },
    theater: {
      name: bookingData.theatre || 'CineNova MarketMall',
      address: '3625 Shaganappi Trail NW',
      city: 'Calgary',
      province: 'AB'
    }
  };

  const handleShareTickets = () => {
    navigate('/confirmation2');
  };

  const handlePrintTickets = () => {
    // Create a beautiful printable version of the ticket
    const printContent = `
      <div style="font-family: 'Arial', sans-serif; max-width: 400px; margin: 0 auto; border: 2px solid #2c5aa0; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); page-break-inside: avoid;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2c5aa0, #1e4a8a); color: white; padding: 20px; text-align: center;">
          <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">CINENOVA</div>
          <div style="font-size: 14px; opacity: 0.9;">Movie Tickets</div>
        </div>
        
        <!-- Movie Info -->
        <div style="padding: 25px; text-align: center; background: #f8f9fa;">
          <div style="font-size: 22px; font-weight: bold; color: #2c5aa0; margin-bottom: 15px;">${orderInfo.movie.title}</div>
          
          <div style="display: flex; justify-content: center; gap: 25px; margin: 20px 0;">
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #666; margin-bottom: 5px;">DATE</div>
              <div style="font-size: 16px; font-weight: bold; color: #333;">${orderInfo.movie.date}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #666; margin-bottom: 5px;">TIME</div>
              <div style="font-size: 16px; font-weight: bold; color: #333;">${orderInfo.movie.time}</div>
            </div>
          </div>
        </div>
        
        <!-- Theater Info -->
        <div style="padding: 20px; border-bottom: 1px solid #eee;">
          <div style="font-size: 14px; color: #666; margin-bottom: 8px;">THEATER</div>
          <div style="font-size: 16px; font-weight: bold; color: #333; margin-bottom: 5px;">${orderInfo.theater.name}</div>
          <div style="font-size: 14px; color: #666; line-height: 1.4;">
            ${orderInfo.theater.address}<br>
            ${orderInfo.theater.city}, ${orderInfo.theater.province}
          </div>
        </div>
        
        <!-- QR Code Section -->
        <div style="padding: 25px; text-align: center; background: #f8f9fa;">
          <div style="font-size: 14px; color: #666; margin-bottom: 15px;">SCAN FOR ENTRY</div>
          <div style="background: white; padding: 15px; display: inline-block; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <img src="${window.location.origin}/src/assets/QRcode.png" alt="QR Code" style="width: 150px; height: 150px; display: block;" onerror="this.style.display='none'">
          </div>
        </div>
        
        <!-- Order Details -->
        <div style="padding: 20px; background: #2c5aa0; color: white; text-align: center;">
          <div style="font-size: 12px; opacity: 0.9; margin-bottom: 5px;">ORDER NUMBER</div>
          <div style="font-size: 16px; font-weight: bold; letter-spacing: 1px;">${orderInfo.orderNumber}</div>
        </div>
        
        <!-- Footer -->
        <div style="padding: 15px; text-align: center; background: #1a1a1a; color: white; font-size: 11px;">
          <div style="margin-bottom: 5px;">Thank you for choosing CineNova</div>
          <div style="opacity: 0.7;">Present this ticket at the theater</div>
        </div>
      </div>
      
      <!-- Print multiple copies instruction -->
      <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #666; page-break-before: avoid;">
      </div>
    `;
    
    const printWindow = window.open('', '_blank', 'width=600,height=800');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>CineNova Tickets - ${orderInfo.movie.title}</title>
          <style>
            @media print {
              body { 
                margin: 0 !important; 
                padding: 10px !important;
                background: white !important;
                height: auto !important;
                overflow: visible !important;
              }
              @page {
                margin: 0.5cm !important;
                size: auto !important;
              }
              html, body {
                height: auto !important;
                overflow: visible !important;
              }
              * {
                box-sizing: border-box;
              }
            }
            body {
              font-family: Arial, sans-serif;
              background: #f5f5f5;
              padding: 20px;
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
            .ticket-container {
              max-width: 400px;
              width: 100%;
            }
          </style>
        </head>
        <body>
          <div class="ticket-container">
            ${printContent}
          </div>
          <script>
            // Wait for images to load before printing
            window.onload = function() {
              setTimeout(() => {
                window.print();
                // Don't auto-close, let user decide
              }, 1000);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleContinueBrowsing = () => {
    navigate('/');
  };

  return (
    <div className="confirmation-page">
      <header className="confirmation-header">
        <div className="header-content">
          <img src="/assets/cinenova.png" className="cinenova-logo" alt="CineNova" />
          <div className="header-icons">
            <img src="/assets/three_lines.png" className="header-icon" alt="Menu" />
          </div>
        </div>
      </header>

      <main className="confirmation-main">
        <button className="ticket-back-button" onClick={() => navigate(-1)}>
          <span>← Back</span>
        </button>
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

            {/* Right Column: Confirmation */}
            <section className="confirmation-section">
              <div className="confirmation-text">
                <h2 className="thank-you">Thank you for your purchase!</h2>
                <p className="order-number">Order Number: {orderInfo.orderNumber}</p>
              </div>

              <div className="qr-code">
                <img src="/assets/QRcode.png" alt="QR Code" className="qr-image" />
              </div>

              <div className="action-buttons">
                <button className="btn print-btn" onClick={handlePrintTickets}>
                  Print Tickets
                </button>
                <button className="btn share-btn" onClick={handleShareTickets}>
                  Share Tickets
                </button>
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

export default ConfirmationPage1;
