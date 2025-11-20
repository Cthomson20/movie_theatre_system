import { useState } from 'react';

export default function SeatSelectionPage({ onClose, onSeatsSelected }) {
  const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const COLS = Array.from({ length: 12 }, (_, i) => i + 1);

  const accessibleSeats = ['C1', 'B2', 'B11', 'C12'];
  const emptySeats = ['B1', 'C2', 'C11', 'B12'];
  const unavailableSeats = ['E5', 'E6', 'F8', 'D3'];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatId) => {
    if (unavailableSeats.includes(seatId) || accessibleSeats.includes(seatId) || emptySeats.includes(seatId)) return;
    setSelectedSeats(selectedSeats.includes(seatId)
      ? selectedSeats.filter(s => s !== seatId)
      : [...selectedSeats, seatId]
    );
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    onSeatsSelected(selectedSeats.sort());
    onClose();
  };

  const getSeatColor = (seatId) => {
    if (selectedSeats.includes(seatId)) return '#84d9a3ff';
    if (accessibleSeats.includes(seatId)) return 'white';
    if (unavailableSeats.includes(seatId)) return '#6b7280';
    return '#3971eaff';
  };

  const getSeatBorder = (seatId) => {
    if (selectedSeats.includes(seatId)) return '#84d9a3ff';
    if (accessibleSeats.includes(seatId)) return '#3971eaff';
    if (unavailableSeats.includes(seatId)) return '#4b5563';
    return '#3971eaff';
  };

  return (
    <div style={{
      backgroundColor: '#1f2937',
      borderRadius: '24px',
      padding: '60px 20px',
      maxWidth: '1000px',
      width: '90%',
      position: 'relative',
      border: '2px solid #000000'
    }}>
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '10px', right: '10px', width: '50px', height: '50px',
          border: '2px solid #ef4444', borderRadius: '50%', background: 'transparent',
          color: '#ef4444', fontSize: '28px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0
        }}
      >
        ×
      </button>

      <div style={{ display: 'flex', gap: '100px', justifyContent: 'center', alignItems: 'center' }}>
        {/* Seating Area */}
        <div style={{ border: '2px solid #4b5563', borderRadius: '12px', padding: '20px 35px 20px 20px', position: 'relative', marginLeft: '-40px' }}>
          <div style={{ position: 'absolute', top: '-2px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1f2937', color: 'white', fontWeight: 'bold', fontSize: '16px', padding: '6px 20px', border: '2px solid #4b5563', borderRadius: '0 0 12px 12px', width: '60%', textAlign: 'center' }}>
            SCREEN
          </div>

          <div style={{ marginTop: '50px', marginBottom: '8px' }}>
            {ROWS.map(row => (
              <div key={row} style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
                <div style={{ color: 'white', fontWeight: 'bold', width: '30px', textAlign: 'center', flexShrink: 0 }}>{row}</div>
                {COLS.map(col => {
                  const seatId = `${row}${col}`;
                  const isAccessible = accessibleSeats.includes(seatId);
                  const isEmpty = emptySeats.includes(seatId);
                  const isUnavailable = unavailableSeats.includes(seatId);

                  if (isEmpty) return <div key={seatId} style={{ width: '32px', height: '32px', flexShrink: 0 }}></div>;

                  return (
                    <button
                      key={seatId}
                      onClick={() => toggleSeat(seatId)}
                      disabled={isUnavailable || isAccessible}
                      style={{
                        width: '32px', height: '32px', backgroundColor: getSeatColor(seatId),
                        border: `2px solid ${getSeatBorder(seatId)}`, borderRadius: '4px',
                        color: '#3971eaff', fontSize: '18px', cursor: (isUnavailable || isAccessible) ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
                        flexShrink: 0, padding: 0
                      }}
                    >
                      {isAccessible ? '♿' : ''}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ width: '30px', textAlign: 'center', flexShrink: 0 }}></div>
            {COLS.map(col => (
              <div key={col} style={{ width: '32px', textAlign: 'center', color: '#9ca3af', fontSize: '12px', fontWeight: 'bold', flexShrink: 0 }}>{col}</div>
            ))}
          </div>
        </div>

        {/* Legend + Selected Seats + Confirm */}
        <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '40px', marginRight: '-40px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: 'white', borderRadius: '4px', border: '2px solid #3971eaff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3971eaff', fontSize: '20px', fontWeight: 'bold', flexShrink: 0 }}>♿</div>
            <span style={{ color: 'white', fontSize: '15px' }}>Accessible Seating</span>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#6b7280', borderRadius: '4px', border: '2px solid #4b5563', flexShrink: 0 }}></div>
            <span style={{ color: 'white', fontSize: '15px' }}>Unavailable</span>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#84d9a3ff', borderRadius: '4px', border: '2px solid #84d9a3ff', flexShrink: 0 }}></div>
            <span style={{ color: 'white', fontSize: '15px' }}>Selected</span>
          </div>

          <div style={{ backgroundColor: '#374151', borderRadius: '8px', padding: '12px', textAlign: 'center', marginTop: '16px' }}>
            <p style={{ color: 'white', marginBottom: '6px', fontSize: '16px', fontWeight: '600' }}>Seat(s) Selected:</p>
            <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'white' }}>
              {selectedSeats.length > 0 ? selectedSeats.sort().join(', ') : 'None'}
            </p>
          </div>

          <button
            onClick={handleConfirm}
            style={{ width: '100%', backgroundColor: 'white', color: 'black', fontWeight: 'bold', padding: '10px', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', marginTop: '16px' }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
