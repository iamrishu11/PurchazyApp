import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const orders = [
  { id: '1', title: 'Cardboxes 14X12', quantity: '200 box', status: 'DRAFT' },
  { id: '2', title: 'Cardboxes 14X12', quantity: '200 box', status: 'LIVE' },
  { id: '3', title: 'Cardboxes 14X12', quantity: '200 box', status: 'LIVE' },
];

const PurchaseOrdersScreen = ({ navigation }) => {
  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.orderTitle}>{item.title}</Text>
          <Text style={styles.orderQty}>{item.quantity}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[styles.orderStatus, { color: item.status === 'DRAFT' ? 'gray' : 'green' }]}>
            {item.status === 'DRAFT' ? 'DRAFT' : '●'}
          </Text>
          <Text style={styles.orderCount}>0 bids</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.heading}>Purchase Orders</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput style={styles.input} placeholder="Search your bids" />

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={styles.activeTab}>ISSUED</Text>
        <Text style={styles.inactiveTab}>CLOSED</Text>
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        showsVerticalScrollIndicator={false}
      />

      {/* Edit Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PurchaseOrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  activeTab: {
    marginRight: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
  inactiveTab: {
    color: 'gray',
    fontSize: 16,
  },
  orderCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderQty: {
    color: '#333',
  },
  orderStatus: {
    fontSize: 12,
    marginTop: 4,
  },
  orderCount: {
    color: '#333',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#4b38ca',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
