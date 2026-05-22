// App.js - Main entry point of the React Native frontend
// Sets up navigation between all screens
// Checks if the user is already logged in when the app opens
// and redirects them to the appropriate screen

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';

// Import all screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import TheatreListScreen from './screens/TheatreListScreen';
import ShowDetailScreen from './screens/ShowDetailScreen';
import BookingScreen from './screens/BookingScreen';
import ProfileScreen from './screens/ProfileScreen';

// Create the stack navigator - manages screen transitions
const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check login status when the app first opens
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (token !== null && token !== undefined && token !== '') {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      setIsLoggedIn(false);
    }
    setLoading(false);
  };

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // Global header styling
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#e91e8c',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {isLoggedIn === false ? (
          <>
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
            >
              {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen
              name="Register"
              options={{ headerShown: false }}
            >
              {props => <RegisterScreen {...props} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Theatres"
              component={TheatreListScreen}
              options={{ title: 'Persona', headerLeft: null }}
            />
            <Stack.Screen
              name="ShowDetail"
              component={ShowDetailScreen}
              options={{ title: 'Show Details' }}
            />
            <Stack.Screen
              name="Booking"
              component={BookingScreen}
              options={{ title: 'Book Seats' }}
            />
            <Stack.Screen
              name="Profile"
              options={{ title: 'My Profile' }}
            >
              {props => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}