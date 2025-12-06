import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from '../context/BookingContext';
import '../styles/payment.css';
import { formatNiceDate } from '../utils/dateUtils';

const PaymentPage = () => {
    const navigate = useNavigate();
    const { bookingData, updateBooking } = useBooking();
    const { tickets = { general: 0, child: 0, senior: 0 }, seats = [], total = 0, movie } = bookingData;

    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'cardNumber') {
            // Remove all non-digit characters
            const digitsOnly = value.replace(/\D/g, '');
            // Limit to 16 digits
            const limitedDigits = digitsOnly.slice(0, 16);
            // Add spaces every 4 digits
            const formatted = limitedDigits.replace(/(\d{4})(?=\d)/g, '$1 ');
            
            setFormData(prev => ({
                ...prev,
                [name]: formatted
            }));
        } else if (name === 'expiryDate') {
            // Remove all non-digit characters
            const digitsOnly = value.replace(/\D/g, '');
            // Limit to 4 digits (MMYY)
            const limitedDigits = digitsOnly.slice(0, 4);
            // Add slash after 2 digits (MM/YY)
            const formatted = limitedDigits.length >= 2 
                ? limitedDigits.slice(0, 2) + '/' + limitedDigits.slice(2)
                : limitedDigits;
            
            setFormData(prev => ({
                ...prev,
                [name]: formatted
            }));
        } else if (name === 'cvv') {
            // Remove all non-digit characters and limit to 3 digits
            const digitsOnly = value.replace(/\D/g, '').slice(0, 3);
            
            setFormData(prev => ({
                ...prev,
                [name]: digitsOnly
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const isFormValid = () => {
        // Remove spaces from card number for validation
        const cardDigits = formData.cardNumber.replace(/\s/g, '');
        // Check if expiry date has 4 digits
        const expiryDigits = formData.expiryDate.replace(/\D/g, '');
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return cardDigits.length === 16 &&
               expiryDigits.length === 4 &&
               formData.cvv.trim() !== '' && formData.cvv.length === 3 &&
               formData.cardholderName.trim() !== '' &&
               emailRegex.test(formData.email.trim());
    };

    // Use passed data or fallback to defaults ''
    const displayMovieInfo = {
        title: movie?.title || '',
        poster: movie?.image || '',
        date: bookingData.date || '',
        time: bookingData.time || '',
        theater: bookingData.theatre || '',
        address: bookingData.theatreAddress || '',
        city: bookingData.theatreCity || '',
        province: bookingData.theatreProvince || ''
    };

    const displayTotal = total;
    
    const displayTickets = tickets;
    
    const ticketPrices = { general: 20.00, child: 15.00, senior: 10.00 };
    
    const orderSummary = {
        titles: {
            genderalTickets: 'General Seat(s)',
            childTickets: 'Child Seat(s)',
            seniorTickets: 'Senior Seat(s)',
            bookingFee: 'Online Booking Fee',
            subtotal: 'Subtotal',
            taxes: 'Taxes',
            orderTotal: 'Order Total'
        }
    };

    const orderTotals = {
        seats: displayTotal,
        bookingFee: 2.50,
        subtotal: displayTotal + 2.50,
        taxes: (displayTotal + 2.50) * 0.05,
        orderTotal: (displayTotal + 2.50) * 1.05
    }

    return (
    <div className="payment-page">
      <header className="payment-header">
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

      <main className="payment-main">
        <button className="ticket-back-button" onClick={() => navigate(-1)}>
          <span>← Back</span>
        </button>
        <div className="payment-container">
          <div className="content-grid">
            {/* Left Column: Order Summary */}
            <div className="order-summary-section">
              <h2>Order Summary</h2>
              
              <div className="movie-info">
                <img src={displayMovieInfo.poster} className="summary-poster" alt={displayMovieInfo.title} />
                <div className="movie-details-summary">
                  <h3>{displayMovieInfo.title}</h3>
                  <p>{formatNiceDate(displayMovieInfo.date)} at {displayMovieInfo.time}</p>
                  <p className="theater-name">{displayMovieInfo.theater}</p>
                </div>
              </div>

              <div className="order-breakdown">
                {displayTickets.general > 0 && (
                  <div className="order-line">
                    <span>{orderSummary.titles.genderalTickets} ({displayTickets.general} × ${ticketPrices.general})</span>
                    <span>${(displayTickets.general * ticketPrices.general).toFixed(2)}</span>
                  </div>
                )}
                {displayTickets.child > 0 && (
                  <div className="order-line">
                    <span>{orderSummary.titles.childTickets} ({displayTickets.child} × ${ticketPrices.child})</span>
                    <span>${(displayTickets.child * ticketPrices.child).toFixed(2)}</span>
                  </div>
                )}
                {displayTickets.senior > 0 && (
                  <div className="order-line">
                    <span>{orderSummary.titles.seniorTickets} ({displayTickets.senior} × ${ticketPrices.senior})</span>
                    <span>${(displayTickets.senior * ticketPrices.senior).toFixed(2)}</span>
                  </div>
                )}
                <div className="order-line">
                  <span>{orderSummary.titles.bookingFee}</span>
                  <span>${orderTotals.bookingFee.toFixed(2)}</span>
                </div>
                <div className="order-line subtotal">
                  <span>{orderSummary.titles.subtotal}</span>
                  <span>${orderTotals.subtotal.toFixed(2)}</span>
                </div>
                <div className="order-line">
                  <span>{orderSummary.titles.taxes}</span>
                  <span>${orderTotals.taxes.toFixed(2)}</span>
                </div>
                <div className="order-line total">
                  <span>{orderSummary.titles.orderTotal}</span>
                  <span>${orderTotals.orderTotal.toFixed(2)}</span>
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
                onClick={() => {
                  if (isFormValid()) {
                    updateBooking({
                      paymentInfo: {
                        cardNumber: formData.cardNumber,
                        expiryDate: formData.expiryDate,
                        cvv: formData.cvv,
                        cardholderName: formData.cardholderName,
                        email: formData.email
                      }
                    });
                    navigate('/confirmation1');
                  }
                }}
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
