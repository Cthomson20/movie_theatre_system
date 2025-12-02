import { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

const STORAGE_KEY = 'cinenova_booking_data';

const defaultBookingData = {
  movie: null,
  theatre: null,
  date: null,
  time: null,
  format: null,
  tickets: { 
    general: 1, 
    child: 0, 
    senior: 0 
  },
  seats: [],
  total: 0,
  datesForMovie: []
};

// Load from sessionStorage
const loadBookingData = () => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      console.log('Loaded booking data from sessionStorage:', stored);
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading booking data:', error);
  }
  return defaultBookingData;
};

export function BookingProvider({ children }) {
  const [bookingData, setBookingData] = useState(loadBookingData);

  // Save to sessionStorage whenever bookingData changes
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bookingData));
    } catch (error) {
      console.error('Error saving booking data:', error);
    }
  }, [bookingData]);

  const updateBooking = (updates) => {
    setBookingData(prev => ({ ...prev, ...updates }));
  };

  const clearBooking = () => {
    setBookingData(defaultBookingData);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBooking, clearBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};
