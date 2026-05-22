// Profile Screen
// Displays the logged in user's profile and booking history
// Shows upcoming bookings with a cancel option
// Shows past and cancelled bookings in a greyed out section
// Handles logout by clearing stored credentials

import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert, ScrollView
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { getUserReservations, cancelReservation } from '../api';

export default function ProfileScreen({ navigation, setIsLoggedIn }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Load profile data when the screen opens
  useEffect(() => {
    loadProfile();
  }, []);

  // Fetch the user's name and their reservations
  const loadProfile = async () => {
    try {
      const storedName = await SecureStore.getItemAsync('name');
      setName(storedName || 'User');
      const response = await getUserReservations();
      setReservations(response.data);
    } catch (error) {
      Alert.alert('Error', 'Could not load profile');
    }
    setLoading(false);
  };

  // Handle cancelling a reservation
  const handleCancel = (reservationId) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              await cancelReservation(reservationId);
              setReservations(prev =>
                prev.filter(r => r.reservation_id !== reservationId)
              );
              Alert.alert('Success', 'Booking cancelled successfully');
            } catch (error) {
              Alert.alert('Error', 'Could not cancel booking');
            }
          }
        }
      ]
    );
  };

  // Handle logging out
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await SecureStore.deleteItemAsync('token');
            await SecureStore.deleteItemAsync('user_id');
            await SecureStore.deleteItemAsync('name');
          setIsLoggedIn(false);
          }
        }
      ]
    );
  };

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Split reservations into upcoming and past based on show date and status
  const upcomingReservations = reservations.filter(r =>
    new Date(r.show_datetime) > new Date() && r.status === 'active'
  );

  const pastReservations = reservations.filter(r =>
    new Date(r.show_datetime) <= new Date() || r.status === 'cancelled'
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.reservationCount}>
          {upcomingReservations.length} upcoming booking{upcomingReservations.length !== 1 ? 's' : ''}
        </Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#e91e8c" style={{ marginTop: 40 }} />
      ) : (
        <>
          {/* Upcoming Bookings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
            {upcomingReservations.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyEmoji}>🎭</Text>
                <Text style={styles.emptyText}>No upcoming bookings</Text>
                <TouchableOpacity
                  style={styles.browseButton}
                  onPress={() => navigation.navigate('Theatres')}
                >
                  <Text style={styles.browseButtonText}>Browse Shows</Text>
                </TouchableOpacity>
              </View>
            ) : (
              upcomingReservations.map(reservation => (
                <View key={reservation.reservation_id} style={styles.reservationCard}>
                  <View style={styles.cardAccent} />
                  <View style={styles.cardContent}>
                    <Text style={styles.showTitle}>{reservation.show_title}</Text>
                    <Text style={styles.cardDetail}>🏛 {reservation.theatre_name}</Text>
                    <Text style={styles.cardDetail}>📍 {reservation.location}</Text>
                    <Text style={styles.cardDetail}>
                      📅 {formatDate(reservation.show_datetime)} • {formatTime(reservation.show_datetime)}
                    </Text>
                    <View style={styles.cardFooter}>
                      <View style={styles.seatBadge}>
                        <Text style={styles.seatBadgeText}>
                          Seat {reservation.seat_number} • {reservation.category}
                        </Text>
                      </View>
                      <Text style={styles.price}>€{reservation.price}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => handleCancel(reservation.reservation_id)}
                    >
                      <Text style={styles.cancelButtonText}>Cancel Booking</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Past Bookings */}
          {pastReservations.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Past Bookings</Text>
              {pastReservations.map(reservation => (
                <View
                  key={reservation.reservation_id}
                  style={[styles.reservationCard, styles.pastCard]}
                >
                  <View style={[styles.cardAccent, styles.pastAccent]} />
                  <View style={styles.cardContent}>
                    <View style={styles.pastHeader}>
                      <Text style={[styles.showTitle, styles.pastText]}>
                        {reservation.show_title}
                      </Text>
                      {reservation.status === 'cancelled' && (
                        <View style={styles.cancelledBadge}>
                          <Text style={styles.cancelledBadgeText}>Cancelled</Text>
                        </View>
                      )}
                    </View>
                    <Text style={[styles.cardDetail, styles.pastText]}>
                      🏛 {reservation.theatre_name}
                    </Text>
                    <Text style={[styles.cardDetail, styles.pastText]}>
                      📅 {formatDate(reservation.show_datetime)} • {formatTime(reservation.show_datetime)}
                    </Text>
                    <View style={styles.cardFooter}>
                      <View style={[styles.seatBadge, styles.pastSeatBadge]}>
                        <Text style={[styles.seatBadgeText, styles.pastText]}>
                          Seat {reservation.seat_number} • {reservation.category}
                        </Text>
                      </View>
                      <Text style={[styles.price, styles.pastText]}>€{reservation.price}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#e91e8c',
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  reservationCount: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 15,
  },
  emptyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#999',
    marginBottom: 16,
  },
  browseButton: {
    backgroundColor: '#e91e8c',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  browseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  reservationCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  pastCard: {
    opacity: 0.7,
  },
  cardAccent: {
    width: 6,
    backgroundColor: '#e91e8c',
  },
  pastAccent: {
    backgroundColor: '#ccc',
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  pastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  showTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  pastText: {
    color: '#999',
  },
  cardDetail: {
    fontSize: 13,
    color: '#555',
    marginBottom: 3,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  seatBadge: {
    backgroundColor: '#fce4ec',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pastSeatBadge: {
    backgroundColor: '#f5f5f5',
  },
  seatBadgeText: {
    color: '#e91e8c',
    fontSize: 12,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e91e8c',
  },
  cancelButton: {
    borderWidth: 1.5,
    borderColor: '#e91e8c',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#e91e8c',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelledBadge: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  cancelledBadgeText: {
    color: '#e53935',
    fontSize: 11,
    fontWeight: 'bold',
  },
});