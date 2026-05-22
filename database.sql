-- ================================================
-- Persona Theatre Reservation App
-- Database Setup Script
-- ================================================

-- Create and select the database
CREATE DATABASE IF NOT EXISTS theatre_db;
USE theatre_db;

-- ================================================
-- CREATE TABLES
-- ================================================

-- Users table - stores registered app users
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Theatres table - stores theatre venues
CREATE TABLE theatres (
  theatre_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(200),
  description TEXT
);

-- Shows table - stores theatrical productions
CREATE TABLE shows (
  show_id INT AUTO_INCREMENT PRIMARY KEY,
  theatre_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  duration INT,
  age_rating VARCHAR(10),
  FOREIGN KEY (theatre_id) REFERENCES theatres(theatre_id)
);

-- Showtimes table - stores available dates and times for each show
CREATE TABLE showtimes (
  showtime_id INT AUTO_INCREMENT PRIMARY KEY,
  show_id INT NOT NULL,
  show_datetime DATETIME NOT NULL,
  FOREIGN KEY (show_id) REFERENCES shows(show_id)
);

-- Seats table - stores individual seats for each showtime
CREATE TABLE seats (
  seat_id INT AUTO_INCREMENT PRIMARY KEY,
  showtime_id INT NOT NULL,
  seat_number VARCHAR(10) NOT NULL,
  category VARCHAR(50),
  price DECIMAL(6,2),
  is_available BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (showtime_id) REFERENCES showtimes(showtime_id)
);

-- Reservations table - stores seat bookings made by users
CREATE TABLE reservations (
  reservation_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  seat_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active',
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (seat_id) REFERENCES seats(seat_id)
);

-- ================================================
-- SAMPLE DATA
-- ================================================

-- Theatres
INSERT INTO theatres (name, location, description) VALUES
('National Theatre', 'Athens, Greece', 'Main national theatre'),
('Thessaloniki Arts Centre', 'Thessaloniki, Greece', 'City arts venue');

-- Shows
INSERT INTO shows (theatre_id, title, description, duration, age_rating) VALUES
(1, 'Demon Slayer: The Stage', 'Live stage adaptation of the hit anime series', 150, '13+'),
(1, 'Attack on Titan: Live Experience', 'Theatrical retelling of the Fall of Shiganshina arc', 170, '15+'),
(2, 'Avatar: The Last Airbender - Live on Stage', 'Aang and friends journey to save the world in this stunning live production', 160, 'All ages'),
(2, 'Studio Ghibli: Spirited Away on Stage', 'Chihiro''s magical journey through the spirit world brought to life on stage', 155, 'All ages');

-- Showtimes
INSERT INTO showtimes (show_id, show_datetime) VALUES
(1, '2026-06-01 20:00:00'),
(1, '2026-06-02 20:00:00'),
(2, '2026-06-05 19:00:00'),
(2, '2026-06-06 19:00:00'),
(3, '2026-06-08 18:00:00'),
(3, '2026-06-09 18:00:00'),
(4, '2026-06-12 20:00:00'),
(4, '2026-06-13 20:00:00');

