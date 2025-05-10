import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LiveBidScreen = ({ navigation }) => {
  const [showAbortModal, setShowAbortModal] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.liveText}>Bid LIVE</Text>
            <Text style={styles.timer}>1 hour 30 mins left</Text>
          </View>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </View>

        {/* Inputs (readonly) */}
        <Text style={styles.label}>Bid Name</Text>
        <TextInput style={styles.input} editable={false} value="Reliance PP H110 Natural" />

        <Text style={styles.label}>Bid Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          editable={false}
          value="Need 1 container material in pallet form, no equivalent material is needed. Material should not be more than 3 months old."
        />

        <Text style={styles.label}>Payment Details</Text>
        <TextInput style={styles.input} editable={false} value="5 days PDC on delivery." />

        <Text style={styles.label}>Delivery Location</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value="Plot no. 14, NIT-1, Sector 34, Faridabad, 121002"
        />

        <Text style={styles.label}>Lead Time</Text>
        <TextInput style={styles.input} editable={false} value="3 days" />

        <Text style={styles.label}>Supplier Selected</Text>
        <View style={styles.supplierBox}>
          <Text style={{ flex: 1 }}>Bangalore Polymers, Xyz polymet....</Text>
          <TouchableOpacity style={styles.supplierTag}>
            <Text style={styles.supplierText}>Selected (4)</Text>
          </TouchableOpacity>
        </View>

        {/* Quantity & Unit */}
        <View style={styles.row}>
          <View style={styles.fieldSmall}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput style={styles.input} editable={false} value="20000" />
          </View>
          <View style={styles.fieldSmall}>
            <Text style={styles.label}>Unit</Text>
            <TextInput style={styles.input} editable={false} value="kgs." />
          </View>
        </View>

        {/* Photo & Duration */}
        <View style={styles.row}>
          <View style={styles.fieldSmall}>
            <Text style={styles.label}>Photo Desc.</Text>
            <TextInput style={styles.input} editable={false} value="screenshot...png" />
          </View>
          <View style={styles.fieldSmall}>
            <Text style={styles.label}>Bid Duration</Text>
            <TextInput style={styles.input} editable={false} value="2 hours." />
          </View>
        </View>

        {/* Abort Button */}
        <TouchableOpacity
          style={styles.abortButton}
          onPress={() => setShowAbortModal(true)}
        >
          <Text style={styles.abortText}>Abort Bidding</Text>
        </TouchableOpacity>

        {/* Confirmation Modal */}
        <Modal visible={showAbortModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Are you sure, you want to Abort?</Text>
              <Text style={styles.modalText}>
                Aborting will close the RFQ and all suppliers will be informed about this.
              </Text>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={() => setShowAbortModal(false)}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Continue RFQ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmAbortButton}
                  onPress={() => {
                    setShowAbortModal(false);
                    // You can add abort logic here
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>ABORT RFQ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LiveBidScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  liveText: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  timer: {
    color: 'green',
    fontSize: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  supplierBox: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  supplierTag: {
    backgroundColor: '#8d79f8',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  supplierText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldSmall: {
    width: '48%',
  },
  abortButton: {
    backgroundColor: '#cc2b2b',
    padding: 16,
    borderRadius: 8,
    marginTop: 30,
  },
  abortText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    borderRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  continueButton: {
    backgroundColor: '#4b38ca',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmAbortButton: {
    backgroundColor: '#cc2b2b',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
});
