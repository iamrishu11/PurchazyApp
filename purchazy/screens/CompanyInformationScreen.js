import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CompanyInformationScreen = ({ navigation, route }) => {
  const [companyName, setCompanyName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const { mobile, role, name } = route.params || {};

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (number) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(number);
  };

  const validateGST = (gst) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
  };

  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const handleGetStarted = async () => {
    // Check navigation params
    const missingParams = [];
    if (!mobile) missingParams.push('Mobile Number');
    if (!role) missingParams.push('Role');
    if (!name) missingParams.push('Name');

    if (missingParams.length > 0) {
      Alert.alert(
        'Missing Information',
        `Please go back and complete these fields:\n${missingParams.join('\n')}`
      );
      return;
    }

    // Validate all form fields
    const errors = [];
    
    if (!companyName.trim()) {
      errors.push('Company Name is required');
    }

    if (!gstNumber.trim()) {
      errors.push('GST Number is required');
    } else if (!validateGST(gstNumber)) {
      errors.push('Please enter a valid GST Number');
    }

    if (!panNumber.trim()) {
      errors.push('PAN Number is required');
    } else if (!validatePAN(panNumber)) {
      errors.push('Please enter a valid PAN Number');
    }

    if (!address.trim()) {
      errors.push('Address is required');
    }

    if (!email.trim()) {
      errors.push('Email is required');
    } else if (!validateEmail(email)) {
      errors.push('Please enter a valid email address');
    }

    if (errors.length > 0) {
      Alert.alert(
        'Validation Error',
        errors.join('\n')
      );
      return;
    }

    try {
      console.log('Form data before submission:', {
        mobile,
        role,
        username: companyName,
        gst_number: gstNumber,
        pan_number: panNumber,
        address,
        email,
        employee_number: employeeNumber
      });

      const response = await fetch('http://192.168.29.111:5050/api/user/update-company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile,
          role,
          username: companyName,
          gst_number: gstNumber,
          pan_number: panNumber,
          address,
          email,
          employee_number: employeeNumber
        }),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (data.success) {
        navigation.navigate('Main');
      } else {
        Alert.alert(
          'Error',
          data.message || 'Failed to save company info. Please check all fields and try again.'
        );
      }
    } catch (error) {
      console.error('Company Info Error:', error);
      Alert.alert(
        'Server Error',
        'Could not update company info. Please check your internet connection and try again.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="help-circle" size={28} color="#666" />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Welcome to Purchazy</Text>
            <Text style={styles.subtitle}>Company Information</Text>
            <Text style={styles.description}>
              Please fill all the required fields below to verify your account.
              You will be able to edit it in the account section.
            </Text>

            <Text style={styles.label}>Company Legal Name*</Text>
            <TextInput
              style={styles.input}
              value={companyName}
              onChangeText={setCompanyName}
              placeholder="Enter company name"
            />

            <Text style={styles.label}>GST Number*</Text>
            <TextInput
              style={styles.input}
              value={gstNumber}
              onChangeText={setGstNumber}
              placeholder="Enter GST number (e.g., 22AAAAA0000A1Z5)"
              autoCapitalize="characters"
            />

            <Text style={styles.label}>PAN Number*</Text>
            <TextInput
              style={styles.input}
              value={panNumber}
              onChangeText={setPanNumber}
              placeholder="Enter PAN number (e.g., ABCDE1234F)"
              autoCapitalize="characters"
            />

            <Text style={styles.label}>Address*</Text>
            <TextInput
              style={[styles.input]}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter complete address"
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>Email Id*</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email address"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Purchase Team/Employee's Number*</Text>
            <TextInput
              style={styles.input}
              value={employeeNumber}
              onChangeText={setEmployeeNumber}
              placeholder="Enter Number of Employee"
              keyboardType="phone-pad"
              maxLength={10}
            />

            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CompanyInformationScreen;

const styles = StyleSheet.create({
  safeArea: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
    color: '#222',
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
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
    marginTop: 10,
    marginBottom: 30, // gives a little spacing after last input (optional)
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addressInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
});