-- Seats for showtime 1
INSERT INTO seats (showtime_id, seat_number, category, price) VALUES
(1,'A1','Standard',25.00),(1,'A2','Standard',25.00),(1,'A3','Standard',25.00),(1,'A4','Standard',25.00),(1,'A5','Standard',25.00),(1,'A6','Standard',25.00),(1,'A7','Standard',25.00),(1,'A8','Standard',25.00),(1,'A9','Standard',25.00),(1,'A10','Standard',25.00),
(1,'B1','Standard',25.00),(1,'B2','Standard',25.00),(1,'B3','Standard',25.00),(1,'B4','Standard',25.00),(1,'B5','Standard',25.00),(1,'B6','Standard',25.00),(1,'B7','Standard',25.00),(1,'B8','Standard',25.00),(1,'B9','Standard',25.00),(1,'B10','Standard',25.00),
(1,'C1','Standard',25.00),(1,'C2','Standard',25.00),(1,'C3','Standard',25.00),(1,'C4','Standard',25.00),(1,'C5','Standard',25.00),(1,'C6','Standard',25.00),(1,'C7','Standard',25.00),(1,'C8','Standard',25.00),(1,'C9','Standard',25.00),(1,'C10','Standard',25.00),
(1,'D1','Standard',25.00),(1,'D2','Standard',25.00),(1,'D3','Standard',25.00),(1,'D4','Standard',25.00),(1,'D5','Standard',25.00),(1,'D6','Standard',25.00),(1,'D7','Standard',25.00),(1,'D8','Standard',25.00),(1,'D9','Standard',25.00),(1,'D10','Standard',25.00),
(1,'E1','Standard',25.00),(1,'E2','Standard',25.00),(1,'E3','Standard',25.00),(1,'E4','Standard',25.00),(1,'E5','Standard',25.00),(1,'E6','Standard',25.00),(1,'E7','Standard',25.00),(1,'E8','Standard',25.00),(1,'E9','Standard',25.00),(1,'E10','Standard',25.00),
(1,'F1','Standard',25.00),(1,'F2','Standard',25.00),(1,'F3','Standard',25.00),(1,'F4','Standard',25.00),(1,'F5','Standard',25.00),(1,'F6','Standard',25.00),(1,'F7','Standard',25.00),(1,'F8','Standard',25.00),(1,'F9','Standard',25.00),(1,'F10','Standard',25.00),
(1,'G1','Standard',25.00),(1,'G2','Standard',25.00),(1,'G3','Standard',25.00),(1,'G4','Standard',25.00),(1,'G5','Standard',25.00),(1,'G6','Standard',25.00),(1,'G7','Standard',25.00),(1,'G8','Standard',25.00),(1,'G9','Standard',25.00),(1,'G10','Standard',25.00),
(1,'H1','Standard',25.00),(1,'H2','Standard',25.00),(1,'H3','Standard',25.00),(1,'H4','Standard',25.00),(1,'H5','Standard',25.00),(1,'H6','Standard',25.00),(1,'H7','Standard',25.00),(1,'H8','Standard',25.00),(1,'H9','Standard',25.00),(1,'H10','Standard',25.00),
(1,'I1','Standard',25.00),(1,'I2','Standard',25.00),(1,'I3','Standard',25.00),(1,'I4','Standard',25.00),(1,'I5','Standard',25.00),(1,'I6','Standard',25.00),(1,'I7','Standard',25.00),(1,'I8','Standard',25.00),(1,'I9','Standard',25.00),(1,'I10','Standard',25.00),
(1,'J1','Standard',25.00),(1,'J2','Standard',25.00),(1,'J3','Standard',25.00),(1,'J4','Standard',25.00),(1,'J5','Standard',25.00),(1,'J6','Standard',25.00),(1,'J7','Standard',25.00),(1,'J8','Standard',25.00),(1,'J9','Standard',25.00),(1,'J10','Standard',25.00);

