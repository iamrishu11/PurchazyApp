import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const notificationsData = [
  {
    id: '1',
    title: 'RFQ is live, your suppliers can bid and share their quotation.',
    subtitle: '24 hrs left',
  },
  {
    id: '2',
    title: 'Aniket Traders wants to connect with you, please call them.',
    subtitle: '8444822267',
  },
];

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [menuVisibleId, setMenuVisibleId] = useState(null);

  const toggleMenu = (id) => {
    setMenuVisibleId((prevId) => (prevId === id ? null : id));
  };

  const markAsRead = (id) => {
    setMenuVisibleId(null);
    console.log(`Marked ${id} as read`);
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    setMenuVisibleId(null);
  };

  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleMenu(item.id)}>
          <Ionicons name="ellipsis-vertical" size={20} color="#444" />
        </TouchableOpacity>
      </View>

      {menuVisibleId === item.id && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => markAsRead(item.id)} style={styles.menuItem}>
            <Text>Mark as Read</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteNotification(item.id)} style={styles.menuItem}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
        <Ionicons name="notifications-outline" size={24} color="#333" />
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    color: '#888',
    fontSize: 13,
  },
  menu: {
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 10,
  },
  menuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
