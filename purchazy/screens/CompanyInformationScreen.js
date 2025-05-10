import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView, //  ADDED
  Platform,             //  ADDED
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CompanyInformationScreen = ({ navigation }) => {
  const [companyName, setCompanyName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');

  const handleGetStarted = () => {
    if (!companyName || !gstNumber || !email) {
      Alert.alert('Missing Fields', 'Please fill all required fields.');
      return;
    }

    navigation.navigate('Subscription');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}                            //  ENABLE LAYOUT SHIFT
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} //  PLATFORM SAFE
      keyboardVerticalOffset={60}                   // ADJUSTS FOR HEADER HEIGHT
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"         //  DISMISS KEYBOARD ON TAP OUT
      >
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
          Please fill the form below to verify your account.
          You will be able to edit it in the account section.
        </Text>

        <Text style={styles.label}>Company Legal Name</Text>
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
          placeholder="Enter GST number"
        />

        <Text style={styles.label}>PAN Number</Text>
        <TextInput
          style={styles.input}
          value={panNumber}
          onChangeText={setPanNumber}
          placeholder="Enter PAN number"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter address"
          multiline
        />

        <Text style={styles.label}>Email Id</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Purchase Team/Employee’s Number</Text>
        <TextInput
          style={styles.input}
          value={employeeNumber}
          onChangeText={setEmployeeNumber}
          placeholder="Enter employee number"
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CompanyInformationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,                 // ALLOWS CONTENT TO GROW & SCROLL
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
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
