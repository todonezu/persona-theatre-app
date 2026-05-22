// Booking Screen
// Displays an interactive theatre-style seat map for a selected showtime
// Users can tap to select multiple seats and see a price summary
// Confirms booking before sending reservation requests to the backend

import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert, ScrollView
} from 'react-native';
import { getSeats, createReservation } from '../api';

export default function BookingScreen({ route, navigation }) {
  const { showtime, show } = route.params;
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [booking, setBooking] = useState(false);

  // Load seats when the screen opens
  useEffect(() => {
    loadSeats();
  }, []);

  // Fetch all seats for the selected showtime from the backend
  const loadSeats = async () => {
    try {
      const response = await getSeats(showtime.showtime_id);
      setSeats(response.data);
    } catch (error) {
      Alert.alert('Error', 'Could not load seats');
    }
    setLoading(false);
  };

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const formatTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Toggle a seat's selection state
  const toggleSeat = (seat) => {
    if (seat.is_available != 1) return;
    const isSelected = selectedSeats.find(s => s.seat_id === seat.seat_id);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.seat_id !== seat.seat_id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // Calculate the total price of selected seats
  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => total + parseFloat(seat.price), 0).toFixed(2);
  };

  // Handle the book button press
  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      Alert.alert('Error', 'Please select at least one seat');
      return;
    }
    Alert.alert(
      'Confirm Booking',
      `Book ${selectedSeats.length} seat(s) for €${getTotalPrice()}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            setBooking(true);
            try {
              for (const seat of selectedSeats) {
                await createReservation(seat.seat_id);
              }
              Alert.alert(
                '🎉 Booking Confirmed!',
                `${selectedSeats.length} seat(s) for ${show.title} have been booked!`,
                [{ text: 'OK', onPress: () => navigation.navigate('Theatres') }]
              );
            } catch (error) {
              Alert.alert('Error', 'Could not complete booking. Some seats may already be taken.');
            }
            setBooking(false);
          }
        }
      ]
    );
  };

  const getSeatStyle = (seat) => {
    if (seat.is_available != 1) return styles.seatUnavailable;
    if (selectedSeats.find(s => s.seat_id === seat.seat_id)) return styles.seatSelected;
    return styles.seatAvailable;
  };

  const getSeatTextStyle = (seat) => {
    if (seat.is_available != 1) return styles.seatTextUnavailable;
    if (selectedSeats.find(s => s.seat_id === seat.seat_id)) return styles.seatTextSelected;
    return styles.seatText;
  };

  // Group seats by row letter
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const groupedByRow = rows.reduce((groups, row) => {
    groups[row] = seats.filter(seat => seat.seat_number.startsWith(row))
  .sort((a, b) => {
    const numA = parseInt(a.seat_number.replace(row, ''));
    const numB = parseInt(b.seat_number.replace(row, ''));
    return numA - numB;
  });
    return groups;
  }, {});

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Show Info Bar */}
      <View style={styles.infoBar}>
        <Text style={styles.infoTitle}>{show.title}</Text>
        <Text style={styles.infoDate}>
          {formatDate(showtime.show_datetime)} • {formatTime(showtime.show_datetime)}
        </Text>
        <Text style={styles.infoTheatre}>🏛 {show.theatre_name}</Text>
      </View>

      {/* Stage */}
      <View style={styles.stageContainer}>
        <View style={styles.stage}>
          <Text style={styles.stageText}>✦ STAGE ✦</Text>
        </View>
        <View style={styles.stageCurve} />
      </View>

      {/* Seat Map */}
      {loading ? (
        <ActivityIndicator size="large" color="#e91e8c" style={{ marginTop: 40 }} />
      ) : (
        <View style={styles.seatMap}>
          {rows.map(row => (
            <View key={row} style={styles.rowContainer}>
              <Text style={styles.rowLabel}>{row}</Text>
              <View style={styles.rowSeats}>
                {groupedByRow[row].map(seat => (
                  <TouchableOpacity
                    key={seat.seat_id}
                    style={[styles.seat, getSeatStyle(seat)]}
                    onPress={() => toggleSeat(seat)}
                    disabled={seat.is_available != 1}
                  >
                    <Text style={getSeatTextStyle(seat)}>
                      {seat.seat_number.replace(row, '')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.rowLabel}>{row}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#e91e8c' }]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#e91e8c' }]} />
          <Text style={styles.legendText}>Selected</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#ddd' }]} />
          <Text style={styles.legendText}>Taken</Text>
        </View>
      </View>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedInfoTitle}>
            Selected Seats ({selectedSeats.length})
          </Text>
          {selectedSeats.map(seat => (
            <View key={seat.seat_id} style={styles.selectedInfoRow}>
              <Text style={styles.selectedInfoLabel}>Seat {seat.seat_number}</Text>
              <Text style={styles.selectedInfoValue}>€{seat.price}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>€{getTotalPrice()}</Text>
          </View>
        </View>
      )}

      {/* Book Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.bookButton, (selectedSeats.length === 0 || booking) && styles.bookButtonDisabled]}
          onPress={handleBooking}
          disabled={selectedSeats.length === 0 || booking}
        >
          {booking
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.bookButtonText}>
                {selectedSeats.length > 0
                  ? `Book ${selectedSeats.length} Seat(s) • €${getTotalPrice()}`
                  : 'Select a Seat First'}
              </Text>
          }
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  infoBar: {
    backgroundColor: '#e91e8c',
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  infoDate: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 4,
  },
  infoTheatre: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  stageContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  stage: {
    backgroundColor: '#e91e8c',
    width: '75%',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#e91e8c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  stageText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 4,
  },
  stageCurve: {
    width: '85%',
    height: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: 'rgba(233,30,140,0.1)',
    marginTop: 2,
  },
  seatMap: {
    paddingHorizontal: 12,
    marginTop: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#999',
    width: 16,
    textAlign: 'center',
  },
  rowSeats: {
    flexDirection: 'row',
    gap: 5,
    marginHorizontal: 6,
  },
  seat: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatAvailable: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e91e8c',
  },
  seatSelected: {
    backgroundColor: '#e91e8c',
  },
  seatUnavailable: {
    backgroundColor: '#ddd',
  },
  seatText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#e91e8c',
  },
  seatTextSelected: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#fff',
  },
  seatTextUnavailable: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#aaa',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  selectedInfo: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  selectedInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  selectedInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  selectedInfoLabel: {
    fontSize: 14,
    color: '#666',
  },
  selectedInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e91e8c',
  },
  bottomSection: {
    padding: 20,
    paddingBottom: 40,
  },
  bookButton: {
    backgroundColor: '#e91e8c',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: '#ccc',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});