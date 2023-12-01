import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Overlay, Card } from "react-native-elements";

import { Avatar, Button } from "@react-native-material/core";
import AppBar from "../../components/common/AppBar";

const PlayerStats = ({
  player,
  onAddPoints,
  onAddAssist,
  onAddRebound,
  onAddBlock,
  onConfirm,
  onAbsent,
  onCancel,
}) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <View style={styles.playerContainer}>
        <TouchableOpacity onPress={toggleOverlay}>
          <Card containerStyle={styles.card}>
            <View style={styles.cardContent}>
              <Avatar
                size={64}
                rounded
                containerStyle={styles.avatarContainer}
                image={player.avatar}
              />
              <View style={styles.textContainer}>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text
                  style={styles.cardText}
                >{`Points: ${player.points}`}</Text>
                <Text
                  style={styles.cardText}
                >{`Assists: ${player.assists}`}</Text>
                <Text
                  style={styles.cardText}
                >{`Rebounds: ${player.rebounds}`}</Text>
                <Text
                  style={styles.cardText}
                >{`Blocks: ${player.blocks}`}</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.overlayContainer}>
          <Avatar
            size={70}
            rounded
            image={player.avatar}
            containerStyle={styles.overlayAvatarContainer}
          />
          <View style={styles.overlayTextContainer}>
            <Text style={styles.overlayText}>{player.name}</Text>
            <Text style={styles.overlayText}>{`Points: ${player.points}`}</Text>
            <Text
              style={styles.overlayText}
            >{`Assists: ${player.assists}`}</Text>
            <Text
              style={styles.overlayText}
            >{`Rebounds: ${player.rebounds}`}</Text>
            <Text style={styles.overlayText}>{`Blocks: ${player.blocks}`}</Text>
            <Text
              style={styles.overlayText}
            >{`Position: ${player.position}`}</Text>
          </View>
        </View>
      </Overlay>
    </>
  );
};

const AliveMatchupScreen = () => {
  const times = {
    teamA: {
      name: "Time A",
      players: [
        {
          id: "1",
          index: 0,
          name: "Lebron James",
          position: "Small Forward; Power Forward",
          points: "28.5 PPG",
          assists: "8.5 APG",
          rebounds: "7.4 RPG",
          blocks: "1.2 BPG",
          status: "Em Dúvida",
          avatar: require("../../../assets/lebron.png"),
        },
        {
          id: "2",
          index: 1,
          name: "Stephen Curry",
          position: "Point Guard",
          points: "32.1 PPG",
          assists: "6.4 APG",
          rebounds: "5.5 RPG",
          blocks: "0.3 BPG",
          status: "Em Dúvida",
          avatar: require("../../../assets/curry.png"),
        },
        {
          id: "3",
          index: 2,
          name: "Kevin Durant",
          position: "Small Forward; Power Forward",
          points: "27.0 PPG",
          assists: "5.9 APG",
          rebounds: "7.1 RPG",
          blocks: "1.1 BPG",
          status: "Em Dúvida",
          avatar: require("../../../assets/durant.png"),
        },
      ],
    },
    teamB: {
      name: "Time B",
      players: [
        {
          id: "5",
          index: 4,
          name: "James Harden",
          position: "Shooting Guard; Point Guard",
          points: "34.3 PPG",
          assists: "7.5 APG",
          rebounds: "6.6 RPG",
          blocks: "0.8 BPG",
          status: "Em Dúvida",
          avatar: require("../../../assets/harden.png"),
        },
        {
          id: "6",
          index: 5,
          name: "Giannis Antetokounmpo",
          position: "Power Forward; Small Forward",
          points: "29.5 PPG",
          assists: "5.6 APG",
          rebounds: "13.6 RPG",
          blocks: "1.0 BPG",
          status: "Em Dúvida",
          avatar: require("../../../assets/giannis.png"),
        },
        {
          id: "7",
          index: 6,
          name: "Anthony Davis",
          position: "Power Forward; Center",
          points: "26.1 PPG",
          assists: "3.2 APG",
          rebounds: "9.3 RPG",
          blocks: "2.4 BPG",
          status: "Em Dúvida",
          avatar: require("../../../assets/davis.png"),
        },
      ],
    },
  };

  const [timer, setTimer] = useState(0);
  const [scores, setScores] = useState({
    teamA: 0,
    teamB: 0,
  });
  const [quarterScores, setQuarterScores] = useState(Array(4).fill(0));

  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const onAddPoints = (playerId, points) => {
    // Implement add points logic
  };

  const onAddAssist = (playerId) => {
    // Implement add assist logic
  };

  const onAddRebound = (playerId, type) => {
    // Implement add rebound logic
  };

  const onAddBlock = (playerId) => {
    // Implement add block logic
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.timerContainerFixed}>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{timer}</Text>
          </View>
          <View style={styles.timerButtonsContainer}>
            <TouchableOpacity style={styles.button} onPress={startTimer}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={stopTimer}>
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Equipes e Jogadores */}
        <View style={styles.teamsContainer}>
          {Object.keys(times).map((teamKey) => (
            <View key={teamKey} style={styles.teamContainer}>
              <Text style={styles.teamName}>{times[teamKey].name}</Text>
              <FlatList
                data={times[teamKey].players}
                keyExtractor={(player) => player.id.toString()}
                renderItem={({ item }) => (
                  <PlayerStats
                    player={item}
                    onAddPoints={onAddPoints}
                    onAddAssist={onAddAssist}
                    onAddRebound={onAddRebound}
                    onAddBlock={onAddBlock}
                  />
                )}
              />
            </View>
          ))}
        </View>

        {/* Pontuações */}
        <View style={styles.scoresContainer}>
          <Button
            title={times.teamA.name + ": " + scores.teamA}
            style={styles.scoreText}
            disabled
          ></Button>
          <Button
            title={times.teamB.name + ": " + scores.teamB}
            style={styles.scoreText}
            disabled
          ></Button>
        </View>

        {/* Pontuações do Quarto */}
        <View style={styles.quarterScoresContainer}>
          {quarterScores.map((score, index) => (
            <Text key={index} style={styles.scoreText}>
              Q{index + 1}: {score}
            </Text>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  timerContainer: {
    marginBottom: 16,
  },
  timerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  timerButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#da733c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  teamsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 120,
    flexGrow: 1,
  },
  teamContainer: {
    alignItems: "center",
    width: "45%",
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  playerContainer: {
    marginBottom: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  scoresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  quarterScoresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
  },
  avatarContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    marginStart: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  overlayContainer: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  overlayAvatarContainer: {
    marginRight: 10,
  },
  overlayTextContainer: {
    flex: 1,
    marginStart: 10,
  },
  overlayText: {
    fontSize: 18,
    marginBottom: 10,
  },
  timerContainerFixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    zIndex: 1,
  },
});

export default AliveMatchupScreen;
