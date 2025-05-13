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
      // Verify OTP with backend
      const otpResponse = await fetch('http://192.168.29.111:5050/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, otp }),
      });
  
      const otpText = await otpResponse.text();
      console.log('Raw response from /verify-otp:', otpText);
      const otpData = JSON.parse(otpText);
  
      if (!otpData.success) {
        Alert.alert('Verification Failed', otpData.message || 'Invalid OTP');
        return;
      }
  
      // OTP verified, now check user existence
      const checkUserResponse = await fetch('http://192.168.29.111:5050/api/user/check-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile }),
      });
  
      const userText = await checkUserResponse.text();
      console.log('Raw response from /check-info:', userText);
      const userData = JSON.parse(userText);
  
      // Check if user is empty
      const user = userData.user || {};
      if (Object.keys(user).length === 0) {
        console.log('User not found. Navigating to Welcome');
        navigation.navigate('Welcome', { mobile });
        return;
      }
  
      // Extract role and name from user object
      const role = user.description || '';  // Ensure role is properly extracted
      const name = user.username || '';    // Ensure name is properly extracted
  
      if (userData.success) {
        if (userData.hasCompanyInfo) {
          console.log('Navigating to Main');
          navigation.navigate('Main');
        } else {
          console.log('Navigating to CompanyInformation with:', { mobile, role, name });
          navigation.navigate('CompanyInformation', { mobile, role, name });
        }
      } else {
        console.log('Navigating to Welcome with:', { mobile });
        navigation.navigate('Welcome', { mobile });
      }
    } catch (err) {
      console.error('Error during OTP verification or user check:', err);
      Alert.alert('Error', 'An error occurred. Please try again later.');
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