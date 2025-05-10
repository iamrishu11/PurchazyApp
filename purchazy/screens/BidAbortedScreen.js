// BidAbortedScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const BidAbortedScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Bid Aborted</Text>
        <Text style={styles.subTitle}>Aborted 2 days ago</Text>

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

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Clone to New RFQ</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BidAbortedScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 12,
    color: '#888',
    marginBottom: 20,
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
