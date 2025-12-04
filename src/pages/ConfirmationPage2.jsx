// ConfirmationPage2.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import '../styles/ConfirmationPage.css';

const ConfirmationPage2 = () => {
  const [deliveryMethod, setDeliveryMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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

  const handleSendTickets = () => {
    if (deliveryMethod === 'email' && email) {
      alert(`Tickets sent to ${email}`);
      navigate('/confirmation3');
    } else if (deliveryMethod === 'text' && phoneNumber) {
      alert(`Tickets sent to ${phoneNumber}`);
      navigate('/confirmation3');
    } else if (deliveryMethod === 'email') {
      alert('Please enter an email address');
    } else if (deliveryMethod === 'text') {
      alert('Please enter a phone number');
    }
  };

  const getPlaceholder = () => {
    return deliveryMethod === 'email' ? 'Email Address' : 'Phone Number';
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
      setPhoneNumber(value);
    }
  };

  return (
    <div className="confirmation-page">
      <header className="confirmation-header">
        <div className="header-content">
          <img src="./assets/cinenova.png" className="cinenova-logo" alt="CineNova" />
          <div className="header-icons">
            <img src="./assets/three_lines.png" className="header-icon" alt="Menu" />
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

            {/* Right Column: Email/Text Options */}
            <section className="confirmation-section">
              <div className="delivery-section">
                {/* QR Code replaces "Email Tickets" title */}
                <div className="qr-code">
                  <img src="./assets/QRcode.png" alt="QR Code" className="qr-image" />
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
