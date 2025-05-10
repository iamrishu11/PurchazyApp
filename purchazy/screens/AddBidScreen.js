import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddBidScreen = ({ navigation }) => {
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [deliveryLocation, setDeliveryLocation] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} //  PLATFORM ADAPTIVE
        style={{ flex: 1 }}
        keyboardVerticalOffset={60} //  ADJUST FOR HEADER
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.heading}>Add RFQ</Text>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Fields */}
          <View style={styles.field}>
            <Text style={styles.label}>Bid Name</Text>
            <TextInput style={styles.input} placeholder="Add material you need" placeholderTextColor="#888" />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Bid Description</Text>
            <TextInput style={styles.input} placeholder="Add full details" placeholderTextColor="#888" multiline />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Payment Details</Text>
            <TextInput style={styles.input} placeholder="Mention payment mode & terms" placeholderTextColor="#888" />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Delivery Location</Text>
            <TouchableOpacity
              style={styles.inputRow}
              onPress={() => {
                setDeliveryLocation('Plot No. 14, Sector 34, Faridabad, 121002');
              }}
            >
              <Text style={{ flex: 1, color: deliveryLocation ? '#000' : '#888' }}>
                {deliveryLocation || 'Please select address or add new.'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#888" />
            </TouchableOpacity>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Suppliers Selected</Text>
            <TouchableOpacity
              style={styles.inputRow}
              onPress={() => navigation.navigate('SelectSuppliers', {
                selected: selectedSuppliers,
                onReturn: setSelectedSuppliers,
              })}
            >
              <Text style={{ flex: 1, color: '#333' }}>
                {selectedSuppliers.length > 0 ? `Selected (${selectedSuppliers.length})` : 'Select suppliers'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#888" />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={styles.fieldSmall}>
              <Text style={styles.label}>Quantity</Text>
              <TextInput style={styles.input} placeholder="" placeholderTextColor="#888" />
            </View>
            <View style={styles.fieldSmall}>
              <Text style={styles.label}>Unit</Text>
              <View style={styles.inputRow}>
                <TextInput style={[styles.input, { flex: 1 }]} placeholder="" />
                <Ionicons name="chevron-down" size={20} color="#888" />
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.fieldSmall}>
              <Text style={styles.label}>Photo Desc.</Text>
              <View style={styles.input}>
                <Ionicons name="image-outline" size={24} color="#888" />
                <Ionicons name="add" size={16} color="#888" style={{ marginLeft: -8, marginTop: -8 }} />
              </View>
            </View>
            <View style={styles.fieldSmall}>
              <Text style={styles.label}>Bid Duration</Text>
              <View style={styles.inputRow}>
                <TextInput style={[styles.input, { flex: 1 }]} placeholder="" />
                <Ionicons name="chevron-down" size={20} color="#888" />
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LiveBid')}>
            <Text style={styles.buttonText}>Post RFQ</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddBidScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  heading: { fontSize: 20, fontWeight: 'bold' },
  field: { marginBottom: 12 },
  fieldSmall: { width: '48%' },
  label: { fontSize: 14, marginBottom: 6, fontWeight: '500' },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
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
