// Theatre List Screen - Main home screen of the app
// Displays all available shows with search and theatre filter
// Users can search by show title or filter by theatre
// Tapping a show card navigates to the Show Detail screen

import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert,
  TextInput, ScrollView
} from 'react-native';
import { getTheatres, getShows } from '../api';

export default function TheatreListScreen({ navigation }) {
  const [theatres, setTheatres] = useState([]);
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedTheatre, setSelectedTheatre] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  // Fetch theatres and shows from the backend simultaneously
  const loadData = async () => {
    try {
      const [theatresRes, showsRes] = await Promise.all([
        getTheatres(),
        getShows()
      ]);
      setTheatres(theatresRes.data);
      setShows(showsRes.data);
      setFilteredShows(showsRes.data);
    } catch (error) {
      Alert.alert('Error', 'Could not load data');
    }
    setLoading(false);
  };

  // Handle search input changes
  const handleSearch = (text) => {
    setSearchText(text);
    filterShows(text, selectedTheatre);
  };

  // Handle theatre filter chip press
  const handleTheatreFilter = (theatreId) => {
    const newSelected = selectedTheatre === theatreId ? null : theatreId;
    setSelectedTheatre(newSelected);
    filterShows(searchText, newSelected);
  };

  // Filter shows based on search text and selected theatre
  const filterShows = (text, theatreId) => {
    let filtered = shows;
    if (text) {
      filtered = filtered.filter(show =>
        show.title.toLowerCase().includes(text.toLowerCase())
      );
    }
    if (theatreId) {
      filtered = filtered.filter(show => show.theatre_id === theatreId);
    }
    setFilteredShows(filtered);
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e91e8c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Shows</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileButtonText}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍  Search shows..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* Theatre Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {theatres.map(theatre => (
          <TouchableOpacity
            key={theatre.theatre_id}
            style={[
              styles.filterChip,
              selectedTheatre === theatre.theatre_id && styles.filterChipActive
            ]}
            onPress={() => handleTheatreFilter(theatre.theatre_id)}
          >
            <Text style={[
              styles.filterChipText,
              selectedTheatre === theatre.theatre_id && styles.filterChipTextActive
            ]}>
              {theatre.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Shows List */}
      <FlatList
        data={filteredShows}
        keyExtractor={item => String(item.show_id)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No shows found</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ShowDetail', { show: item })}
          >
            <View style={styles.cardAccent} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.ageBadge}>
                  <Text style={styles.ageBadgeText}>{item.age_rating}</Text>
                </View>
              </View>
              <Text style={styles.cardTheatre}>🏛 {item.theatre_name}</Text>
              <Text style={styles.cardLocation}>📍 {item.location}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardDuration}>⏱ {item.duration} min</Text>
                <View style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>View →</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
  },
  profileButton: {
    backgroundColor: '#fce4ec',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: 18,
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: '#222',
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingBottom: 15,
    paddingTop: 5,
    maxHeight: 65,
  },
  filterContent: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChip: {
    borderWidth: 1.5,
    borderColor: '#e91e8c',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginRight: 8,
    height: 36,
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: '#e91e8c',
  },
  filterChipText: {
    color: '#e91e8c',
    fontSize: 13,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  listContent: {
    padding: 20,
    gap: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    marginBottom: 15,
  },
  cardAccent: {
    width: 6,
    backgroundColor: '#e91e8c',
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
    marginRight: 8,
  },
  ageBadge: {
    backgroundColor: '#fce4ec',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  ageBadgeText: {
    color: '#e91e8c',
    fontSize: 11,
    fontWeight: 'bold',
  },
  cardTheatre: {
    fontSize: 13,
    color: '#555',
    marginBottom: 3,
  },
  cardLocation: {
    fontSize: 13,
    color: '#555',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDuration: {
    fontSize: 13,
    color: '#999',
  },
  bookButton: {
    backgroundColor: '#fce4ec',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  bookButtonText: {
    color: '#e91e8c',
    fontWeight: 'bold',
    fontSize: 13,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 15,
    marginTop: 40,
  },
});