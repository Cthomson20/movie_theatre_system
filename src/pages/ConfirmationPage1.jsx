// ConfirmationPage1.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import '../styles/ConfirmationPage.css';
import { formatNiceDate } from '../utils/dateUtils';

const ConfirmationPage1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingData } = useBooking();
  const [ticketsSent, setTicketsSent] = useState(false);
  const [sentTo, setSentTo] = useState('');
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (location.state?.ticketsSent) {
      setTicketsSent(true);
      setSentTo(location.state?.sentTo || '');
    }
  }, [location]);
  
  // Theatre address mapping
  const theatreAddresses = {
    "CineNova Market Mall": {
      address: "3625 Shaganappi Trail NW",
      city: "Calgary",
      province: "AB"
    },
    "CineNova Downtown": {
      address: "240 4 Ave SW",
      city: "Calgary",
      province: "AB"
    },
    "CineNova NE": {
      address: "5111 Northland Dr NE",
      city: "Calgary",
      province: "AB"
    },
    "CineNova Macleod Trail": {
      address: "10816 Macleod Trail SE",
      city: "Calgary",
      province: "AB"
    }
  };
  
  const theatreInfo = theatreAddresses[bookingData.theatre] || {
    address: "",
    city: "",
    province: ""
  };
  
  const orderInfo = {
    orderNumber: '#H7MN324B6',
    movie: {
      title: bookingData.movie?.title || '',
      poster: bookingData.movie?.image || '',
      date: bookingData.date || '',
      time: bookingData.time || ''
    },
    theater: {
      name: bookingData.theatre || '',
      address: theatreInfo.address,
      city: theatreInfo.city,
      province: theatreInfo.province
    }
  };

  const handleShareTickets = () => {
    navigate('/confirmation2');
  };

  const handlePrintTickets = () => {
    // Calculate total number of tickets
    const tickets = bookingData.tickets || { general: 0, child: 0, senior: 0 };
    const totalTickets = tickets.general + tickets.child + tickets.senior;
    const seats = bookingData.seats || [];
    
    // Create ticket template for each seat
    const createTicket = (seatInfo, ticketNumber) => `
      <div style="font-family: 'Arial', sans-serif; max-width: 400px; margin: 0 auto 30px auto; border: 2px solid #2c5aa0; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); page-break-inside: avoid; page-break-after: always;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2c5aa0, #1e4a8a); color: white; padding: 20px; text-align: center;">
          <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">CINENOVA</div>
          <div style="font-size: 14px; opacity: 0.9;">Movie Ticket ${ticketNumber} of ${totalTickets}</div>
        </div>
        
        <!-- Movie Info -->
        <div style="padding: 25px; text-align: center; background: #f8f9fa;">
          <div style="font-size: 22px; font-weight: bold; color: #2c5aa0; margin-bottom: 15px;">${orderInfo.movie.title}</div>
          
          <div style="display: flex; justify-content: center; gap: 25px; margin: 20px 0;">
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #666; margin-bottom: 5px;">DATE</div>
              <div style="font-size: 16px; font-weight: bold; color: #333;">${formatNiceDate(orderInfo.movie.date)}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #666; margin-bottom: 5px;">TIME</div>
              <div style="font-size: 16px; font-weight: bold; color: #333;">${orderInfo.movie.time}</div>
            </div>
          </div>
          
          ${seatInfo ? `
          <div style="margin-top: 15px; padding: 10px; background: white; border-radius: 8px;">
            <div style="font-size: 12px; color: #666; margin-bottom: 5px;">SEAT</div>
            <div style="font-size: 18px; font-weight: bold; color: #2c5aa0;">${seatInfo}</div>
          </div>
          ` : ''}
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
            <img src="${window.location.origin}/movie_theatre_system/QRcode.png" alt="QR Code" style="width: 150px; height: 150px; display: block;" onerror="this.style.display='none'">
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
    `;
    
    // Generate all tickets
    let allTickets = '';
    if (seats.length > 0) {
      // If seats are selected, create a ticket for each seat
      seats.forEach((seat, index) => {
        allTickets += createTicket(seat, index + 1);
      });
    } else {
      // If no seats, create tickets based on ticket count
      for (let i = 0; i < totalTickets; i++) {
        allTickets += createTicket(null, i + 1);
      }
    }
    
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
            }
            .ticket-container {
              max-width: 400px;
              width: 100%;
            }
          </style>
        </head>
        <body>
          <div class="ticket-container">
            ${allTickets}
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
        <img 
            src="./cinenova.png" 
            className="cinenova-logo" 
            alt="CineNova" 
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
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
                    navigate('/')
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
                <h1 className="movie-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>{orderInfo.movie.title}</h1>
                <div className="showtime-info" style={{ fontSize: '0.5rem' }}>
                  <p>{formatNiceDate(orderInfo.movie.date)}</p>
                  <p>{orderInfo.movie.time}</p>
                </div>

                <div className="theater-info" style={{ fontSize: '0.5rem' }}>
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
                <h3 className="tickets-delivery">Your tickets have been sent to {bookingData.paymentInfo.email}. See you soon!</h3>
                {ticketsSent && (
                  <p className="success-message">
                    Tickets have been successfully sent to {sentTo}!
                  </p>
                )}
                <p className="order-number">Order Number: {orderInfo.orderNumber}</p>
              </div>

              <div className="qr-code">
                <img src={`${import.meta.env.BASE_URL}QRcode.png`} alt="QR Code" className="qr-image" />
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
