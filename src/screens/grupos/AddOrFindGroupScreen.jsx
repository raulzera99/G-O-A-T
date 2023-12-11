import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AppBar from "../../components/common/AppBar";

const AddOrFindGroupScreen = ({ navigation }) => {
  const handleCreateGroup = () => {
    // Logic to navigate to the group creation screen
    navigation.navigate("CreateGroupScreen");
  };

  const handleFindGroup = () => {
    // Logic to navigate to the group search screen
    navigation.navigate("FindGroupScreen");
  };

  return (
    <View style={styles.container}>
      <AppBar title="Rachão" subtitle="Encontrar ou criar um grupo" />
      <View style={styles.card}>
        <Text style={styles.header}>Escolha uma opção:</Text>

        <TouchableOpacity
          style={[styles.button, styles.buttonAdicionar]}
          onPress={handleCreateGroup}
        >
          <Text style={styles.buttonText}>Criar Novo Grupo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonAdicionar]}
          onPress={handleFindGroup}
        >
          <Text style={styles.buttonText}>Encontrar Grupo Existente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddOrFindGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    elevation: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonAdicionar: {
    backgroundColor: "#da733c",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
