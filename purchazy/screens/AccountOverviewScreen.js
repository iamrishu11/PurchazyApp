import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AccountOverviewScreen = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Ionicons name="home" size={28} color="#4b38ca" />
                <Text style={styles.title}>Accounts</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AccountSettings')}>
                    <Ionicons name="settings-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <TextInput style={styles.input} value="Jairaj Ancillaries" editable={false} />
            <View style={styles.section}>
                <Text style={styles.label}>GST Number</Text>
                <View style={styles.box}><Text>066QCM004Z1744</Text></View>
                <View style={styles.box}><Text>066QCM004Z1224</Text></View>
                <View style={styles.box}><Text>04441AADMJZXQ11</Text></View>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Address</Text>
                <View style={styles.box}><Text>Sri City, Lane 3, Plot 3, 112000, Andra</Text></View>
                <View style={styles.box}><Text>Unit 2 - Bypass, Sector 3, Plot 34, Delhi, 111003</Text></View>
                <View style={styles.box}><Text>NIT, Sector 32, Plot 34, Haryana, 121003</Text></View>
            </View>

            <TextInput style={styles.input} value="xyz@jairajgroup.com" editable={false} />
            <TextInput style={styles.input} value="8882888466" editable={false} />
            <TextInput style={styles.input} value="8882888467" editable={false} />

            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('AccountEdit')}>
                <Text style={styles.editButtonText}>Add & Edit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AccountOverviewScreen;

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 22, fontWeight: 'bold' },
    input: {
        borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
        padding: 12, fontSize: 16, marginBottom: 10, backgroundColor: '#f6f6f6'
    },
    label: { fontWeight: '600', marginBottom: 6 },
    section: { marginBottom: 20 },
    box: {
        backgroundColor: '#f6f6f6', padding: 12,
        borderRadius: 6, marginBottom: 8
    },
    editButton: {
        backgroundColor: '#222', padding: 14,
        borderRadius: 8, alignItems: 'center'
    },
    editButtonText: { color: '#fff', fontWeight: 'bold' },
});