-- Seats for showtime 2
INSERT INTO seats (showtime_id, seat_number, category, price) VALUES
(2,'A1','Standard',25.00),(2,'A2','Standard',25.00),(2,'A3','Standard',25.00),(2,'A4','Standard',25.00),(2,'A5','Standard',25.00),(2,'A6','Standard',25.00),(2,'A7','Standard',25.00),(2,'A8','Standard',25.00),(2,'A9','Standard',25.00),(2,'A10','Standard',25.00),
(2,'B1','Standard',25.00),(2,'B2','Standard',25.00),(2,'B3','Standard',25.00),(2,'B4','Standard',25.00),(2,'B5','Standard',25.00),(2,'B6','Standard',25.00),(2,'B7','Standard',25.00),(2,'B8','Standard',25.00),(2,'B9','Standard',25.00),(2,'B10','Standard',25.00),
(2,'C1','Standard',25.00),(2,'C2','Standard',25.00),(2,'C3','Standard',25.00),(2,'C4','Standard',25.00),(2,'C5','Standard',25.00),(2,'C6','Standard',25.00),(2,'C7','Standard',25.00),(2,'C8','Standard',25.00),(2,'C9','Standard',25.00),(2,'C10','Standard',25.00),
(2,'D1','Standard',25.00),(2,'D2','Standard',25.00),(2,'D3','Standard',25.00),(2,'D4','Standard',25.00),(2,'D5','Standard',25.00),(2,'D6','Standard',25.00),(2,'D7','Standard',25.00),(2,'D8','Standard',25.00),(2,'D9','Standard',25.00),(2,'D10','Standard',25.00),
(2,'E1','Standard',25.00),(2,'E2','Standard',25.00),(2,'E3','Standard',25.00),(2,'E4','Standard',25.00),(2,'E5','Standard',25.00),(2,'E6','Standard',25.00),(2,'E7','Standard',25.00),(2,'E8','Standard',25.00),(2,'E9','Standard',25.00),(2,'E10','Standard',25.00),
(2,'F1','Standard',25.00),(2,'F2','Standard',25.00),(2,'F3','Standard',25.00),(2,'F4','Standard',25.00),(2,'F5','Standard',25.00),(2,'F6','Standard',25.00),(2,'F7','Standard',25.00),(2,'F8','Standard',25.00),(2,'F9','Standard',25.00),(2,'F10','Standard',25.00),
(2,'G1','Standard',25.00),(2,'G2','Standard',25.00),(2,'G3','Standard',25.00),(2,'G4','Standard',25.00),(2,'G5','Standard',25.00),(2,'G6','Standard',25.00),(2,'G7','Standard',25.00),(2,'G8','Standard',25.00),(2,'G9','Standard',25.00),(2,'G10','Standard',25.00),
(2,'H1','Standard',25.00),(2,'H2','Standard',25.00),(2,'H3','Standard',25.00),(2,'H4','Standard',25.00),(2,'H5','Standard',25.00),(2,'H6','Standard',25.00),(2,'H7','Standard',25.00),(2,'H8','Standard',25.00),(2,'H9','Standard',25.00),(2,'H10','Standard',25.00),
(2,'I1','Standard',25.00),(2,'I2','Standard',25.00),(2,'I3','Standard',25.00),(2,'I4','Standard',25.00),(2,'I5','Standard',25.00),(2,'I6','Standard',25.00),(2,'I7','Standard',25.00),(2,'I8','Standard',25.00),(2,'I9','Standard',25.00),(2,'I10','Standard',25.00),
(2,'J1','Standard',25.00),(2,'J2','Standard',25.00),(2,'J3','Standard',25.00),(2,'J4','Standard',25.00),(2,'J5','Standard',25.00),(2,'J6','Standard',25.00),(2,'J7','Standard',25.00),(2,'J8','Standard',25.00),(2,'J9','Standard',25.00),(2,'J10','Standard',25.00);

-- Seats for showtime 3
INSERT INTO seats (showtime_id, seat_number, category, price) VALUES
(3,'A1','Standard',25.00),(3,'A2','Standard',25.00),(3,'A3','Standard',25.00),(3,'A4','Standard',25.00),(3,'A5','Standard',25.00),(3,'A6','Standard',25.00),(3,'A7','Standard',25.00),(3,'A8','Standard',25.00),(3,'A9','Standard',25.00),(3,'A10','Standard',25.00),
(3,'B1','Standard',25.00),(3,'B2','Standard',25.00),(3,'B3','Standard',25.00),(3,'B4','Standard',25.00),(3,'B5','Standard',25.00),(3,'B6','Standard',25.00),(3,'B7','Standard',25.00),(3,'B8','Standard',25.00),(3,'B9','Standard',25.00),(3,'B10','Standard',25.00),
(3,'C1','Standard',25.00),(3,'C2','Standard',25.00),(3,'C3','Standard',25.00),(3,'C4','Standard',25.00),(3,'C5','Standard',25.00),(3,'C6','Standard',25.00),(3,'C7','Standard',25.00),(3,'C8','Standard',25.00),(3,'C9','Standard',25.00),(3,'C10','Standard',25.00),
(3,'D1','Standard',25.00),(3,'D2','Standard',25.00),(3,'D3','Standard',25.00),(3,'D4','Standard',25.00),(3,'D5','Standard',25.00),(3,'D6','Standard',25.00),(3,'D7','Standard',25.00),(3,'D8','Standard',25.00),(3,'D9','Standard',25.00),(3,'D10','Standard',25.00),
(3,'E1','Standard',25.00),(3,'E2','Standard',25.00),(3,'E3','Standard',25.00),(3,'E4','Standard',25.00),(3,'E5','Standard',25.00),(3,'E6','Standard',25.00),(3,'E7','Standard',25.00),(3,'E8','Standard',25.00),(3,'E9','Standard',25.00),(3,'E10','Standard',25.00),
(3,'F1','Standard',25.00),(3,'F2','Standard',25.00),(3,'F3','Standard',25.00),(3,'F4','Standard',25.00),(3,'F5','Standard',25.00),(3,'F6','Standard',25.00),(3,'F7','Standard',25.00),(3,'F8','Standard',25.00),(3,'F9','Standard',25.00),(3,'F10','Standard',25.00),
(3,'G1','Standard',25.00),(3,'G2','Standard',25.00),(3,'G3','Standard',25.00),(3,'G4','Standard',25.00),(3,'G5','Standard',25.00),(3,'G6','Standard',25.00),(3,'G7','Standard',25.00),(3,'G8','Standard',25.00),(3,'G9','Standard',25.00),(3,'G10','Standard',25.00),
(3,'H1','Standard',25.00),(3,'H2','Standard',25.00),(3,'H3','Standard',25.00),(3,'H4','Standard',25.00),(3,'H5','Standard',25.00),(3,'H6','Standard',25.00),(3,'H7','Standard',25.00),(3,'H8','Standard',25.00),(3,'H9','Standard',25.00),(3,'H10','Standard',25.00),
(3,'I1','Standard',25.00),(3,'I2','Standard',25.00),(3,'I3','Standard',25.00),(3,'I4','Standard',25.00),(3,'I5','Standard',25.00),(3,'I6','Standard',25.00),(3,'I7','Standard',25.00),(3,'I8','Standard',25.00),(3,'I9','Standard',25.00),(3,'I10','Standard',25.00),
(3,'J1','Standard',25.00),(3,'J2','Standard',25.00),(3,'J3','Standard',25.00),(3,'J4','Standard',25.00),(3,'J5','Standard',25.00),(3,'J6','Standard',25.00),(3,'J7','Standard',25.00),(3,'J8','Standard',25.00),(3,'J9','Standard',25.00),(3,'J10','Standard',25.00);

