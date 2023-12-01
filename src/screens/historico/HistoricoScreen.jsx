import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, ListItem } from "@react-native-material/core";
import AppBar from "../../components/common/AppBar";
import { Card } from "react-native-elements";

const HistoricoScreen = ({ navigation }) => {
  // Mock data for demonstration purposes
  const historicalData = [
    {
      id: "1",
      date: "2023-01-01",
      location: "Stadium A",
      winner: "Team A",
      topScorer: "LeBron James",
      assistsLeader: "Stephen Curry",
      reboundsLeader: "Kevin Durant",
      blocksLeader: "Giannis Antetokounmpo",
      stealsLeader: "James Harden",
    },
    {
      id: "2",
      date: "2023-02-15",
      location: "Field B",
      winner: "Team B",
      topScorer: "James Harden",
      assistsLeader: "Stephen Curry",
      reboundsLeader: "Giannis Antetokounmpo",
      blocksLeader: "Anthony Davis",
      stealsLeader: "LeBron James",
    },
    // Add more historical data as needed
  ];

  const renderHistoricalItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleHistoricalItemPress(item)}
    >
      <Card>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.locationText}>{`Local: ${item.location}`}</Text>
        <Text style={styles.resultText}>{`Vencedor: ${item.winner}`}</Text>
        <Text
          style={styles.detailText}
        >{`Top Pontuador: ${item.topScorer}`}</Text>
        <Text
          style={styles.detailText}
        >{`Assistências: ${item.assistsLeader}`}</Text>
        <Text
          style={styles.detailText}
        >{`Rebotes: ${item.reboundsLeader}`}</Text>
        <Text style={styles.detailText}>{`Tocos: ${item.blocksLeader}`}</Text>
        <Text style={styles.detailText}>{`Roubos: ${item.stealsLeader}`}</Text>
      </Card>
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
    paddingVertical: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  locationText: {
    fontSize: 14,
    color: "#555",
  },
  resultText: {
    fontSize: 14,
    color: "#007bff",
  },
  detailText: {
    fontSize: 14,
    color: "#777",
  },
});

export default HistoricoScreen;
