import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SectionList,
  Alert,
} from "react-native";
import { HStack, IconButton, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AppBar from "../../components/common/AppBar";
import PlayersCard from "../../../src/components/PlayersCard";
import { auth } from "../../services/firebaseConfig";
import {
  getDatabase,
  ref,
  set,
  get,
  orderByChild,
  equalTo,
  once,
  exists,
  onValue,
  query,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// import AsyncStorage from "@react-native-async-storage/async-storage";

// import AsyncStorage from "@react-native-async-storage/async-storage";

const RachaoScreen = ({ navigation }) => {
  const [nextRachao, setNextRachao] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [confirmedPlayers, setConfirmedPlayers] = useState([]);
  const [absentPlayers, setAbsentPlayers] = useState([]);
  const [undecidedPlayers, setUndecidedPlayers] = useState([]);
  const [selectedParticipantIndex, setSelectedParticipantIndex] =
    useState(null);
  const [hasGroups, setHasGroups] = useState(false);

  const loadData = async () => {
    try {
      // // Get login data from AsyncStorage
      // const userFullName = await AsyncStorage.getItem("fullName");
      // const userPosition = await AsyncStorage.getItem("position");
      // const userPoints = await AsyncStorage.getItem("points");
      // const userAssists = await AsyncStorage.getItem("assists");
      // const userRebounds = await AsyncStorage.getItem("rebounds");

      // Get login data from Firebase
      const userFullName = auth.userFullName;
      const userPosition = auth.userPosition;
      const userPoints = auth.userPoints;
      const userAssists = auth.userAssists;
      const userRebounds = auth.userRebounds;

      const database = getDatabase();

      // // Verify next rachao on Firebase
      // const nextRachaoRef = ref(database, "nextRachao");
      // nextRachaoRef.on("value", (snapshot) => {
      //   const data = snapshot.val();
      //   console.log("Next Rachao Data:", data);
      //   setNextRachao(data);
      // });

      // // Verify participants on Firebase
      // const participantsRef = getDatabase().ref("participants");
      // participantsRef.on("value", (snapshot) => {
      //   const data = snapshot.val();
      //   console.log("Participants Data:", data);
      //   setParticipants(data);
      // });

      // // Verify confirmed players on Firebase
      // const confirmedPlayersRef = getDatabase().ref("confirmedPlayers");
      // confirmedPlayersRef.on("value", (snapshot) => {
      //   const data = snapshot.val();
      //   console.log("Confirmed Players Data:", data);
      //   setConfirmedPlayers(data);
      // });

      // // Verify absent players on Firebase
      // const absentPlayersRef = getDatabase().ref("absentPlayers");
      // absentPlayersRef.on("value", (snapshot) => {
      //   const data = snapshot.val();
      //   console.log("Absent Players Data:", data);
      //   setAbsentPlayers(data);
      // });

      // Load mock data for demonstration
      const mockParticipants = [
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
          avatar: require("../../../assets/curry.png"), // Corrigir a leitura da propriedade avatar
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
        {
          id: "4",
          index: 3,
          name: { userFullName },
          position: { userPosition },
          status: "Em Dúvida",
          avatar: require("../../../assets/user.png"),
        },
        // Add more players as needed
      ];
      console.log("Mock Participants:", mockParticipants);

      // Set mock data in state
      // setNextRachao({ date: "2023-11-15", time: "18:00", location: "Court" });
      // setParticipants(mockParticipants);
      // updateStatusLists(mockParticipants);

      // Retrieve saved participant statuses
      // const participantsStatusData = await AsyncStorage.getItem("participants");

      // console.log("Participants Status Data:", participantsStatusData);

      // if (participantsStatusData) {
      //   const parsedStatusData = JSON.parse(participantsStatusData);
      //   console.log("Parsed Status Data:", parsedStatusData);
      //   setConfirmedPlayers(parsedStatusData.confirmed || []);
      //   setAbsentPlayers(parsedStatusData.absent || []);
      //   setUndecidedPlayers(parsedStatusData.undecided || []);
      // }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    // Load data when the screen is focused
    const focusListener = navigation.addListener("focus", () => {
      loadData();
      checkUserGroups();
    });

    // Load data when the screen is mounted
    loadData();

    const checkUserGroups = async () => {
      try {
        // const user = getAuth().currentUser;

        const userHasGroups = await userHasAnyGroup(auth.currentUser.uid);
        setHasGroups(userHasGroups);
      } catch (error) {
        console.error("Error checking user groups:", error);
      }
    };

    return () => {
      checkUserGroups();
      // Remove the event listener to prevent multiple calls
      focusListener();
    };
  }, []);

  const handleStatusUpdate = async (participantIndex, status) => {
    const updatedParticipants = participants.map((participant, index) =>
      index === participantIndex ? { ...participant, status } : participant
    );

    try {
      await AsyncStorage.setItem(
        "participants",
        JSON.stringify(updatedParticipants)
      );
      setParticipants(updatedParticipants);
      updateStatusLists(updatedParticipants);
      console.log("Status updated successfully.");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAddRachao = () => {
    // Implement the logic to add a new rachão
    // ...

    // For demonstration purposes, you can navigate to another screen
    navigation.navigate("AddRachaoScreen");
  };

  const updateStatusLists = (participants) => {
    // Atualizar listas de jogadores confirmados, ausentes e em dúvida
    const confirmed = participants.filter(
      (participant) => participant.status === "Confirmed"
    );
    const absent = participants.filter(
      (participant) => participant.status === "Absent"
    );
    const undecided = participants.filter(
      (participant) => participant.status === "Em Dúvida"
    );

    setConfirmedPlayers(confirmed);
    setAbsentPlayers(absent);
    setUndecidedPlayers(undecided);

    // Salvar listas de status no AsyncStorage
    try {
      const statusData = {
        confirmed,
        absent,
        undecided,
      };
      console.log("Status Data Saving:", statusData);
      // AsyncStorage.setItem("participants", JSON.stringify(statusData));
    } catch (error) {
      console.error("Error saving status data:", error);
    }
  };

  const handlePlayerDetails = (participant) => {
    // Exibir mais detalhes do jogador
    Alert.alert(
      "Detalhes do Jogador",
      `Nome: ${participant.name}\nPosição: ${participant.position}\nStatus: ${participant.status}`
    );
  };

  const handleConfirmAttendance = (participant) => {
    // Display confirmation popup
    Alert.alert(
      "Confirm Attendance",
      `Do you confirm attendance for ${participant.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => handleStatusUpdate(participant.index, "Confirmed"),
        },
      ]
    );
  };

  // Function to handle the fixed button click
  const handleFixedButtonClick = () => {
    // Lógica para confirmar presença ou ausência
    if (selectedParticipantIndex !== null) {
      Alert.alert(
        "Confirmar Presença",
        `Confirmar presença para ${participants[selectedParticipantIndex].name}?`,
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Confirmar",
            onPress: () =>
              handleStatusUpdate(selectedParticipantIndex, "Confirmed"),
          },
        ]
      );
    }
  };

  // Function to handle the temporary button click
  const handleAddPlayerTemporary = () => {
    // Redirecionar para a tela de adicionar jogador
    navigation.navigate("PlayerRegisterScreen");
  };

  // Function to handle the sort teams button click
  const handleSortTeams = () => {
    // Redirecionar para a tela de sorteio de times
    navigation.navigate("SortTeamsScreen");
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const renderPlayerItem = ({ item, index, section }) => {
    console.log("Rendering player item:", item);
    return (
      <PlayersCard
        player={item}
        onDetails={() => handlePlayerDetails(item)}
        onConfirm={() => handleStatusUpdate(index, "Confirmed")}
        onAbsent={() => handleStatusUpdate(index, "Absent")}
        onUndecided={() => {
          setSelectedParticipantIndex(index);
          Alert.alert(
            "Confirm Attendance",
            `Do you confirm attendance for ${item.name}?`,
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Confirm",
                onPress: () => handleStatusUpdate(index, "Confirmed"),
              },
            ]
          );
        }}
      />
    );
  };

  const data = [
    { title: "Confirmados", data: confirmedPlayers },
    { title: "Ausentes", data: absentPlayers },
    { title: "Em Dúvida", data: undecidedPlayers },
  ];

  // const userHasAnyGroup = async (userId) => {
  //   try {
  //     const db = getDatabase();
  //     const playersRef = ref(db, "players/");

  //     // Search the player with the column "user_id" equal to the current user id
  //     onValue(playersRef, (snapshot) => {
  //       const result = false;
  //       const players = snapshot.val();
  //       for (let id in players) {
  //         if (players[id].user_id.includes(userId)) {
  //           console.log("Player found for the current user.", players[id]);
  //           const playerData = players[id];
  //           return true;
  //         }
  //       }

  //       if (!result) {
  //         console.log("Player not found for the current user.");
  //       }
  //     });

  //     const playerGroupRef = ref(db, "players/");

  //     // Search the players with the column "group_id" equal to the current group id
  //     onValue(playerGroupRef, (snapshot) => {
  //       const final = false;
  //       const players = snapshot.val();
  //       for (let id in players) {
  //         if (players[id].group_id === playerData.group_id) {
  //           console.log("Group found for the current player.", players[id]);
  //           return true;
  //         }
  //       }

  //       if (!final) {
  //         console.log("Group not found for the current player.");
  //       }
  //     });

  //     return false;
  //   } catch (error) {
  //     console.error("Error checking user groups:", error);
  //   }
  // };

  const userHasAnyGroup1 = async (userId) => {
    try {
      const db = getDatabase();
      const playersRef = ref(db, "players/");
      // Search the player with the column "user_id" equal to the current user id
      onValue(playersRef, (snapshot) => {
        const players = snapshot.val();
        for (let id in players) {
          if (players[id].user_id.includes(userId)) {
            console.log("Player found for the current user.");
            return true;
          }
        }
        console.log("Player not found for the current user.");
        return false;
      });

      // const playerGroupRef = ref(db, "players/");
      // Search the players with the column "group_id" equal to the current group id
      onValue(playersRef, (snapshot) => {
        const players = snapshot.val();
        for (let id in players) {
          if (players[id].group_id === playerData.group_id) {
            console.log("Group found for the current player.");
            return true;
          }
        }
        console.log("Group not found for the current player.");
        return false;
      });
    } catch (error) {
      console.error("Error checking user groups:", error);
      return false; // Returns false in case of an error
    }
  };

  const userHasAnyGroup = async (userId) => {
    try {
      const db = getDatabase();
      const playersRef = ref(db, "players/");

      return new Promise((resolve, reject) => {
        let result = false;
        let final = false;

        onValue(playersRef, (snapshot) => {
          const players = snapshot.val();
          for (let id in players) {
            if (players[id].user_id.includes(userId)) {
              console.log("Player found for the current user.", players[id]);
              const playerData = players[id];

              const playerGroupRef = ref(db, "players/");

              onValue(playerGroupRef, (snapshot) => {
                const players = snapshot.val();
                for (let id in players) {
                  if (players[id].group_id === playerData.group_id) {
                    console.log(
                      "Group found for the current player.",
                      players[id]
                    );
                    final = true;
                  }
                }

                if (!final) {
                  console.log("Group not found for the current player.");
                }
                result = false;

                resolve(result);
              });
            }
          }

          if (!result) {
            console.log("Player not found for the current user.");
            resolve(result);
          }
        });
      });
    } catch (error) {
      console.error("Error checking user groups:", error);
      return false; // Returns false in case of an error
    }
  };

  // if (!hasGroups) {
  //   return (
  //     <View style={styles.container}>
  //       <AppBar title="Rachão" subtitle={"Encontre ou crie um grupo"} />
  //       <View style={styles.card}>
  //         <Text style={styles.header}>Você não está em nenhum grupo.</Text>
  //         <Text style={styles.subtitle}>
  //           Para participar de um rachão, você precisa estar em um grupo.
  //         </Text>

  //         <TouchableOpacity
  //           style={(styles.button, styles.buttonAdicionar)}
  //           onPress={() => navigation.navigate("AddOrFindGroupScreen")}
  //         >
  //           <Text style={styles.buttonText}>Encontrar ou criar grupo</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <AppBar
        title="Rachão"
        subtitle={
          false
            ? `    Próximo rachão ${nextRachao.date} - ${nextRachao.time}`
            : "Sem rachões agendados"
        }
      />
      {nextRachao ? (
        <>
          <SectionList
            sections={data}
            keyExtractor={(item, index = 0) => `${item.id}-${index}`}
            renderItem={renderPlayerItem}
            renderSectionHeader={renderSectionHeader}
          />
          <View style={styles.buttonContainer}>
            {/* Botão Fixo */}
            <TouchableOpacity
              style={styles.fixedButton}
              onPress={handleFixedButtonClick}
            >
              <Text style={styles.fixedButtonText}>
                Confirmar Presença / Ausência
              </Text>
            </TouchableOpacity>

            {/* Botão Adicionar Convidado */}
            <TouchableOpacity
              style={[styles.button, styles.buttonAdicionar]}
              onPress={handleAddPlayerTemporary}
            >
              <Text style={styles.buttonText}>Adicionar Convidado</Text>
            </TouchableOpacity>

            {/* Botão Sortear Times */}
            <TouchableOpacity
              style={[styles.button, styles.buttonSortear]}
              onPress={handleSortTeams}
            >
              <Text style={styles.buttonText}>Sortear times</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonAdicionar,
            styles.buttonAddRachao,
          ]}
          onPress={handleAddRachao}
        >
          <Text style={styles.buttonText}>ADICIONAR RACHÃO</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RachaoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  participantContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  participantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    margin: 5,
  },
  buttonColar: {
    backgroundColor: "#4CAF50",
  },
  buttonDuvida: {
    backgroundColor: "#FFD700",
  },
  buttonNaoColar: {
    backgroundColor: "#FF6347",
  },
  buttonAdicionar: {
    backgroundColor: "#da733c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonAddRachao: {
    backgroundColor: "#da733c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
    height: 25,
    maxHeight: 50,
  },
  buttonSortear: {
    backgroundColor: "#da733c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonPlayer: {
    backgroundColor: "#da733c",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 5,
  },
  buttonConfirm: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 5,
  },
  sectionHeader: {
    backgroundColor: "#f2f2f2",
    padding: 10,
  },
  sectionHeaderText: {
    fontWeight: "bold",
  },
  fixedButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#da733c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  fixedButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingBottom: 80,
  },
});