-- Seats for showtime 4
INSERT INTO seats (showtime_id, seat_number, category, price) VALUES
(4,'A1','Standard',25.00),(4,'A2','Standard',25.00),(4,'A3','Standard',25.00),(4,'A4','Standard',25.00),(4,'A5','Standard',25.00),(4,'A6','Standard',25.00),(4,'A7','Standard',25.00),(4,'A8','Standard',25.00),(4,'A9','Standard',25.00),(4,'A10','Standard',25.00),
(4,'B1','Standard',25.00),(4,'B2','Standard',25.00),(4,'B3','Standard',25.00),(4,'B4','Standard',25.00),(4,'B5','Standard',25.00),(4,'B6','Standard',25.00),(4,'B7','Standard',25.00),(4,'B8','Standard',25.00),(4,'B9','Standard',25.00),(4,'B10','Standard',25.00),
(4,'C1','Standard',25.00),(4,'C2','Standard',25.00),(4,'C3','Standard',25.00),(4,'C4','Standard',25.00),(4,'C5','Standard',25.00),(4,'C6','Standard',25.00),(4,'C7','Standard',25.00),(4,'C8','Standard',25.00),(4,'C9','Standard',25.00),(4,'C10','Standard',25.00),
(4,'D1','Standard',25.00),(4,'D2','Standard',25.00),(4,'D3','Standard',25.00),(4,'D4','Standard',25.00),(4,'D5','Standard',25.00),(4,'D6','Standard',25.00),(4,'D7','Standard',25.00),(4,'D8','Standard',25.00),(4,'D9','Standard',25.00),(4,'D10','Standard',25.00),
(4,'E1','Standard',25.00),(4,'E2','Standard',25.00),(4,'E3','Standard',25.00),(4,'E4','Standard',25.00),(4,'E5','Standard',25.00),(4,'E6','Standard',25.00),(4,'E7','Standard',25.00),(4,'E8','Standard',25.00),(4,'E9','Standard',25.00),(4,'E10','Standard',25.00),
(4,'F1','Standard',25.00),(4,'F2','Standard',25.00),(4,'F3','Standard',25.00),(4,'F4','Standard',25.00),(4,'F5','Standard',25.00),(4,'F6','Standard',25.00),(4,'F7','Standard',25.00),(4,'F8','Standard',25.00),(4,'F9','Standard',25.00),(4,'F10','Standard',25.00),
(4,'G1','Standard',25.00),(4,'G2','Standard',25.00),(4,'G3','Standard',25.00),(4,'G4','Standard',25.00),(4,'G5','Standard',25.00),(4,'G6','Standard',25.00),(4,'G7','Standard',25.00),(4,'G8','Standard',25.00),(4,'G9','Standard',25.00),(4,'G10','Standard',25.00),
(4,'H1','Standard',25.00),(4,'H2','Standard',25.00),(4,'H3','Standard',25.00),(4,'H4','Standard',25.00),(4,'H5','Standard',25.00),(4,'H6','Standard',25.00),(4,'H7','Standard',25.00),(4,'H8','Standard',25.00),(4,'H9','Standard',25.00),(4,'H10','Standard',25.00),
(4,'I1','Standard',25.00),(4,'I2','Standard',25.00),(4,'I3','Standard',25.00),(4,'I4','Standard',25.00),(4,'I5','Standard',25.00),(4,'I6','Standard',25.00),(4,'I7','Standard',25.00),(4,'I8','Standard',25.00),(4,'I9','Standard',25.00),(4,'I10','Standard',25.00),
(4,'J1','Standard',25.00),(4,'J2','Standard',25.00),(4,'J3','Standard',25.00),(4,'J4','Standard',25.00),(4,'J5','Standard',25.00),(4,'J6','Standard',25.00),(4,'J7','Standard',25.00),(4,'J8','Standard',25.00),(4,'J9','Standard',25.00),(4,'J10','Standard',25.00);

