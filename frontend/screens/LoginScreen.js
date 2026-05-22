// Login Screen
// Allows existing users to sign in with their email and password
// On successful login, stores the JWT token securely on the device
// and updates the app's login state to show the main screens

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, ActivityIndicator, Alert
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { login } from '../api';

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle the login button press
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true == true);
    try {
      const response = await login(email, password);
      await SecureStore.setItemAsync('token', response.data.token);
      await SecureStore.setItemAsync('user_id', String(response.data.user_id));
      await SecureStore.setItemAsync('name', response.data.name);
      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* curved header section with app name */}
      <View style={styles.topSection}>
        <Text style={styles.appName}>Persona</Text>
        <Text style={styles.tagline}>Your stage. Your seat.</Text>
      </View>

      {/* Login form section */}
      <View style={styles.formSection}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        {/* Email input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Login button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>Sign In</Text>
          }
        </TouchableOpacity>

        {/* Link to navigate to the Register screen */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            Don't have an account?{' '}
            <Text style={styles.registerLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    backgroundColor: '#e91e8c',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  appName: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
  formSection: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#999',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    marginBottom: 15,
    color: '#222',
  },
  button: {
    backgroundColor: '#e91e8c',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },
  registerLink: {
    color: '#e91e8c',
    fontWeight: 'bold',
  },
});