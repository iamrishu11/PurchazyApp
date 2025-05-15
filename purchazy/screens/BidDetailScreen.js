import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const BidDetailScreen = ({ route }) => {
  const bid = route?.params?.bid;

  if (!bid) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No bid details available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{bid.title}</Text>

      <Text style={styles.label}>Description:</Text>
      <Text style={styles.text}>{bid.quantity || 'N/A'}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text
        style={[
          styles.text,
          { color: bid.status === 'DRAFT' ? 'gray' : 'green' },
        ]}
      >
        {bid.status || 'N/A'}
      </Text>

      <Text style={styles.label}>Bids Count:</Text>
      <Text style={styles.text}>{bid.bids != null ? bid.bids : '0'}</Text>

      <Text style={styles.label}>Duration:</Text>
      <Text style={styles.text}>{bid.time || 'N/A'}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default BidDetailScreen;
