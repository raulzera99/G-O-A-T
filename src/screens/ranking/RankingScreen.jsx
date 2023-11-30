import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Text,
  ListItem,
  Avatar,
  Badge,
  IconButton,
} from "@react-native-material/core";
import AppBar from "../../components/common/AppBar";

const RankingScreen = () => {
  const [leaderboard, setLeaderboard] = useState([
    {
      id: "1",
      playerName: "LeBron James",
      points: 28.5,
      assists: 8.5,
      rebounds: 7.4,
      blocks: 1.2,
      avatar: require("../../../assets/lebron.png"), // Replace with actual avatar image
    },
    {
      id: "2",
      playerName: "Stephen Curry",
      points: 32.1,
      assists: 6.4,
      rebounds: 5.5,
      blocks: 0.3,
      avatar: require("../../../assets/curry.png"), // Replace with actual avatar image
    },
    // Add more leaderboard data as needed
  ]);

  const renderLeaderboardItem = ({ item }) => (
    <ListItem>
      <Avatar.Image source={item.avatar} size={50} />
      <View style={styles.playerDetails}>
        <Text style={styles.playerName}>{item.playerName}</Text>
        <View style={styles.statsContainer}>
          <Badge style={styles.statBadge}>{`${item.points} PPG`}</Badge>
          <Badge style={styles.statBadge}>{`${item.assists} APG`}</Badge>
          <Badge style={styles.statBadge}>{`${item.rebounds} RPG`}</Badge>
          <Badge style={styles.statBadge}>{`${item.blocks} BPG`}</Badge>
        </View>
      </View>
      <IconButton icon="chevron-right" />
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <AppBar
        title="Ranking"
        subtitle="Estatísticas dos jogadores do rachão"
        centerSubtitle={true}
      />
      <FlatList
        data={leaderboard}
        keyExtractor={(item) => item.id}
        renderItem={renderLeaderboardItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  playerDetails: {
    marginLeft: 16,
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  statBadge: {
    marginRight: 8,
    backgroundColor: "#da733c",
  },
});

export default RankingScreen;
