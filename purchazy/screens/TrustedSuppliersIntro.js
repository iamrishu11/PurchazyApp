import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TrustedSuppliersIntro = ({ navigation }) => (
    <View style={styles.container}>
        <View style={styles.header}>
            <Ionicons name="arrow-back" size={24} onPress={() => navigation.goBack()} />
            <Ionicons name="notifications-outline" size={24} />
        </View>
        <Text style={styles.title}>Invite Suppliers</Text>
        <Text style={styles.info}>All communications with suppliers will be done via Purchazy WhatsApp no.</Text>
        <View style={styles.steps}>
            <Text>● STEP 1: Invite suppliers by selecting their WhatsApp number.</Text>
            <Text>● STEP 2: They get a notification.</Text>
            <Text>● STEP 3: Start posting RFQs.</Text>
        </View>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('TrustedSuppliersList')}
        >
            <Text style={styles.buttonText}>Invite Suppliers from Contacts</Text>
        </TouchableOpacity>
    </View>
);

export default TrustedSuppliersIntro;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between' },
    title: { fontSize: 24, fontWeight: 'bold', marginVertical: 20 },
    info: { marginBottom: 10, color: '#333' },
    steps: { marginVertical: 20 },
    button: { backgroundColor: '#4b38ca', padding: 14, borderRadius: 8, marginTop: 20 },
    buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
