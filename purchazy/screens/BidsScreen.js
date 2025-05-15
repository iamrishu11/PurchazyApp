import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const BidsScreen = ({ navigation, route }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Active");

  const userId = route?.params?.id || null;
  console.log("User ID from route params:", userId);

  useEffect(() => {
    if (userId) {
      fetchUserBids();
    } else {
      console.warn("No userId provided, skipping fetch");
      setLoading(false);
    }
  }, [userId]);

  const fetchUserBids = async () => {
    try {
      if (!refreshing) setLoading(true);
      console.log("Fetching bids for userId:", userId);
      const response = await axios.post(
        "http://192.168.29.111:5050/api/user/get-user-rfqs",
        { userId }
      );
      console.log("API response:", response.data);

      const rfqList = response.data.rfqs || [];

      const formattedBids = rfqList.map((item) => {
        let status = "DRAFT"; // default
        if (item.finalized === 0 || item.finalized === "0") {
          status = "ACTIVE";
        } else if (item.finalized === 1 || item.finalized === "1") {
          status = "CLOSED";
        } else if (item.STATUS) {
          status = item.STATUS.toUpperCase();
        }

        return {
          id: item.id.toString(),
          title: item.rfq_name,
          quantity: item.rfq_description || "N/A",
          status: status,
          bids: item.bids || 0,
          time: item.duration ? `${item.duration} hrs` : "",
          finalized: item.finalized,
        };
      });

      setBids(formattedBids);
    } catch (error) {
      console.error("Error fetching bids:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUserBids();
  };

  const handleAddBid = () => {
    navigation.navigate("AddBid", { id: userId });
  };

  const renderBid = ({ item }) => (
    <TouchableOpacity
      style={styles.bidCard}
      onPress={() => navigation.navigate("BidDetail", { bid: item })}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={styles.bidTitle}>{item.title}</Text>
          <Text style={styles.bidQty}>{item.quantity}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.bidTime}>{item.time}</Text>
          <Text
            style={[
              styles.bidStatus,
              { color: item.status === "DRAFT" ? "gray" : item.status === "CLOSED" ? "red" : "green" },
            ]}
          >
            {item.status === "DRAFT"
              ? "DRAFT"
              : item.status === "CLOSED"
              ? "CLOSED"
              : "●"}
          </Text>
          <Text style={styles.bidCount}>{item.bids} bids</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Filter bids based on selected tab
  const filteredBids = bids.filter((bid) =>
    selectedTab === "Active" ? bid.status === "ACTIVE" : bid.status === "CLOSED"
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/logo-icon.png")}
          style={styles.logo}
        />
        <Text style={styles.heading}>Bids & RFQs</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput style={styles.input} placeholder="Search your bids" />

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setSelectedTab("Active")}>
          <Text style={selectedTab === "Active" ? styles.activeTab : styles.inactiveTab}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab("Closed")}>
          <Text style={selectedTab === "Closed" ? styles.activeTab : styles.inactiveTab}>Closed</Text>
        </TouchableOpacity>
      </View>

      {/* Loader or Bid List */}
      {loading && !refreshing ? (
        <ActivityIndicator
          size="large"
          color="#4b38ca"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={filteredBids}
          keyExtractor={(item) => item.id}
          renderItem={renderBid}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20, color: "#999" }}>
              No {selectedTab.toLowerCase()} bids found.
            </Text>
          }
        />
      )}

      {/* Add New Bid */}
      <TouchableOpacity style={styles.button} onPress={handleAddBid}>
        <Text style={styles.buttonText}>Add New Bid</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BidsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  logo: {
    width: 30,
    height: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 10,
  },
  activeTab: {
    marginRight: 20,
    fontWeight: "bold",
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#4b38ca",
    paddingBottom: 4,
  },
  inactiveTab: {
    marginRight: 20,
    color: "gray",
    fontSize: 16,
  },
  bidCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  bidTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bidQty: {
    color: "#333",
  },
  bidTime: {
    color: "#999",
    fontSize: 12,
  },
  bidStatus: {
    fontSize: 12,
    marginTop: 4,
  },
  bidCount: {
    color: "#333",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#4b38ca",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
