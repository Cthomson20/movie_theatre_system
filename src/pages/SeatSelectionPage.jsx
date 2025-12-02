import { useState } from 'react';
import '../styles/seatSelection.css';

export default function SeatSelectionPage({ onClose, onSeatsSelected, maxSeats }) {
  const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const COLS = Array.from({ length: 12 }, (_, i) => i + 1);

  const accessibleSeats = ['C1', 'B2', 'B11', 'C12'];
  const emptySeats = ['B1', 'C2', 'C11', 'B12'];
  const unavailableSeats = ['E5', 'E6', 'F8', 'D3'];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const sortSeats = (seats) => {
    return seats.sort((a, b) => {
      const rowA = a.charAt(0);
      const rowB = b.charAt(0);
      const numA = parseInt(a.slice(1));
      const numB = parseInt(b.slice(1));
      
      if (rowA === rowB) return numA - numB;
      return rowA.localeCompare(rowB);
    });
  };

  const toggleSeat = (seatId) => {
    if (unavailableSeats.includes(seatId) || emptySeats.includes(seatId)) return;
    
    if (selectedSeats.includes(seatId)) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      // Check if we've reached the maximum number of seats
      if (selectedSeats.length >= maxSeats) {
        alert(`You can only select ${maxSeats} seat(s) based on your ticket count.`);
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    if (selectedSeats.length !== maxSeats) {
      alert(`Please select exactly ${maxSeats} seat(s) to match your ticket count.`);
      return;
    }
    onSeatsSelected(sortSeats([...selectedSeats]));
    onClose();
  };

  const getSeatColor = (seatId) => {
    if (selectedSeats.includes(seatId)) return '#84d9a3ff';
    if (unavailableSeats.includes(seatId)) return '#6b7280';
    if (accessibleSeats.includes(seatId)) return 'white';
    return '#3971eaff';
  };

  const getSeatBorder = (seatId) => {
    if (selectedSeats.includes(seatId)) return '#84d9a3ff';
    if (unavailableSeats.includes(seatId)) return '#4b5563';
    if (accessibleSeats.includes(seatId)) return '#3971eaff';
    return '#3971eaff';
  };

  return (
    <div className="seat-selection-container">
      {/* Close button */}
      <button onClick={onClose} className="seat-close-button">
        ×
      </button>

      <div className="seat-selection-content">
        {/* Seating Area */}
        <div className="seating-area">
          <div className="screen-label">SCREEN</div>

          <div className="seat-grid">
            {ROWS.map(row => (
              <div key={row} className="seat-row">
                <div className="seat-row-label">{row}</div>
                {COLS.map(col => {
                  const seatId = `${row}${col}`;
                  const isAccessible = accessibleSeats.includes(seatId);
                  const isEmpty = emptySeats.includes(seatId);
                  const isUnavailable = unavailableSeats.includes(seatId);

                  if (isEmpty) return <div key={seatId} className="empty-seat"></div>;

                  return (
                    <button
                      key={seatId}
                      onClick={() => toggleSeat(seatId)}
                      disabled={isUnavailable}
                      className="seat-button"
                      style={{
                        backgroundColor: getSeatColor(seatId),
                        border: `2px solid ${getSeatBorder(seatId)}`,
                        color: '#3971eaff'
                      }}
                    >
                      {isAccessible ? '♿' : ''}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="seat-column-numbers">
            <div className="seat-row-label"></div>
            {COLS.map(col => (
              <div key={col} className="seat-column-number">{col}</div>
            ))}
          </div>
        </div>

        {/* Legend + Selected Seats + Confirm */}
        <div className="seat-legend-section">
          <div className="legend-item">
            <div className="legend-icon" style={{ 
              backgroundColor: 'white', 
              border: '2px solid #3971eaff',
              color: '#3971eaff',
              fontWeight: 'bold'
            }}>♿</div>
            <span className="legend-text">Accessible Seating</span>
          </div>

          <div className="legend-item">
            <div className="legend-icon" style={{ 
              backgroundColor: '#6b7280', 
              border: '2px solid #4b5563'
            }}></div>
            <span className="legend-text">Unavailable</span>
          </div>

          <div className="legend-item">
            <div className="legend-icon" style={{ 
              backgroundColor: '#84d9a3ff', 
              border: '2px solid #84d9a3ff'
            }}></div>
            <span className="legend-text">Selected</span>
          </div>

          <div className="selected-seats-box">
            <p className="selected-seats-label">
              Seat(s) Selected: {selectedSeats.length} / {maxSeats}
            </p>
            <p className="selected-seats-value">
              {selectedSeats.length > 0 ? sortSeats([...selectedSeats]).join(', ') : 'None'}
            </p>
          </div>

          <button onClick={handleConfirm} className="confirm-button">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}