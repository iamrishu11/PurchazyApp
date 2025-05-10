import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

const SignInScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState('');

  const handleLogin = async () => {
    if (!mobile || mobile.length < 10) {
      Alert.alert('Invalid Input', 'Please enter a valid mobile number');
      return;
    }

    try {
      const response = await fetch('http://192.168.29.111:5050/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile }),
      });

      const text = await response.text();
      console.log('Raw OTP response:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error('Invalid JSON response from server');
      }

      if (data.success) {
        navigation.navigate('Otp', { mobile });
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('OTP Error:', err.message);
      Alert.alert('Server Error', err.message || 'Could not send OTP. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.top}>
              <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              <Text style={styles.heading}>Sign-in/Sign up</Text>
              <Image source={require('../assets/splash-icon.png')} style={styles.illustration} />
            </View>

            <Text style={styles.label}>Mobile Sign-in</Text>
            <Text style={styles.description}>We will send you an SMS code for verification.</Text>
            <Text style={styles.subLabel}>Enter your mobile number here</Text>

            <TextInput
              style={styles.input}
              placeholder="+91-"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  top: {
    alignItems: 'flex-start',
  },
  backButton: {
    marginBottom: 10,
  },
  backArrow: {
    fontSize: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  illustration: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  label: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: '600',
  },
  description: {
    color: 'gray',
    marginVertical: 10,
  },
  subLabel: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#4b38ca',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
