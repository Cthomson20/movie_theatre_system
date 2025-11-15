import React from "react";
import { useNavigate } from "react-router-dom";
import './payment.css';

const PaymentPage = () => {
    const navigate = useNavigate();

    const movieInfo = {
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
          <div className="content-grid">
            {/* Left Column: Payment Form */}
            <div className="payment-form-section">
              <h2><Movie></Movie> Information</h2>
            </div>

            {/* Right Column: Order Summary */}
            <div className="order-summary-section">
              <h2>Order Summary</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;