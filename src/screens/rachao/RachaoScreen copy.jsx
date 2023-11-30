import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AppBar from "../../components/common/AppBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RachaoScreen = ({ navigation }) => {
  const [nextRachao, setNextRachao] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    // Função para carregar os rachões e participantes do AsyncStorage
    const loadData = async () => {
      try {
        const rachoesData = await AsyncStorage.getItem("rachoes");
        const participantsData = await AsyncStorage.getItem("participants");

        if (rachoesData) {
          const parsedRachoes = JSON.parse(rachoesData);
          const now = new Date();

          // Encontrar o próximo rachão com data maior que a atual
          const nextRachao = parsedRachoes.find(
            (rachao) => new Date(rachao.date) > now
          );

          setNextRachao(nextRachao);
        }

        if (participantsData) {
          const parsedParticipants = JSON.parse(participantsData);
          setParticipants(parsedParticipants);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    // Chamando a função de carregamento ao montar o componente
    loadData();
  }, []);

  const handleStatusUpdate = async (participantIndex, status) => {
    // Atualiza o status de um participante e salva no AsyncStorage
    const updatedParticipants = [...participants];
    updatedParticipants[participantIndex].status = status;

    try {
      await AsyncStorage.setItem(
        "participants",
        JSON.stringify(updatedParticipants)
      );
      setParticipants(updatedParticipants);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const handleAddRachao = () => {
    // Lógica para adicionar um novo rachão
    // ...
    // Redirecionar para a tela de adicionar rachão
    navigation.navigate("AddRachaoScreen");
    // Exemplo de como você poderia atualizar a lista de rachões após adicionar um novo
    //setNextRachao(novoRachao);
  };

  return (
    <View style={styles.container}>
      <AppBar
        title="Rachão"
        subtitle={nextRachao ? "Próximo rachão" : "Sem rachões agendados"}
      />
      {nextRachao ? (
        // Se existe um próximo rachão, exibir informações e botões de participantes
        <>
          <Text style={styles.header}>Próximo Rachão</Text>
          <Text style={styles.subtitle}>
            Data: {nextRachao.date} - {nextRachao.time}{" "}
          </Text>
          <Text style={styles.subtitle}>Local: {nextRachao.location} </Text>

          <ScrollView style={styles.container}>
            {participants.map((participant, index) => (
              <View key={index} style={styles.participantContainer}>
                <Text style={styles.participantName}>{participant.name}</Text>
                <TouchableOpacity
                  style={[styles.button, styles.buttonColar]}
                  onPress={() => handleStatusUpdate(index, "Colar")}
                >
                  <Text style={styles.buttonText}>Colar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buttonDuvida]}
                  onPress={() => handleStatusUpdate(index, "Em dúvida")}
                >
                  <Text style={styles.buttonText}>Em dúvida</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buttonNaoColar]}
                  onPress={() => handleStatusUpdate(index, "Não vou colar")}
                >
                  <Text style={styles.buttonText}>Não vou colar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </>
      ) : (
        // Se não existe um próximo rachão, mostrar o botão para adicionar um novo
        <TouchableOpacity
          style={[styles.button, styles.buttonAdicionar]}
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
    padding: 20,
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
    marginBottom: 10,
    alignItems: "center",
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});


















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
import { HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AppBar from "../../components/common/AppBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RachaoScreen = ({ navigation }) => {
  const [nextRachao, setNextRachao] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [confirmedPlayers, setConfirmedPlayers] = useState([]);
  const [absentPlayers, setAbsentPlayers] = useState([]);
  const [undecidedPlayers, setUndecidedPlayers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load mock data for demonstration
        const mockParticipants = [
          { id: "1", name: "Player 1" },
          { id: "2", name: "Player 2" },
          { id: "3", name: "Player 3" },
          // Add more players as needed
        ];

        // Set mock data in state
        setNextRachao({ date: "2023-11-15", time: "18:00", location: "Court" });
        setParticipants(mockParticipants);

        // Retrieve saved participant statuses
        const participantsStatusData = await AsyncStorage.getItem(
          "participantsStatus"
        );

        if (participantsStatusData) {
          const parsedStatusData = JSON.parse(participantsStatusData);
          setConfirmedPlayers(parsedStatusData.confirmed || []);
          setAbsentPlayers(parsedStatusData.absent || []);
          setUndecidedPlayers(parsedStatusData.undecided || []);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  const handleStatusUpdate = async (participantIndex, status) => {
    // Update the status of a participant and save to AsyncStorage
    const updatedParticipants = [...participants];
    updatedParticipants[participantIndex].status = status;

    try {
      await AsyncStorage.setItem(
        "participants",
        JSON.stringify(updatedParticipants)
      );
      setParticipants(updatedParticipants);
      updateStatusLists(updatedParticipants);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const updateStatusLists = (participants) => {
    // Update confirmed, absent, and undecided player lists
    const confirmed = participants.filter(
      (participant) => participant.status === "Confirmed"
    );
    const absent = participants.filter(
      (participant) => participant.status === "Absent"
    );
    const undecided = participants.filter(
      (participant) => participant.status === "Undecided"
    );

    setConfirmedPlayers(confirmed);
    setAbsentPlayers(absent);
    setUndecidedPlayers(undecided);

    // Save status lists to AsyncStorage
    try {
      const statusData = {
        confirmed,
        absent,
        undecided,
      };
      AsyncStorage.setItem("participantsStatus", JSON.stringify(statusData));
    } catch (error) {
      console.error("Error saving status data:", error);
    }
  };

  const handlePlayerDetails = (participant) => {
    // Display player details in a popup
    Alert.alert("Player Details", `Name: ${participant.name}`);
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

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const renderPlayerItem = ({ item }) => (
    <View style={styles.participantContainer}>
      <TouchableOpacity
        style={styles.buttonPlayer}
        onPress={() => handlePlayerDetails(item)}
      >
        <Text style={styles.buttonText}>{item.name}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonConfirm}
        onPress={() => handleConfirmAttendance(item)}
      >
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );

  const data = [
    { title: "Confirmados", data: confirmedPlayers },
    { title: "Ausentes", data: absentPlayers },
    { title: "Em Dúvida", data: undecidedPlayers },
  ];

  return (
    <View style={styles.container}>
      <AppBar
        title="Rachão"
        subtitle={nextRachao ? "Próximo rachão" : "Sem rachões agendados"}
      />
      {nextRachao ? (
        <>
          <Text style={styles.header}>Próximo Rachão</Text>
          <Text style={styles.subtitle}>
            Data: {nextRachao.date} - {nextRachao.time}
          </Text>
          <Text style={styles.subtitle}>Local: {nextRachao.location}</Text>

          <ScrollView style={styles.container}>
            {participants.map((participant, index) => (
              <View key={index}>
                <Text style={styles.participantName}>{participant.name}</Text>
                <TouchableOpacity
                  style={[styles.button, styles.buttonColar]}
                  onPress={() => handleStatusUpdate(index, "Confirmed")}
                >
                  <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buttonDuvida]}
                  onPress={() => handleStatusUpdate(index, "Absent")}
                >
                  <Text style={styles.buttonText}>Ausente</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buttonNaoColar]}
                  onPress={() => handleStatusUpdate(index, "Undecided")}
                >
                  <Text style={styles.buttonText}>Em Dúvida</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </>
      ) : (
        <TouchableOpacity
          style={[styles.button, styles.buttonAdicionar]}
          onPress={handleAddRachao}
        >
          <Text style={styles.buttonText}>ADICIONAR RACHÃO</Text>
        </TouchableOpacity>
      )}

      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={renderPlayerItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
};

export default RachaoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
});

