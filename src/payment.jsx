import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './payment.css';

const PaymentPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const isFormValid = () => {
        return formData.cardNumber.trim() !== '' &&
               formData.expiryDate.trim() !== '' &&
               formData.cvv.trim() !== '' &&
               formData.cardholderName.trim() !== '' &&
               formData.email.trim() !== '';
    };

    const movieInfo = {
        movie: {
        title: 'Barbie',
        poster: 'src/assets/movie-posters/barbie-poster.jpg',
        date: 'Sep 26, 2025',
        time: '10:00 AM'
        },
        theater: {
        name: 'CineNova Market Mall',
        address: '3625 Shaganappi Trail NW',
        city: 'Calgary',
        province: 'AB'
        }
    }
    const orderSummary = {
        titles: {
            seats: 'Regular Seat(s)',
            bookingFee: 'Online Booking Fee',
            subtotal: 'Subtotal',
            taxes: 'Taxes',
            orderTotal: 'Order Total'
        }
    };

    return (
    <div className="payment-page">
      <header className="payment-header">
        <div className="header-content">
          <img src="src/assets/cinenova.png" className="cinenova-logo" alt="CineNova" />
          <div className="header-icons">
            <img src="src/assets/three_lines.png" className="header-icon" alt="Menu" />
            <img src="src/assets/magnifying_glass.png" className="header-icon" alt="Search" />
          </div>
        </div>
      </header>

      <main className="payment-main">
        <div className="payment-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div className="content-grid">
            {/* Left Column: Order Summary */}
            <div className="order-summary-section">
              <h2>Order Summary</h2>
              
              <div className="movie-info">
                <img src={movieInfo.movie.poster} className="summary-poster" alt={movieInfo.movie.title} />
                <div className="movie-details-summary">
                  <h3>{movieInfo.movie.title}</h3>
                  <p>{movieInfo.movie.date} at {movieInfo.movie.time}</p>
                  <p className="theater-name">{movieInfo.theater.name}</p>
                </div>
              </div>

              <div className="order-breakdown">
                <div className="order-line">
                  <span>{orderSummary.titles.seats}</span>
                  <span>$30.00</span>
                </div>
                <div className="order-line">
                  <span>{orderSummary.titles.bookingFee}</span>
                  <span>$2.50</span>
                </div>
                <div className="order-line subtotal">
                  <span>{orderSummary.titles.subtotal}</span>
                  <span>$32.50</span>
                </div>
                <div className="order-line">
                  <span>{orderSummary.titles.taxes}</span>
                  <span>$4.23</span>
                </div>
                <div className="order-line total">
                  <span>{orderSummary.titles.orderTotal}</span>
                  <span>$36.73</span>
                </div>
              </div>
            </div>

            {/* Right Column: Payment Form */}
            <div className="payment-form-section">
              <h2>Payment Information</h2>
              
              <div className="form-group">
                <label>Card Number</label>
                <input 
                  type="text" 
                  name="cardNumber"
                  className="input-field" 
                  placeholder="1234 5678 9012 3456" 
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input 
                    type="text" 
                    name="expiryDate"
                    className="input-field" 
                    placeholder="MM/YY" 
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input 
                    type="text" 
                    name="cvv"
                    className="input-field" 
                    placeholder="123" 
                    value={formData.cvv}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Cardholder Name</label>
                <input 
                  type="text" 
                  name="cardholderName"
                  className="input-field" 
                  placeholder="John Doe" 
                  value={formData.cardholderName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  className="input-field" 
                  placeholder="email@example.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <button 
                className={`pay-btn ${!isFormValid() ? 'disabled' : ''}`}
                onClick={() => isFormValid() && navigate('/confirmation1')}
                disabled={!isFormValid()}
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;