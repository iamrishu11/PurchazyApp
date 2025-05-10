import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TeamHandleScreen = ({ navigation }) => {
    const handleDone = () => {
        navigation.navigate('CompanyInformation');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="help-circle" size={28} color="#666" />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Welcome to Purchazy</Text>
            <View style={styles.placeholderImage} />
            <Text style={styles.subtitle}>Let the team handle it.</Text>
            <Text style={styles.description}>
                Please ask your purchase team to download the app and login via their number.
                {"\n\n"}
                You will be able to view all the activity and approve POs.
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleDone}>
                <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TeamHandleScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        marginTop: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#222',
    },
    placeholderImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
        color: '#222',
    },
    description: {
        fontSize: 16,
        color: '#444',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#4b38ca',
        padding: 14,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});