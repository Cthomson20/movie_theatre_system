// src/pages/LocationsPage.jsx
import { useNavigate } from 'react-router-dom';
import '../styles/ShowtimesPage.css';      // reuse header + layout styles
import '../styles/LocationsPage.css';      // locations-specific styles

const THEATRE_LOCATIONS = [
  {
    name: 'CineNova Market Mall',
    addressLine1: '3625 Shaganappi Trail NW',
    addressLine2: 'Calgary, AB T3A 0E2',
    phone: '(403) 555-0101',
    amenities: ['Reserved seating', 'Ultra AVX', 'Dolby Atmos', 'Wheelchair accessible'],
  },
  {
    name: 'CineNova Downtown',
    addressLine1: '500 Centre Street SE',
    addressLine2: 'Calgary, AB T2P 1B4',
    phone: '(403) 555-0102',
    amenities: ['VIP auditoriums', 'Licensed lounge', 'Closed captioning'],
  },
  {
    name: 'CineNova NE',
    addressLine1: '4920 130 Avenue NE',
    addressLine2: 'Calgary, AB T1Y 5T9',
    phone: '(403) 555-0103',
    amenities: ['Family seating', 'Party rooms', 'Accessible parking'],
  },
  {
    name: 'CineNova Macleod Trail',
    addressLine1: '1011 Macleod Trail South SW',
    addressLine2: 'Calgary, AB T2J 3V1',
    phone: '(403) 555-0104',
    amenities: ['IMAX', 'Ultra AVX', 'Reserved seating'],
  },
];

export default function LocationsPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/'); // same as Showtimes: back to home
  };

  return (
    <div className="showtimes-page locations-page">
      <header className="showtimes-header">
        <div className="header-content">
          <img
            src="./cinenova.png"
            className="cinenova-logo"
            alt="CineNova"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
          <div className="header-icons">
            <img
              src={`${import.meta.env.BASE_URL}three_lines.png`}
              className="header-icon"
              alt="Menu"
            />
          </div>
        </div>
      </header>

      {/* Main area – reuse showtimes-main so padding/back button match */}
      <main className="showtimes-main locations-main">
        {/* Back button in same position as other pages */}
        <button className="ticket-back-button" onClick={handleBack}>
          <span>← Back</span>
        </button>

        {/* Inner container – styled similarly to showtimes-container, but with locations tweaks */}
        <div className="showtimes-container locations-container">
          <h1 className="locations-title">Our Locations</h1>

          <p className="locations-intro">
            Find your nearest CineNova theatre. Click &ldquo;View showtimes&rdquo; to browse movies
            playing at that location.
          </p>

          <div className="locations-grid">
            {THEATRE_LOCATIONS.map((theatre) => (
              <section key={theatre.name} className="location-card">
                <h2 className="location-name">{theatre.name}</h2>

                <div className="location-address">
                  <p>{theatre.addressLine1}</p>
                  <p>{theatre.addressLine2}</p>
                  <p className="location-phone">{theatre.phone}</p>
                </div>

                <div className="location-amenities">
                  {theatre.amenities.map((amenity) => (
                    <span key={amenity} className="amenity-pill">
                      {amenity}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="location-showtimes-button"
                  onClick={() => {
                    navigate('/', {
                      state: { theatreFilter: theatre.name },
                    });
                  }}
                >
                  View showtimes →
              </button>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
