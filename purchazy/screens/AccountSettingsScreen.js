import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AccountSettingsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>

            <Text style={styles.title}>Settings</Text>

            <TouchableOpacity style={styles.item}>
                <Ionicons name="help-circle-outline" size={20} color="#333" />
                <Text style={styles.itemText}>Help & Support</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
                <Ionicons name="log-out-outline" size={20} color="#333" />
                <Text style={styles.itemText}>Logout</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text>© 2025 Purchazy Technology</Text>
                <Text>All rights reserved</Text>
                <Text>Made with ❤️ in India.</Text>
            </View>
        </View>
    );
};

export default AccountSettingsScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginVertical: 20 },
    item: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
    itemText: { marginLeft: 10, fontSize: 16 },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
    },
});
