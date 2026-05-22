// Show Detail Screen
// Displays full details of a selected show including description,
// theatre info and available showtimes
// User selects a showtime then taps the button to go to seat booking

import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert, ScrollView
} from 'react-native';
import { getShowtimes } from '../api';

export default function ShowDetailScreen({ route, navigation }) {
  const { show } = route.params;
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  // Load showtimes when the screen opens
  useEffect(() => {
    loadShowtimes();
  }, []);

  const loadShowtimes = async () => {
    try {
      const response = await getShowtimes(show.show_id);
      setShowtimes(response.data);
    } catch (error) {
      Alert.alert('Error', 'Could not load showtimes');
    }
    setLoading(false);
  };

  // Format the date part of a datetime string for display
  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format the time part of a datetime string for display
  const formatTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Show Header */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.showTitle}>{show.title}</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{show.age_rating}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>⏱ {show.duration} min</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Show Info */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>{show.description}</Text>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Theatre</Text>
            <Text style={styles.detailValue}>🏛 {show.theatre_name}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValue}>📍 {show.location}</Text>
          </View>
        </View>
      </View>

      {/* Showtimes */}
      <View style={styles.showtimesSection}>
        <Text style={styles.sectionTitle}>Select a Showtime</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#e91e8c" />
        ) : showtimes.length === 0 ? (
          <Text style={styles.emptyText}>No showtimes available</Text>
        ) : (
          showtimes.map(showtime => (
            <TouchableOpacity
              key={showtime.showtime_id}
              style={[
                styles.showtimeCard,
                selectedShowtime?.showtime_id === showtime.showtime_id &&
                styles.showtimeCardSelected
              ]}
              onPress={() => setSelectedShowtime(showtime)}
            >
              <View style={styles.showtimeLeft}>
                <Text style={[
                  styles.showtimeDate,
                  selectedShowtime?.showtime_id === showtime.showtime_id &&
                  styles.showtimeTextSelected
                ]}>
                  {formatDate(showtime.show_datetime)}
                </Text>
                <Text style={[
                  styles.showtimeTime,
                  selectedShowtime?.showtime_id === showtime.showtime_id &&
                  styles.showtimeTextSelected
                ]}>
                  🕐 {formatTime(showtime.show_datetime)}
                </Text>
              </View>
              {selectedShowtime?.showtime_id === showtime.showtime_id && (
                <Text style={styles.selectedTick}>✓</Text>
              )}
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* Book Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.bookButton,
            !selectedShowtime && styles.bookButtonDisabled
          ]}
          disabled={!selectedShowtime}
          onPress={() => navigation.navigate('Booking', {
            showtime: selectedShowtime,
            show: show
          })}
        >
          <Text style={styles.bookButtonText}>
            {selectedShowtime ? 'Select Seats →' : 'Select a Showtime First'}
          </Text>
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
  heroSection: {
    backgroundColor: '#e91e8c',
    padding: 25,
    paddingTop: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  showTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 15,
  },
  detailItem: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 12,
  },
  detailLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  detailValue: {
    fontSize: 13,
    color: '#222',
    fontWeight: '600',
  },
  showtimesSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  showtimeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  showtimeCardSelected: {
    borderColor: '#e91e8c',
    backgroundColor: '#fce4ec',
  },
  showtimeLeft: {
    gap: 4,
  },
  showtimeDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  showtimeTime: {
    fontSize: 13,
    color: '#666',
  },
  showtimeTextSelected: {
    color: '#e91e8c',
  },
  selectedTick: {
    color: '#e91e8c',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 15,
    marginTop: 20,
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