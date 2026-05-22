// API Configuration File
// This file handles all communication between the React Native app and the backend
// Instead of writing API calls in every screen, we define them all here
// and import them wherever needed

import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Base URL of the backend server
const API_URL = 'http://192.168.1.8:3000';

const api = axios.create({
  baseURL: API_URL,
});

// Automatically attach token to every request
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const register = (name, email, password) =>
  api.post('/auth/register', { name, email, password });

export const login = (email, password) =>
  api.post('/auth/login', { email, password });

// Theatres endpoints
export const getTheatres = () => api.get('/theatres');

// Shows endpoints
export const getShows = (theatreId, title) =>
  api.get('/shows', { params: { theatreId, title } });

export const getShowById = (id) => api.get(`/shows/${id}`);

// Showtimes endpoints
export const getShowtimes = (showId) =>
  api.get('/showtimes', { params: { showId } });

// Seats endpoints
export const getSeats = (showtimeId) =>
  api.get('/seats', { params: { showtimeId } });

// Reservations endpoints
export const createReservation = (seat_id) =>
  api.post('/reservations', { seat_id });

export const getUserReservations = () => api.get('/reservations/user');

export const cancelReservation = (id) => api.delete(`/reservations/${id}`);