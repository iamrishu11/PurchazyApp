import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TrustedSuppliersList = ({ navigation }) => {
    const suppliers = [
        { name: 'Mahesh Manglesh Plastics Pvt. Ltd.', phone: '890000968', verified: false },
        { name: 'Aniket Traders', phone: '8444822267', verified: true }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Invite Suppliers</Text>
            {suppliers.map((s, i) => (
                <View key={i} style={styles.card}>
                    <Text style={styles.name}>{s.name}</Text>
                    <Text>{s.phone}</Text>
                    {!s.verified && <Text style={styles.unverified}>Verification Incomplete</Text>}
                </View>
            ))}
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
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    card: { padding: 14, backgroundColor: '#f5f5f5', borderRadius: 8, marginBottom: 10 },
    name: { fontWeight: '600' },
    unverified: { color: 'red', marginTop: 5 },
    button: { backgroundColor: '#4b38ca', padding: 14, borderRadius: 8, marginTop: 20 },
    buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
