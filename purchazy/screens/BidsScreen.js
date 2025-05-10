import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const bids = [
  { id: '1', title: 'Cardboxes 14X12', quantity: '200 box', status: 'DRAFT', bids: 0, time: '' },
  { id: '2', title: 'Cardboxes 14X12', quantity: '200 box', status: 'LIVE', bids: 4, time: '2hrs 02 mins' },
  { id: '3', title: 'Cardboxes 14X12', quantity: '200 box', status: 'LIVE', bids: 2, time: '2hrs 02 mins' },
];

const BidsScreen = ({ navigation }) => {
  const handleAddBid = () => {
    navigation.navigate('AddBid');
  };

  const renderBid = ({ item }) => (
    <View style={styles.bidCard}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.bidTitle}>{item.title}</Text>
          <Text style={styles.bidQty}>{item.quantity}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.bidTime}>{item.time}</Text>
          <Text style={[styles.bidStatus, { color: item.status === 'DRAFT' ? 'gray' : 'green' }]}>
            {item.status === 'DRAFT' ? 'DRAFT' : '●'}
          </Text>
          <Text style={styles.bidCount}>{item.bids} bids</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/logo-icon.png')} style={styles.logo} />
        <Text style={styles.heading}>Bids & RFQs</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput style={styles.input} placeholder="Search your bids" />

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={styles.activeTab}>Active(8)</Text>
        <Text style={styles.inactiveTab}>Closed</Text>
      </View>

      {/* Bid List */}
      <FlatList
        data={bids}
        keyExtractor={(item) => item.id}
        renderItem={renderBid}
        showsVerticalScrollIndicator={false}
      />

      {/* Add New Bid */}
      <TouchableOpacity style={styles.button} onPress={handleAddBid}>
        <Text style={styles.buttonText}>Add New Bid</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BidsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50, // LOWERED heading & header
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15, // Reduced margin
  },
  logo: {
    width: 30,
    height: 30,
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
  bidCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  bidTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bidQty: {
    color: '#333',
  },
  bidTime: {
    color: '#999',
    fontSize: 12,
  },
  bidStatus: {
    fontSize: 12,
    marginTop: 4,
  },
  bidCount: {
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
