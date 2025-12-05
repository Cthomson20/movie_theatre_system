import { useState } from 'react';
import { useBooking } from '../context/BookingContext';

export default function SeatPreviewPage({
  onClose,
  onBookTickets,
})
 {
  const { bookingData } = useBooking();
  const { movie, theatre, date, format, time } = bookingData;
  
  const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const COLS = Array.from({ length: 12 }, (_, i) => i + 1);

  const accessibleSeats = ['C1', 'B2', 'B11', 'C12'];
  const emptySeats = ['B1', 'C2', 'C11', 'B12'];
  const unavailableSeats = ['E5', 'E6', 'F8', 'D3'];
  
  const handleBookTickets = () => {
    if (onBookTickets){
    onBookTicket();
    }
  };

  const getSeatColor = (seatId) => {
    if (accessibleSeats.includes(seatId)) return 'white';
    if (unavailableSeats.includes(seatId)) return '#6b7280';
    return '#3971eaff';
  };

  const getSeatBorder = (seatId) => {
    if (accessibleSeats.includes(seatId)) return '#3971eaff';
    if (unavailableSeats.includes(seatId)) return '#4b5563';
    return '#3971eaff';
  };

  return (
    <div
        style={{
          backgroundColor: '#1f2937',
          borderRadius: 'clamp(16px, 3vw, 24px)',
          padding: 'clamp(40px, 6vw, 60px) clamp(15px, 2vw, 20px)',
          maxWidth: '950px',
          maxHeight: '90vh',
          width: '95%',
          overflow: 'auto',
          position: 'relative',
          margin: '0 auto',
          border: '2px solid #333',
        }}
      >
        {/* Close button */}
        <button onClick={onClose} className="seat-close-button">
         ×
        </button>

        <div
          style={{
            display: 'flex',
            gap: '80px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Seating Area */}
          <div
            style={{
              border: '2px solid #4b5563',
              borderRadius: '12px',
              padding: '20px 35px 20px 20px',
              position: 'relative',
            }}
          >
            {/* Screen */}
            <div
              style={{
                position: 'absolute',
                top: '-2px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#1f2937',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                padding: '6px 20px',
                border: '2px solid #4b5563',
                borderRadius: '0 0 12px 12px',
                width: '60%',
                textAlign: 'center',
              }}
            >
              SCREEN
            </div>

            <div style={{ marginTop: '50px', marginBottom: '8px' }}>
              {ROWS.map((row) => (
                <div
                  key={row}
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '12px',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      width: '30px',
                      textAlign: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {row}
                  </div>

                  {COLS.map((col) => {
                    const seatId = `${row}${col}`;
                    const isAccessible = accessibleSeats.includes(seatId);
                    const isEmpty = emptySeats.includes(seatId);
                    const isUnavailable = unavailableSeats.includes(seatId);

                    if (isEmpty) {
                      return (
                        <div
                          key={seatId}
                          style={{
                            width: '32px',
                            height: '32px',
                            border: '2px solid transparent',
                            flexShrink: 0,
                          }}
                        ></div>
                      );
                    }

                    return (
                      <div
                        key={seatId}
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: getSeatColor(seatId),
                          border: `2px solid ${getSeatBorder(seatId)}`,
                          borderRadius: '4px',
                          color: '#3971eaff',
                          fontSize: '18px',
                          cursor: isUnavailable ? 'not-allowed' : 'default',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          flexShrink: 0,
                          padding: 0,
                        }}
                      >
                        {isAccessible ? '♿' : ''}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Column Numbers */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                marginTop: '8px',
              }}
            >
              <div style={{ width: '30px', flexShrink: 0 }}></div>
              {COLS.map((col) => (
                <div
                  key={col}
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '2px solid transparent',
                    color: '#9ca3af',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {col}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div
            style={{
              width: '260px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              marginTop: '40px',
            }}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  border: '2px solid #3971eaff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3971eaff',
                  fontSize: '20px',
                }}
              >
                ♿
              </div>
              <span style={{ color: 'white', fontSize: '15px' }}>
                Accessible Seating
              </span>
            </div>

            

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#6b7280',
                  borderRadius: '4px',
                  border: '2px solid #4b5563',
                }}
              ></div>
              <span style={{ color: 'white', fontSize: '15px' }}>
                Unavailable
              </span>
            </div>

            <button
              onClick={onBookTickets}
              style={{
                width: '100%',
                backgroundColor: 'white',
                color: 'black',
                fontWeight: 'bold',
                padding: '10px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                marginTop: '16px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#FFD700';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Book Tickets
            </button>
        </div>
      </div>
    </div>
  );
}
