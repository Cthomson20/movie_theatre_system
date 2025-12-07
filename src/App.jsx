// App.jsx
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import HomePage from './pages/HomePage'
import ConfirmationPage1 from './pages/ConfirmationPage1'
import ConfirmationPage2 from './pages/ConfirmationPage2'
import PaymentPage from './pages/PaymentPage'
import ShowtimesPage from './pages/ShowtimesPage'
import TicketSelectionPage from './pages/TicketSelectionPage'
import SeatPreviewPage from './pages/SeatPreviewPage'
import LocationsPage from './pages/LocationsPage';

function App() {

  return (
    <BookingProvider>
      <Router basename="/movie_theatre_system/">
        <Routes>
          <Route path="/" element={<HomePage/>} />        
          <Route path="/showtimes" element={<ShowtimesPage />} />
          <Route path="/seat-preview" element={<SeatPreviewPage />} />
          <Route path="/ticket-selection" element={<TicketSelectionPage />} />
          <Route path="/confirmation1" element={<ConfirmationPage1 />} />
          <Route path="/confirmation2" element={<ConfirmationPage2 />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/locations" element={<LocationsPage />} />
        </Routes>
      </Router>
    </BookingProvider>
  )
}

export default App