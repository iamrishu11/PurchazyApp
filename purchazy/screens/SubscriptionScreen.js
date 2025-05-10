import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SubscriptionScreen = ({ navigation }) => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscribe</Text>
      <TouchableOpacity style={styles.skip} onPress={() => navigation.navigate('Main')}>
        <Text style={styles.skipText}>SKIP</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Subscription you{"\n"}will never regret.</Text>
      <Text style={styles.subheading}>Give your purchase process a chance to change.</Text>

      <View style={styles.toggle}>
        <TouchableOpacity style={[styles.toggleOption, !isYearly && styles.active]} onPress={() => setIsYearly(false)}>
          <Text>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.toggleOption, isYearly && styles.active]} onPress={() => setIsYearly(true)}>
          <Text>Yearly (-10%)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.features}>
        <Text style={styles.check}>✓ Unlimited RFQs</Text>
        <Text style={styles.check}>✓ Unlimited Quotations</Text>
        <Text style={styles.check}>✓ Unlimited Purchase Orders</Text>
        <Text style={styles.check}>✓ Call Support</Text>
        {isYearly && <Text style={styles.check}>✓ Expert sessions on B2B Procurement</Text>}
      </View>

      <Text style={styles.price}>Rs.{isYearly ? '22940' : '2124'}/-</Text>
      <Text>Billed {isYearly ? 'Annually' : 'Monthly'}, GST Included in price</Text>

      {/* ✅ UPDATED BUTTON NAVIGATION */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Main')}
      >
        <Text style={styles.buttonText}>Subscribe</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.link}>GST Invoicing Available</Text>
      </TouchableOpacity>

      <Text style={{ marginVertical: 10 }}>or</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#3c2dad' }]}
        onPress={() => navigation.navigate('TrustedSuppliersIntro')}
      >
        <Text style={styles.buttonText}>Start Free 1 month Trial</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 20 },
  skip: { position: 'absolute', top: 40, right: 20 },
  skipText: { color: '#8e7fff', fontWeight: '600' },
  heading: { fontSize: 20, fontWeight: '600', textAlign: 'center', marginTop: 20 },
  subheading: { fontSize: 14, color: '#666', textAlign: 'center', marginVertical: 10 },
  toggle: { flexDirection: 'row', borderWidth: 1, borderRadius: 8, marginTop: 20 },
  toggleOption: { padding: 10, width: 140, alignItems: 'center' },
  active: { backgroundColor: '#ddd' },
  features: { alignItems: 'flex-start', marginVertical: 20 },
  check: { fontSize: 16, marginVertical: 2, color: '#4b38ca' },
  price: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  button: { backgroundColor: '#8e7fff', padding: 14, borderRadius: 8, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { color: '#8e7fff', marginTop: 10 }
});
