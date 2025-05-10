import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ClosedBidScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Bid Closed</Text>
            <Text style={styles.subtitle}>Closed 2 days ago</Text>
          </View>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </View>

        {/* Fields */}
        <Text style={styles.label}>Bid Name</Text>
        <TextInput style={styles.input} editable={false} value="Reliance PP H110 Natural" />

        <Text style={styles.label}>Bid Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          editable={false}
          value="Need 1 container material in pallet form, no equivalent material is needed. Material should not be more than 3 months old."
        />

        <Text style={styles.label}>Payment Details</Text>
        <TextInput style={styles.input} editable={false} value="5 days PDC on delivery." />

        <Text style={styles.label}>Delivery Location</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value="Plot no. 14, NIT-1, Sector 34, Faridabad, 121002"
        />

        <Text style={styles.label}>Lead Time</Text>
        <TextInput style={styles.input} editable={false} value="3 days" />

        <Text style={styles.label}>Supplier Selected</Text>
        <View style={styles.supplierBox}>
          <Text style={{ flex: 1 }}>Bangalore Polymers, Xyz polymet....</Text>
          <TouchableOpacity style={styles.supplierTag}>
            <Text style={styles.supplierText}>Selected (4)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View style={styles.fieldSmall}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput style={styles.input} editable={false} value="20000" />
          </View>
          <View style={styles.fieldSmall}>
            <Text style={styles.label}>Unit</Text>
            <TextInput style={styles.input} editable={false} value="kgs." />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.fieldSmall}>
            <Text style={styles.label}>Photo Desc.</Text>
            <TextInput style={styles.input} editable={false} value="screenshot...png" />
          </View>
          <View style={styles.fieldSmall}>
            <Text style={styles.label}>Bid Duration</Text>
            <TextInput style={styles.input} editable={false} value="2 hours." />
          </View>
        </View>

        {/* Highlight */}
        <TouchableOpacity style={styles.selectBox}>
          <Text style={styles.selectBoxText}>4 Quotations Received, Please select ›</Text>
        </TouchableOpacity>

        {/* Footer buttons */}
        <View style={styles.footerRow}>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>Clone RFQ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footerButton, { backgroundColor: '#4b38ca' }]}>
            <Text style={styles.footerButtonText}>Select supplier</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClosedBidScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  supplierBox: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  supplierTag: {
    backgroundColor: '#8d79f8',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  supplierText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldSmall: {
    width: '48%',
    marginBottom: 16,
  },
  selectBox: {
    backgroundColor: '#222',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  selectBoxText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerButton: {
    flex: 1,
    backgroundColor: '#8d79f8',
    padding: 14,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  footerButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