-- Seats for showtime 5
INSERT INTO seats (showtime_id, seat_number, category, price) VALUES
(5,'A1','Standard',25.00),(5,'A2','Standard',25.00),(5,'A3','Standard',25.00),(5,'A4','Standard',25.00),(5,'A5','Standard',25.00),(5,'A6','Standard',25.00),(5,'A7','Standard',25.00),(5,'A8','Standard',25.00),(5,'A9','Standard',25.00),(5,'A10','Standard',25.00),
(5,'B1','Standard',25.00),(5,'B2','Standard',25.00),(5,'B3','Standard',25.00),(5,'B4','Standard',25.00),(5,'B5','Standard',25.00),(5,'B6','Standard',25.00),(5,'B7','Standard',25.00),(5,'B8','Standard',25.00),(5,'B9','Standard',25.00),(5,'B10','Standard',25.00),
(5,'C1','Standard',25.00),(5,'C2','Standard',25.00),(5,'C3','Standard',25.00),(5,'C4','Standard',25.00),(5,'C5','Standard',25.00),(5,'C6','Standard',25.00),(5,'C7','Standard',25.00),(5,'C8','Standard',25.00),(5,'C9','Standard',25.00),(5,'C10','Standard',25.00),
(5,'D1','Standard',25.00),(5,'D2','Standard',25.00),(5,'D3','Standard',25.00),(5,'D4','Standard',25.00),(5,'D5','Standard',25.00),(5,'D6','Standard',25.00),(5,'D7','Standard',25.00),(5,'D8','Standard',25.00),(5,'D9','Standard',25.00),(5,'D10','Standard',25.00),
(5,'E1','Standard',25.00),(5,'E2','Standard',25.00),(5,'E3','Standard',25.00),(5,'E4','Standard',25.00),(5,'E5','Standard',25.00),(5,'E6','Standard',25.00),(5,'E7','Standard',25.00),(5,'E8','Standard',25.00),(5,'E9','Standard',25.00),(5,'E10','Standard',25.00),
(5,'F1','Standard',25.00),(5,'F2','Standard',25.00),(5,'F3','Standard',25.00),(5,'F4','Standard',25.00),(5,'F5','Standard',25.00),(5,'F6','Standard',25.00),(5,'F7','Standard',25.00),(5,'F8','Standard',25.00),(5,'F9','Standard',25.00),(5,'F10','Standard',25.00),
(5,'G1','Standard',25.00),(5,'G2','Standard',25.00),(5,'G3','Standard',25.00),(5,'G4','Standard',25.00),(5,'G5','Standard',25.00),(5,'G6','Standard',25.00),(5,'G7','Standard',25.00),(5,'G8','Standard',25.00),(5,'G9','Standard',25.00),(5,'G10','Standard',25.00),
(5,'H1','Standard',25.00),(5,'H2','Standard',25.00),(5,'H3','Standard',25.00),(5,'H4','Standard',25.00),(5,'H5','Standard',25.00),(5,'H6','Standard',25.00),(5,'H7','Standard',25.00),(5,'H8','Standard',25.00),(5,'H9','Standard',25.00),(5,'H10','Standard',25.00),
(5,'I1','Standard',25.00),(5,'I2','Standard',25.00),(5,'I3','Standard',25.00),(5,'I4','Standard',25.00),(5,'I5','Standard',25.00),(5,'I6','Standard',25.00),(5,'I7','Standard',25.00),(5,'I8','Standard',25.00),(5,'I9','Standard',25.00),(5,'I10','Standard',25.00),
(5,'J1','Standard',25.00),(5,'J2','Standard',25.00),(5,'J3','Standard',25.00),(5,'J4','Standard',25.00),(5,'J5','Standard',25.00),(5,'J6','Standard',25.00),(5,'J7','Standard',25.00),(5,'J8','Standard',25.00),(5,'J9','Standard',25.00),(5,'J10','Standard',25.00);

