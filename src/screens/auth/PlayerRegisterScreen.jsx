import React from "react";
import { Card, Text } from "@react-native-material/core";
import { View, StyleSheet } from "react-native";
import { Avatar } from "@react-native-material/core";
import { Overlay } from "react-native-elements";
import AppBar from "../../components/common/AppBar";

const PlayerRegisterScreen = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <>
      <AppBar
        title="Cadastro de Jogador"
        subtitle="Preencha os dados do jogador"
      />
      <Card style={styles.card}>
        <Text style={styles.cardText}>{`Name: ${player.name}`}</Text>
        <Text style={styles.cardText}>{`Position: ${player.position}`}</Text>
        <Text style={styles.cardText}>{`Status: ${player.status}`}</Text>
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
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
