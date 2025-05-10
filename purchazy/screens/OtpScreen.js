import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OtpScreen = ({ navigation, route }) => {
  const { mobile } = route.params;
  const [otp, setOtp] = useState('');

  const handleLogin = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter the 6-digit OTP.');
      return;
    }

    try {
      const response = await fetch('http://192.168.29.111:5050/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, otp }),
      });
      
      
        const text = await response.text();
        console.log('Raw response from /verify-otp:', text);
      
        const data = JSON.parse(text); // Safely try to parse it
        if (data.success) {
          navigation.navigate('Welcome', { mobile });
        } else {
          Alert.alert('Verification Failed', data.message || 'Invalid OTP');
        }
      } catch (err) {
        console.error('OTP verification error:', err);
        Alert.alert('Error', 'Could not verify OTP. Please try again.');
      }
      
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="help-circle" size={28} color="#666" />
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>Verify OTP Code</Text>
      <Text style={styles.description}>
        We have sent you a 6 digit One Time Password on your entered mobile number.
        Please enter the OTP code to verify.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your code here"
        keyboardType="numeric"
        placeholderTextColor="#888"
        value={otp}
        onChangeText={setOtp}
        maxLength={6}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 10,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4b38ca',
    padding: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