-- Seats for showtime 6
INSERT INTO seats (showtime_id, seat_number, category, price) VALUES
(6,'A1','Standard',25.00),(6,'A2','Standard',25.00),(6,'A3','Standard',25.00),(6,'A4','Standard',25.00),(6,'A5','Standard',25.00),(6,'A6','Standard',25.00),(6,'A7','Standard',25.00),(6,'A8','Standard',25.00),(6,'A9','Standard',25.00),(6,'A10','Standard',25.00),
(6,'B1','Standard',25.00),(6,'B2','Standard',25.00),(6,'B3','Standard',25.00),(6,'B4','Standard',25.00),(6,'B5','Standard',25.00),(6,'B6','Standard',25.00),(6,'B7','Standard',25.00),(6,'B8','Standard',25.00),(6,'B9','Standard',25.00),(6,'B10','Standard',25.00),
(6,'C1','Standard',25.00),(6,'C2','Standard',25.00),(6,'C3','Standard',25.00),(6,'C4','Standard',25.00),(6,'C5','Standard',25.00),(6,'C6','Standard',25.00),(6,'C7','Standard',25.00),(6,'C8','Standard',25.00),(6,'C9','Standard',25.00),(6,'C10','Standard',25.00),
(6,'D1','Standard',25.00),(6,'D2','Standard',25.00),(6,'D3','Standard',25.00),(6,'D4','Standard',25.00),(6,'D5','Standard',25.00),(6,'D6','Standard',25.00),(6,'D7','Standard',25.00),(6,'D8','Standard',25.00),(6,'D9','Standard',25.00),(6,'D10','Standard',25.00),
(6,'E1','Standard',25.00),(6,'E2','Standard',25.00),(6,'E3','Standard',25.00),(6,'E4','Standard',25.00),(6,'E5','Standard',25.00),(6,'E6','Standard',25.00),(6,'E7','Standard',25.00),(6,'E8','Standard',25.00),(6,'E9','Standard',25.00),(6,'E10','Standard',25.00),
(6,'F1','Standard',25.00),(6,'F2','Standard',25.00),(6,'F3','Standard',25.00),(6,'F4','Standard',25.00),(6,'F5','Standard',25.00),(6,'F6','Standard',25.00),(6,'F7','Standard',25.00),(6,'F8','Standard',25.00),(6,'F9','Standard',25.00),(6,'F10','Standard',25.00),
(6,'G1','Standard',25.00),(6,'G2','Standard',25.00),(6,'G3','Standard',25.00),(6,'G4','Standard',25.00),(6,'G5','Standard',25.00),(6,'G6','Standard',25.00),(6,'G7','Standard',25.00),(6,'G8','Standard',25.00),(6,'G9','Standard',25.00),(6,'G10','Standard',25.00),
(6,'H1','Standard',25.00),(6,'H2','Standard',25.00),(6,'H3','Standard',25.00),(6,'H4','Standard',25.00),(6,'H5','Standard',25.00),(6,'H6','Standard',25.00),(6,'H7','Standard',25.00),(6,'H8','Standard',25.00),(6,'H9','Standard',25.00),(6,'H10','Standard',25.00),
(6,'I1','Standard',25.00),(6,'I2','Standard',25.00),(6,'I3','Standard',25.00),(6,'I4','Standard',25.00),(6,'I5','Standard',25.00),(6,'I6','Standard',25.00),(6,'I7','Standard',25.00),(6,'I8','Standard',25.00),(6,'I9','Standard',25.00),(6,'I10','Standard',25.00),
(6,'J1','Standard',25.00),(6,'J2','Standard',25.00),(6,'J3','Standard',25.00),(6,'J4','Standard',25.00),(6,'J5','Standard',25.00),(6,'J6','Standard',25.00),(6,'J7','Standard',25.00),(6,'J8','Standard',25.00),(6,'J9','Standard',25.00),(6,'J10','Standard',25.00);

