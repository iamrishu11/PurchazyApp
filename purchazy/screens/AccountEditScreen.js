import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AccountEditScreen = ({ navigation }) => {
    const [gstNumbers, setGstNumbers] = useState(['066QCM004Z1744', '066QCM004Z1224', '04441AADMJZXQ11']);
    const [addresses, setAddresses] = useState([
        'Sri City, Lane 3, Plot 3, 112000, Andra',
        'Unit 2 - Bypass, Sector 3, Plot 34, Delhi, 111003',
        'NIT, Sector 32, Plot 34, Haryana, 121003'
    ]);
    const [email, setEmail] = useState('xyz@jairajgroup.com');
    const [ownerNumber, setOwnerNumber] = useState('8882888466');
    const [purchaseContact, setPurchaseContact] = useState('8882888467');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Accounts</Text>
            </View>

            <View style={styles.editField}>
                <Text>Company Legal Name</Text>
                <TextInput value="Jairaj Ancillaries" style={styles.input} />
            </View>

            <View style={styles.editField}>
                <Text>GST Number</Text>
                <TouchableOpacity><Text style={styles.addNew}>+ Add New</Text></TouchableOpacity>
                {gstNumbers.map((gst, idx) => (
                    <View key={idx} style={styles.box}><Text>{gst}</Text></View>
                ))}
            </View>

            <View style={styles.editField}>
                <Text>Address</Text>
                <TouchableOpacity><Text style={styles.addNew}>+ Add New</Text></TouchableOpacity>
                {addresses.map((addr, idx) => (
                    <View key={idx} style={styles.box}><Text>{addr}</Text></View>
                ))}
            </View>

            <View style={styles.editField}>
                <Text>Email ID</Text>
                <TextInput value={email} onChangeText={setEmail} style={styles.input} />
            </View>

            <View style={styles.editField}>
                <Text>Owner’s / MD’s Number</Text>
                <TextInput value={ownerNumber} onChangeText={setOwnerNumber} style={styles.input} keyboardType="phone-pad" />
            </View>

            <View style={styles.editField}>
                <Text>Purchase Contact</Text>
                <TextInput value={purchaseContact} onChangeText={setPurchaseContact} style={styles.input} keyboardType="phone-pad" />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
                <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AccountEditScreen;

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    title: { fontSize: 22, fontWeight: 'bold' },
    editField: { marginBottom: 16 },
    input: {
        borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
        padding: 12, marginTop: 6
    },
    box: {
        backgroundColor: '#f6f6f6', padding: 12,
        borderRadius: 6, marginTop: 6
    },
    addNew: { color: '#4b38ca', fontWeight: '600', marginTop: 8 },
    saveButton: {
        backgroundColor: '#4b38ca',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    saveText: { color: '#fff', fontWeight: 'bold' },
});
