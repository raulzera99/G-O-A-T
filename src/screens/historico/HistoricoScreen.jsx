import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, ListItem } from "@react-native-material/core";
import AppBar from "../../components/common/AppBar";

const HistoricoScreen = ({ navigation }) => {
  // Mock data for demonstration purposes
  const historicalData = [
    {
      id: "1",
      date: "2023-01-01",
      location: "Stadium A",
    },
    {
      id: "2",
      date: "2023-02-15",
      location: "Field B",
    },
    // Add more historical data as needed
  ];

  const renderHistoricalItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleHistoricalItemPress(item)}
    >
      <ListItem>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.locationText}>{item.location}</Text>
      </ListItem>
    </TouchableOpacity>
  );

  const handleHistoricalItemPress = (item) => {
    // Handle the press on a historical item (e.g., navigate to details)
    // For now, it just logs the selected item's details
    console.log("Selected Historical Item:", item);
  };

  return (
    <View style={styles.container}>
      <AppBar title="Histórico" subtitle="Veja os últimos rachões" />
      <FlatList
        data={historicalData}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoricalItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  locationText: {
    fontSize: 14,
    color: "#555",
  },
});

export default HistoricoScreen;
