import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const WelcomeScreen = ({ navigation, route }) => {
    const { mobile } = route.params || {};
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        if (!mobile) {
            console.log('WelcomeScreen: Mobile is missing, going back to SignIn');
            navigation.replace('SignIn');
        }
    }, [mobile]);

    const handleGetStarted = async () => {
        if (!mobile) {
            console.log('WelcomeScreen: Mobile missing in handleGetStarted');
            Alert.alert('Error', 'Mobile number is missing. Please go back to sign in.');
            return;
        }

        if (!role) {
            Alert.alert('Error', 'Please select your role');
            return;
        }

        if (!name) {
            Alert.alert('Error', 'Please enter your name');
            return;
        }

        try {
            console.log('Creating user with data:', { mobile, username: name, role });
            const response = await fetch('http://192.168.29.111:5050/api/user/create-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mobile,
                    username: name,
                    role
                }),
            });

            const data = await response.json();
            console.log('Create user response:', data);

            if (data.success) {
                const navigationParams = { 
                    mobile: mobile.toString(), // Ensure mobile is a string
                    role: role.toString(),    // Ensure role is a string
                    name: name.toString()     // Ensure name is a string
                };
                console.log('WelcomeScreen navigating with params:', navigationParams);

                if (role === 'md_owner') {
                    navigation.navigate('TeamHandle', navigationParams);
                } else {
                    navigation.navigate('CompanyInformation', navigationParams);
                }
            } else {
                Alert.alert('Error', data.message || 'Failed to create user. Please try again.');
            }
        } catch (error) {
            console.error('Create user error:', error);
            Alert.alert(
                'Server Error',
                'Could not create user. Please check your internet connection and try again.'
            );
        }
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
            <Text style={styles.subtitle}>Please let us know about you.</Text>
            <Text style={styles.description}>This will help us understand about you.</Text>

            <Text style={styles.label}>Your Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
            />

            <Text style={styles.label}>Please select what suits you best</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={role}
                    onValueChange={(itemValue) => setRole(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select an option" value="" />
                    <Picker.Item label="I am MD/Company owner & I myself will manage purchase." value="md_owner" />
                    <Picker.Item label="I am MD/Company owner & My team manages purchase." value="md_team" />
                    <Picker.Item label="I am from the purchase team." value="purchase_team" />
                </Picker>
            </View>

            <TouchableOpacity
                style={[styles.button, !role ? styles.buttonDisabled : {}]}
                onPress={handleGetStarted}
                disabled={!role}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

export default WelcomeScreen;

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
        marginBottom: 10,
        color: '#222',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 5,
        color: '#222',
    },
    description: {
        fontSize: 16,
        color: '#444',
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#f5f5f5',
        padding: 14,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 20,
    },
    pickerContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    button: {
        backgroundColor: '#4b38ca',
        padding: 14,
        borderRadius: 8,
    },
    buttonDisabled: {
        backgroundColor: '#d3d3d3',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});