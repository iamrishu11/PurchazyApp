import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TrustedSuppliersList = ({ navigation }) => {
  const suppliers = [
    { name: 'Mahesh Manglesh Plastics Pvt. Ltd.', phone: '890000968', verified: false },
    { name: 'Aniket Traders', phone: '8444822267', verified: true }
  ];

  const renderSupplier = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
          {!item.verified && <Text style={styles.unverified}>Verification Incomplete</Text>}
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color="#444" />
        </TouchableOpacity>
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
        <Text style={styles.title}>Trusted Suppliers</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Invite Suppliers</Text>
      <Text style={styles.description}>
        All communications with suppliers will be done via Purchazy Whatsapp no.
      </Text>

      {/* Supplier List */}
      <FlatList
        data={suppliers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSupplier}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Invite Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.buttonText}>Invite Suppliers</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrustedSuppliersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: {
    color: '#444',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  phone: {
    color: '#555',
  },
  unverified: {
    color: 'red',
    fontSize: 12,
    marginTop: 6,
  },
  button: {
    backgroundColor: '#4b38ca',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