-- Seats for showtime 7
INSERT INTO seats (showtime_id, seat_number, category, price) VALUES
(7,'A1','Standard',25.00),(7,'A2','Standard',25.00),(7,'A3','Standard',25.00),(7,'A4','Standard',25.00),(7,'A5','Standard',25.00),(7,'A6','Standard',25.00),(7,'A7','Standard',25.00),(7,'A8','Standard',25.00),(7,'A9','Standard',25.00),(7,'A10','Standard',25.00),
(7,'B1','Standard',25.00),(7,'B2','Standard',25.00),(7,'B3','Standard',25.00),(7,'B4','Standard',25.00),(7,'B5','Standard',25.00),(7,'B6','Standard',25.00),(7,'B7','Standard',25.00),(7,'B8','Standard',25.00),(7,'B9','Standard',25.00),(7,'B10','Standard',25.00),
(7,'C1','Standard',25.00),(7,'C2','Standard',25.00),(7,'C3','Standard',25.00),(7,'C4','Standard',25.00),(7,'C5','Standard',25.00),(7,'C6','Standard',25.00),(7,'C7','Standard',25.00),(7,'C8','Standard',25.00),(7,'C9','Standard',25.00),(7,'C10','Standard',25.00),
(7,'D1','Standard',25.00),(7,'D2','Standard',25.00),(7,'D3','Standard',25.00),(7,'D4','Standard',25.00),(7,'D5','Standard',25.00),(7,'D6','Standard',25.00),(7,'D7','Standard',25.00),(7,'D8','Standard',25.00),(7,'D9','Standard',25.00),(7,'D10','Standard',25.00),
(7,'E1','Standard',25.00),(7,'E2','Standard',25.00),(7,'E3','Standard',25.00),(7,'E4','Standard',25.00),(7,'E5','Standard',25.00),(7,'E6','Standard',25.00),(7,'E7','Standard',25.00),(7,'E8','Standard',25.00),(7,'E9','Standard',25.00),(7,'E10','Standard',25.00),
(7,'F1','Standard',25.00),(7,'F2','Standard',25.00),(7,'F3','Standard',25.00),(7,'F4','Standard',25.00),(7,'F5','Standard',25.00),(7,'F6','Standard',25.00),(7,'F7','Standard',25.00),(7,'F8','Standard',25.00),(7,'F9','Standard',25.00),(7,'F10','Standard',25.00),
(7,'G1','Standard',25.00),(7,'G2','Standard',25.00),(7,'G3','Standard',25.00),(7,'G4','Standard',25.00),(7,'G5','Standard',25.00),(7,'G6','Standard',25.00),(7,'G7','Standard',25.00),(7,'G8','Standard',25.00),(7,'G9','Standard',25.00),(7,'G10','Standard',25.00),
(7,'H1','Standard',25.00),(7,'H2','Standard',25.00),(7,'H3','Standard',25.00),(7,'H4','Standard',25.00),(7,'H5','Standard',25.00),(7,'H6','Standard',25.00),(7,'H7','Standard',25.00),(7,'H8','Standard',25.00),(7,'H9','Standard',25.00),(7,'H10','Standard',25.00),
(7,'I1','Standard',25.00),(7,'I2','Standard',25.00),(7,'I3','Standard',25.00),(7,'I4','Standard',25.00),(7,'I5','Standard',25.00),(7,'I6','Standard',25.00),(7,'I7','Standard',25.00),(7,'I8','Standard',25.00),(7,'I9','Standard',25.00),(7,'I10','Standard',25.00),
(7,'J1','Standard',25.00),(7,'J2','Standard',25.00),(7,'J3','Standard',25.00),(7,'J4','Standard',25.00),(7,'J5','Standard',25.00),(7,'J6','Standard',25.00),(7,'J7','Standard',25.00),(7,'J8','Standard',25.00),(7,'J9','Standard',25.00),(7,'J10','Standard',25.00);

