# CineNova Movie Theatre Booking System

## Project Overview

CineNova is a comprehensive movie theatre ticket booking system built with React and Vite. The application allows users to browse movies, select showtimes, choose seats, and complete ticket purchases through an intuitive multi-step booking flow.

## Live Version 

https://cthomson20.github.io/movie_theatre_system/

## Implemented Features & Functions

### 1. **Home Page (Movie Browsing)**
   - **Movie Grid Display:** Shows 13 movies with posters, titles, ratings, genres, and durations
   - **Advanced Filtering System:**
     - Date filter with calendar interface
     - Rating filter (G, PG, PG-13, 14A, R)
     - Genre filter (Action, Comedy, Drama, Horror, Thriller, Sci-Fi, Animation)
     - Language filter (English, French)
     - Theatre location filter (Market Mall, Downtown, NE, Macleod Trail)
   - **Movie Selection:** Click on any movie poster/card to view details
   - **Responsive Design:** Grid adapts to screen size

### 2. **Movie Details Modal**
   - Displays detailed movie information
   - Shows available theatres and dates
   - "Book Tickets" button to proceed with booking
   - "View Locations" link to see theatre information

### 3. **Theatre Locations Page**
   - Lists all 4 CineNova locations with addresses and phone numbers
   - Interactive cards for each theatre location
   - Navigation back to home page

### 4. **Showtime Selection Page**
   - Theatre location selector
   - Date picker with calendar
   - Ticket format selection (General, VIP, Ultra AVX Dolby Atmos)
   - Showtime grid with multiple time slots
   - Seat preview functionality for each showtime
   - Real-time availability display

### 5. **Seat Preview Modal**
   - Visual seat map showing 8 rows × 12 columns
   - Color-coded seat status:
     - Blue: Availiable
     - Gray: Empty/no seat positions
     - Accessibility Logo: Accessibility seating 
   - "Book These Tickets" button to proceed

### 6. **Ticket & Seat Selection Page**
   - **Ticket Type Selection:**
     - General tickets: $20
     - Child tickets: $15
     - Senior tickets: $10
   - **Interactive Seat Map:**
     - Click seats to select/deselect
     - Automatic enforcement of ticket quantity limits
     - Visual feedback for selected seats
     - Accessible seating indicators
   - **Booking Summary:**
     - Movie title, theatre, date, time, format
     - Ticket breakdown with prices
     - Selected seat numbers
     - Running total calculation
   - **Back button** to modify showtime selection

### 7. **Payment Page**
   - **Order Summary:**
     - Complete booking details
     - Itemized ticket pricing
     - Total amount due
   - **Payment Form Fields:**
     - Card number (16 digits with auto-formatting)
     - Expiry date (MM/YY format)
     - CVV (3 digits)
     - Cardholder name
     - Email for confirmation
   - **Form Validation:**
     - Required field checking
     - Format validation for card details
     - Real-time error messages
   - **Navigation:** Back button to modify seat selection

### 8. **Confirmation Page**
   - **Booking Confirmation Display:**
     - Confirmation number
     - Complete booking details
     - QR code placeholder for ticket scanning
   - **Post-Purchase Actions:**
     - Print tickets functionality
     - Share tickets via email or phone number
     - Return to home page to browse more movies
   - **Ticket Sharing:**
     - Email or phone number input
     - Validation for contact information
     - Confirmation of share action

### 9. **State Management**
   - **BookingContext:** Global state management using React Context API
   - **Session Storage:** Persists booking data across page refreshes
   - **State Persistence:** Maintains user selections throughout the booking flow

### 10. **Utility Functions**
   - Date formatting utilities
   - Dynamic showtime generation (supports 5-30 days)
   - Seat availability management
   - Price calculation engine


## Walkthrough Instructions

On the home page, select the movie of your choice. You can narrow down the options using filters such as date (from December 7th, 2025 - January 5th, 2026), movie rating, genre, language, and theatre location. After choosing a movie, click the movie offering to begin booking tickets.

Select the **Book Tickets** button. On the next page, choose the theatre you want to watch the movie in, the day you prefer, your ticket type (General, VIP, or Ultra AVX Dolby Atmos), and the specific showtime you want. You can also preview seats for all showtimes to view available seats and accessible seating.

After selecting your showtime, choose your ticket types (General, Child, Senior) and the quantity for each. On this same page, select your seats using the seat selection map.

You will then be taken to the payment page, where a summary of your order will be displayed along with fields to enter your payment details (card number, expiry date, CVV, cardholder name, and an email for purchase confirmation). Finally, you will be taken to the confirmation page to confirm your purchase, with an option to print your tickets. You can also share your tickets to other emails or phone numbers or choose to continue browsing the site.

## Data Entry Breakdown

On the home page, no typed data is required. The user makes a required selection, which is their movie choice, and can optionally apply filters (date, rating, genre, language, theatre).

After selecting a movie, there is a popup where the user must click **Book Tickets**. There is no typed data for this popup.

On the showtime selection page, no typed data is required. The user selects the theatre location, date, ticket type, showtime, and can preview the seat map.

On the ticket and seat selection page, no typed data is required. The user selects ticket types, the quantity for each ticket type, and selects their desired seats on the seat map.

On the payment page, typed data is required. The user must enter their card number, expiry date, CVV, cardholder name, and email for confirmation.

On the confirmation page, there is no required typed data. If the user chooses to share their tickets, they must enter an email or phone number.

## Group Members:
Jessica Thomas 
Christopher Thomson 
Efe Udolu-Joshua 
Amira Wishah 
Yuge Zhang 
