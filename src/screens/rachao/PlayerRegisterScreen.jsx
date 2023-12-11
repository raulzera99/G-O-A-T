import React, { useState } from "react";
import { Button, TextInput } from "@react-native-material/core";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import StarRating from "react-native-star-rating";

// import AsyncStorage from "@react-native-async-storage/async-storage";
import AppBar from "../../components/common/AppBar";

const PlayerRegisterScreen = ({ navigation }) => {
  const [player, setPlayer] = useState({
    name: "",
    position: "",
    rating: 0,
  });

  const handleInputChange = (field, value) => {
    setPlayer({ ...player, [field]: value });
  };

  const savePlayer = async () => {
    try {
      // Validar se todos os campos estão preenchidos
      if (!player.name || !player.position || player.rating === 0) {
        Alert.alert("Erro", "Por favor, preencha todos os campos.");
        return;
      }

      // Obter jogadores existentes do AsyncStorage
      const existingPlayers = await AsyncStorage.getItem("participants");
      const playersArray = existingPlayers ? JSON.parse(existingPlayers) : [];

      // Adicionar novo jogador ao array
      playersArray.push(player);

      // Salvar array atualizado de jogadores no AsyncStorage
      await AsyncStorage.setItem("participants", JSON.stringify(playersArray));

      // Limpar os campos de entrada
      setPlayer({ name: "", position: "", status: "", rating: 0 });

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
        subtitle="Preencha os dados do jogador ou convidado"
        centerSubtitle={true}
      />
      <ScrollView style={styles.container}>
        <Card containerStyle={styles.card}>
          <TextInput
            label="Nome"
            value={player.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
          {/* Substituído para SelectList */}
          <RNPickerSelect
            placeholder={{ label: "Selecione a posição", value: null }}
            onValueChange={(value) => handleInputChange("position", value)}
            items={[
              { label: "Point Guard (PG)", value: "PG" },
              { label: "Shooting Guard (SG)", value: "SG" },
              { label: "Small Forward (SF)", value: "SF" },
              { label: "Power Forward (PF)", value: "PF" },
              { label: "Center (C)", value: "C" },
            ]}
            style={pickerSelectStyles}
          />
          {/* Adicionado campo para dar nota ao jogador */}
          <StarRating
            disabled={false}
            maxStars={5}
            rating={player.rating}
            selectedStar={(rating) => handleInputChange("rating", rating)}
            fullStarColor={"#FFD700"} // Cor das estrelas preenchidas
            starSize={30}
            containerStyle={styles.starRating}
          />

          <Button
            style={styles.saveButton}
            onPress={savePlayer}
            variant="contained"
            title="Salvar"
          />
        </Card>
      </ScrollView>
    </>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#da733c",
  },
  starRating: {
    marginTop: 10,
  },
});

export default PlayerRegisterScreen;