-- Seats for showtime 8
INSERT INTO seats (showtime_id, seat_number, category, price) VALUES
(8,'A1','Standard',25.00),(8,'A2','Standard',25.00),(8,'A3','Standard',25.00),(8,'A4','Standard',25.00),(8,'A5','Standard',25.00),(8,'A6','Standard',25.00),(8,'A7','Standard',25.00),(8,'A8','Standard',25.00),(8,'A9','Standard',25.00),(8,'A10','Standard',25.00),
(8,'B1','Standard',25.00),(8,'B2','Standard',25.00),(8,'B3','Standard',25.00),(8,'B4','Standard',25.00),(8,'B5','Standard',25.00),(8,'B6','Standard',25.00),(8,'B7','Standard',25.00),(8,'B8','Standard',25.00),(8,'B9','Standard',25.00),(8,'B10','Standard',25.00),
(8,'C1','Standard',25.00),(8,'C2','Standard',25.00),(8,'C3','Standard',25.00),(8,'C4','Standard',25.00),(8,'C5','Standard',25.00),(8,'C6','Standard',25.00),(8,'C7','Standard',25.00),(8,'C8','Standard',25.00),(8,'C9','Standard',25.00),(8,'C10','Standard',25.00),
(8,'D1','Standard',25.00),(8,'D2','Standard',25.00),(8,'D3','Standard',25.00),(8,'D4','Standard',25.00),(8,'D5','Standard',25.00),(8,'D6','Standard',25.00),(8,'D7','Standard',25.00),(8,'D8','Standard',25.00),(8,'D9','Standard',25.00),(8,'D10','Standard',25.00),
(8,'E1','Standard',25.00),(8,'E2','Standard',25.00),(8,'E3','Standard',25.00),(8,'E4','Standard',25.00),(8,'E5','Standard',25.00),(8,'E6','Standard',25.00),(8,'E7','Standard',25.00),(8,'E8','Standard',25.00),(8,'E9','Standard',25.00),(8,'E10','Standard',25.00),
(8,'F1','Standard',25.00),(8,'F2','Standard',25.00),(8,'F3','Standard',25.00),(8,'F4','Standard',25.00),(8,'F5','Standard',25.00),(8,'F6','Standard',25.00),(8,'F7','Standard',25.00),(8,'F8','Standard',25.00),(8,'F9','Standard',25.00),(8,'F10','Standard',25.00),
(8,'G1','Standard',25.00),(8,'G2','Standard',25.00),(8,'G3','Standard',25.00),(8,'G4','Standard',25.00),(8,'G5','Standard',25.00),(8,'G6','Standard',25.00),(8,'G7','Standard',25.00),(8,'G8','Standard',25.00),(8,'G9','Standard',25.00),(8,'G10','Standard',25.00),
(8,'H1','Standard',25.00),(8,'H2','Standard',25.00),(8,'H3','Standard',25.00),(8,'H4','Standard',25.00),(8,'H5','Standard',25.00),(8,'H6','Standard',25.00),(8,'H7','Standard',25.00),(8,'H8','Standard',25.00),(8,'H9','Standard',25.00),(8,'H10','Standard',25.00),
(8,'I1','Standard',25.00),(8,'I2','Standard',25.00),(8,'I3','Standard',25.00),(8,'I4','Standard',25.00),(8,'I5','Standard',25.00),(8,'I6','Standard',25.00),(8,'I7','Standard',25.00),(8,'I8','Standard',25.00),(8,'I9','Standard',25.00),(8,'I10','Standard',25.00),
(8,'J1','Standard',25.00),(8,'J2','Standard',25.00),(8,'J3','Standard',25.00),(8,'J4','Standard',25.00),(8,'J5','Standard',25.00),(8,'J6','Standard',25.00),(8,'J7','Standard',25.00),(8,'J8','Standard',25.00),(8,'J9','Standard',25.00),(8,'J10','Standard',25.00);