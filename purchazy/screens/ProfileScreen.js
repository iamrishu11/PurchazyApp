import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>

            <TouchableOpacity
                style={styles.profileRow}
                onPress={() => navigation.navigate('AccountEdit')}
            >
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>AD</Text>
                </View>
                <View>
                    <Text style={styles.name}>ABC DEF</Text>
                    <Text style={styles.description}>Your account and details</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.card}>
                

                <TouchableOpacity style={styles.option}>
                    <Ionicons name="chatbox-ellipses-outline" size={20} color="#4b38ca" />
                    <Text style={styles.optionText}>Support Ticket</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <Ionicons name="people-outline" size={20} color="#4b38ca" />
                    <Text style={styles.optionText}>Manage Referral</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <TouchableOpacity style={styles.option}>
                    <Ionicons name="log-out-outline" size={20} color="#4b38ca" />
                    <Text style={styles.optionText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#222',
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        backgroundColor: '#eae8ff',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4b38ca',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
    },
    description: {
        color: '#666',
        marginTop: 4,
    },
    card: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginBottom: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    optionText: {
        fontSize: 16,
        marginLeft: 12,
        color: '#333',
        fontWeight: '500',
    },
});
