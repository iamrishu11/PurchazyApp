import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TrustedSuppliersIntro = ({ navigation }) => (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#333" />
        </View>

        <Text style={styles.title}>Invite Suppliers</Text>

        <View style={styles.infoRow}>
            <Text style={styles.infoText}>
                All communications with suppliers will be done via Purchazy WhatsApp no.
            </Text>
            <Image source={require('../assets/whatsapp.svg')} style={styles.whatsappIcon} />
        </View>

        <View style={styles.stepContainer}>
            <View style={styles.stepRow}>
                <View style={styles.bullet} />
                <View style={styles.stepText}>
                    <Text style={styles.stepTitle}>STEP 1</Text>
                    <Text style={styles.stepDesc}>
                        Invite suppliers by selecting their WhatsApp number.
                    </Text>
                </View>
            </View>

            <View style={styles.stepRow}>
                <View style={styles.bullet} />
                <View style={styles.stepText}>
                    <Text style={styles.stepTitle}>STEP 2</Text>
                    <Text style={styles.stepDesc}>
                        Selected suppliers will get a notification that you have added them in their list of trusted suppliers.
                    </Text>
                </View>
            </View>

            <View style={styles.stepRow}>
                <View style={styles.bullet} />
                <View style={styles.stepText}>
                    <Text style={styles.stepTitle}>STEP 3</Text>
                    <Text style={styles.stepDesc}>
                        You can start posting RFQs to receive quotations.
                    </Text>
                </View>
            </View>
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
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        color: '#444',
    },
    whatsappIcon: {
        width: 22,
        height: 22,
        marginLeft: 8,
    },
    stepContainer: {
        marginVertical: 10,
    },
    stepRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    bullet: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#4b38ca',
        marginTop: 6,
        marginRight: 12,
    },
    stepText: {
        flex: 1,
    },
    stepTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
    },
    stepDesc: {
        fontSize: 14,
        color: '#555',
    },
    button: {
        backgroundColor: '#4b38ca',
        padding: 14,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
