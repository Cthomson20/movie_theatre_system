// ConfirmationPage2.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import '../styles/ConfirmationPage.css';
import { formatNiceDate } from '../utils/dateUtils';

const ConfirmationPage2 = () => {
  const [deliveryMethod, setDeliveryMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const { bookingData } = useBooking();
  
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

  const handleSendTickets = () => {
    if (deliveryMethod === 'email' && email) {
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      alert(`Tickets sent to ${email}`);
      navigate('/confirmation1', { state: { ticketsSent: true, sentTo: email } });
    } else if (deliveryMethod === 'text' && phoneNumber) {
      alert(`Tickets sent to ${phoneNumber}`);
      navigate('/confirmation1', { state: { ticketsSent: true, sentTo: phoneNumber } });
    } else if (deliveryMethod === 'email') {
      alert('Please enter an email address');
    } else if (deliveryMethod === 'text') {
      alert('Please enter a phone number');
    }
  };

  const getPlaceholder = () => {
    return deliveryMethod === 'email' ? 'e.g. user@example.com' : '(403) 555-1234';
  };

  const getInputType = () => {
    return deliveryMethod === 'email' ? 'email' : 'tel';
  };

  const getInputValue = () => {
    return deliveryMethod === 'email' ? email : phoneNumber;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (deliveryMethod === 'email') {
      setEmail(value);
    } else {
      // Format phone number as (XXX) XXX-XXXX
      const digitsOnly = value.replace(/\D/g, '');
      const limitedDigits = digitsOnly.slice(0, 10);
      
      let formatted = '';
      if (limitedDigits.length > 0) {
        formatted = '(' + limitedDigits.slice(0, 3);
        if (limitedDigits.length > 3) {
          formatted += ') ' + limitedDigits.slice(3, 6);
        }
        if (limitedDigits.length > 6) {
          formatted += '-' + limitedDigits.slice(6, 10);
        }
      }
      
      setPhoneNumber(formatted);
    }
  };

  return (
    <div className="confirmation-page">
      <header className="confirmation-header">
        <div className="header-content">
          <img 
            src={`${import.meta.env.BASE_URL}cinenova.png`} 
            className="cinenova-logo" 
            alt="CineNova" 
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
          <div className="header-icons">
            <img src={`${import.meta.env.BASE_URL}three_lines.png`} className="header-icon" alt="Menu" />
          </div>
        </div>
      </header>

      <main className="confirmation-main">
        <button className="ticket-back-button" onClick={() => navigate('/confirmation1')}>
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
                <h1 className="movie-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{orderInfo.movie.title}</h1>
                <div className="showtime-info" style={{ fontSize: '0.9rem' }}>
                  <p>{formatNiceDate(orderInfo.movie.date)}</p>
                  <p>{orderInfo.movie.time}</p>
                </div>

                <div className="theater-info" style={{ fontSize: '0.9rem' }}>
                  <p className="theater-name">{orderInfo.theater.name}</p>
                  <p className="theater-address">{orderInfo.theater.address}</p>
                  <p className="theater-location">{orderInfo.theater.city}, {orderInfo.theater.province}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Email/Text Options */}
            <section className="confirmation-section">
              <div className="delivery-section">
                {/* QR Code replaces "Email Tickets" title */}
                <div className="qr-code">
                  <img src={`${import.meta.env.BASE_URL}QRcode.png`} alt="QR Code" className="qr-image" />
                </div>
                
                <div className="delivery-toggle">
                  <button 
                    className={`toggle-btn ${deliveryMethod === 'email' ? 'active' : ''}`}
                    onClick={() => setDeliveryMethod('email')}
                  >
                    Email
                  </button>
                  <button 
                    className={`toggle-btn ${deliveryMethod === 'text' ? 'active' : ''}`}
                    onClick={() => setDeliveryMethod('text')}
                  >
                    Text
                  </button>
                </div>

                <div className="delivery-input">
                  <input
                    type={getInputType()}
                    placeholder={getPlaceholder()}
                    value={getInputValue()}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>

                <div className="action-buttons">
                  <button className="btn send-btn-normal" onClick={handleSendTickets}>
                    Send Tickets
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfirmationPage2;
