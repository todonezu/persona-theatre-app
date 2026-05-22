# Persona — Theatre Seat Reservation App

A mobile application for booking theatre seats, built as part of the CN6035 Mobile & Distributed Systems course.

Μια εφαρμογή για κινητά για κράτηση θέσεων θεάτρου, που δημιουργήθηκε στο πλαίσιο του μαθήματος CN6035 Mobile & Distributed Systems

## Description

Persona is a React Native mobile app that allows users to browse theatrical shows, select showtimes, and reserve seats. The app features user authentication with JWT tokens, a real-time seat map, and a full booking management system.

Το Persona είναι μια εφαρμογή React Native για κινητά που επιτρέπει στους χρήστες να περιηγούνται σε θεατρικές παραστάσεις, να επιλέγουν ώρες προβολής και να κάνουν κρατήσεις θέσεων. Η εφαρμογή διαθέτει έλεγχο ταυτότητας χρήστη με JWT tokens, χάρτη θέσεων σε πραγματικό χρόνο και ένα πλήρες σύστημα διαχείρισης κρατήσεων.


## Technologies Used

- **Frontend**: React Native (Expo)
- **Backend**: Node.js + Express
- **Database**: MariaDB
- **Authentication**: JWT (JSON Web Tokens)
- **API Testing**: Thunder Client

## Project Structure
persona-theatre-app/
├── backend/          # Node.js REST API
│   ├── controllers/  # Business logic
│   ├── middleware/   # JWT authentication
│   ├── routes/       # API endpoints
│   ├── db.js         # Database connection
│   └── server.js     # Entry point
└── frontend/         # React Native app
    ├── screens/      # App screens
    ├── api.js        # API calls
    └── App.js        # Navigation setup

## Installation

### Prerequisites
- Node.js (v20 or higher)
- MariaDB
- Expo Go app on your phone

### Database Setup
1. Open DBeaver and connect to MariaDB
2. Open a new SQL Script
3. Open the `database.sql` file from this repository
4. Run it with **Alt + X**

This will automatically create the `theatre_db` database, all tables, and insert all sample data including theatres, shows, showtimes and seats.

### Backend Setup
1. Clone the repository:
git clone https://github.com/todonezu/persona-theatre-app.git

2. Navigate to the backend folder:
cd persona-theatre-app/backend

3. Install dependencies:
npm install

4. Create a `.env` file with your database credentials:
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=theatre_db
JWT_SECRET=supersecretkey123
PORT=3000

5. Start the backend server:
node server.js


### Frontend Setup
1. Navigate to the frontend folder:
cd persona-theatre-app/frontend

2. Install dependencies:
npm install

3. Update the API_URL in `api.js` with your computer's IP address

4. Start the app: npx expo start

5. Scan the QR code with Expo Go on your phone

## Features

- **User Registration & Login** — Secure authentication with JWT tokens
- **Browse Shows** — View all available theatrical shows with search and filter
- **Show Details** — View show information and select a showtime
- **Seat Booking** — Interactive theatre seat map with multiple seat selection
- **Booking History** — View upcoming and past bookings in your profile
- **Cancel Bookings** — Cancel upcoming reservations

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /auth/register | Register new user | No |
| POST | /auth/login | Login and get JWT token | No |
| GET | /theatres | Get all theatres | No |
| GET | /shows | Get all shows | No |
| GET | /showtimes | Get showtimes for a show | No |
| GET | /seats | Get seats for a showtime | No |
| POST | /reservations | Create a reservation | Yes |
| GET | /reservations/user | Get user's reservations | Yes |
| DELETE | /reservations/:id | Cancel a reservation | Yes |