// screens/SelectSuppliersScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const mockSuppliers = [
  { id: 1, name: 'Aniket Traders', phone: '8444822267' },
  { id: 2, name: 'Banglore Polymers', phone: '8444822267' },
  { id: 3, name: 'Xyz Polymetech', phone: '8444822267' },
];

const SelectSuppliersScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Suppliers</Text>
      {mockSuppliers.map((s, i) => (
        <View key={i} style={styles.item}>
          <Text>{s.name} - {s.phone}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.doneButton} onPress={() => navigation.goBack()}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectSuppliersScreen;

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: '#4b38ca',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  doneText: { color: '#fff', fontWeight: 'bold' },
});
