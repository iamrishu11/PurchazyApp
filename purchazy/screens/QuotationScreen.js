import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const sampleQuotations = [
  {
    id: '1',
    name: 'Banglore Polymers',
    price: 'Rs.830',
    lead: '2 days',
    remarks: '',
  },
  {
    id: '2',
    name: 'Mahesh Manglesh Plastics Pvt Ltd.',
    price: 'Rs.825',
    lead: '1 days',
    remarks:
      'Remarks by supplier - all is okay, but please make sure to give paise on time.',
  },
  {
    id: '3',
    name: 'Xyz polymetech',
    price: 'Rs.880',
    lead: '3 days',
    remarks: '',
  },
  {
    id: '4',
    name: 'ADB Polymers',
    price: 'Rs.850',
    lead: '5 days',
    remarks: '',
  },
];

const QuotationScreen = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedId;
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => setSelectedId(item.id)}
      >
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.supplierName}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          <Text style={styles.lead}>{item.lead}</Text>
          <Ionicons
            name={isSelected ? 'checkbox' : 'square-outline'}
            size={24}
            color={isSelected ? '#4b38ca' : '#888'}
            style={{ marginLeft: 12 }}
          />
        </View>
        {isSelected && item.remarks ? (
          <View style={styles.remarksBox}>
            <Text style={styles.remarksText}>{item.remarks}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.heading}>Quotations</Text>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </View>

        {/* Bid Name */}
        <Text style={styles.label}>Bid Name</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value="Reliance PP H110 Natural"
        />

        <Text style={styles.subHeading}>Please select the best bid.</Text>

        {/* List */}
        <View style={styles.listHeader}>
          <Text style={styles.column}>Supplier</Text>
          <Text style={styles.column}>Price per unit</Text>
          <Text style={styles.column}>Lead</Text>
          <Text style={styles.column}>Select</Text>
        </View>

        <FlatList
          data={sampleQuotations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        {/* Select Button */}
        <TouchableOpacity
          style={[
            styles.selectButton,
            { backgroundColor: selectedId ? '#4b38ca' : '#ccc' },
          ]}
          disabled={!selectedId}
        >
          <Text style={styles.selectButtonText}>Select this bid</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QuotationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  column: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
    flex: 1,
  },
  card: {
    padding: 12,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedCard: {
    backgroundColor: '#eee',
    borderColor: '#4b38ca',
    borderWidth: 1.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supplierName: {
    fontWeight: '600',
    fontSize: 14,
  },
  price: {
    fontSize: 14,
    color: '#000',
  },
  lead: {
    fontSize: 13,
    color: '#444',
  },
  remarksBox: {
    marginTop: 10,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
  },
  remarksText: {
    color: '#fff',
    fontSize: 13,
  },
  selectButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
