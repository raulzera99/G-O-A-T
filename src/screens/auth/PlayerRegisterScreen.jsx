import React, { useState } from "react";
import { Card, Text, Input, Button } from "@react-native-material/core";
import { View, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppBar from "../../components/common/AppBar";

const PlayerRegisterScreen = ({ navigation }) => {
  const [player, setPlayer] = useState({
    name: "",
    position: "",
    status: "",
  });

  const handleInputChange = (field, value) => {
    setPlayer({ ...player, [field]: value });
  };

  const savePlayer = async () => {
    try {
      // Validar se todos os campos estão preenchidos
      if (!player.name || !player.position || !player.status) {
        Alert.alert("Erro", "Por favor, preencha todos os campos.");
        return;
      }

      // Obter jogadores existentes do AsyncStorage
      const existingPlayers = await AsyncStorage.getItem("players");
      const playersArray = existingPlayers ? JSON.parse(existingPlayers) : [];

      // Adicionar novo jogador ao array
      playersArray.push(player);

      // Salvar array atualizado de jogadores no AsyncStorage
      await AsyncStorage.setItem("players", JSON.stringify(playersArray));

      // Limpar os campos de entrada
      setPlayer({ name: "", position: "", status: "" });

      // Navegar para a tela anterior ou realizar outra ação
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar jogador:", error);
    }
  };

  return (
    <>
      <AppBar
        title="Cadastro de Jogador"
        subtitle="Preencha os dados do jogador"
      />
      <Card style={styles.card}>
        <Input
          label="Nome"
          value={player.name}
          onChangeText={(value) => handleInputChange("name", value)}
        />
        <Input
          label="Posição"
          value={player.position}
          onChangeText={(value) => handleInputChange("position", value)}
        />
        <Input
          label="Status"
          value={player.status}
          onChangeText={(value) => handleInputChange("status", value)}
        />

        <Button style={styles.saveButton} onPress={savePlayer} mode="contained">
          Salvar Jogador
        </Button>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    elevation: 2,
  },
  saveButton: {
    marginTop: 20,
  },
});

export default PlayerRegisterScreen;
