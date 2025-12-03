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
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          backgroundColor: '#1f2937',
          borderRadius: '24px',
          padding: '60px 20px',
          maxWidth: '1000px',
          width: '90%',
          position: 'relative',
          border: '2px solid #333',
        }}
      >
        {/* Close Button */}
        <button
          onClick= {onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '50px',
            height: '50px',
            border: 'none',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.15)',
            backdropFilter: 'blur(10px)',
            color: '#ef4444',
            fontSize: '24px',
            fontWeight: '300',
            lineHeight: '1',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            paddingBottom: '2px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)';
            e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(239, 68, 68, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.95) rotate(90deg)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
          }}
        >
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
                backgroundColor: 'gold',
                color: 'black',
                fontWeight: '600',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                marginTop: '16px',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Book tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
