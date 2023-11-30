import React, { useState } from "react";
import { Card, Overlay } from "react-native-elements";
import { Avatar } from "@react-native-material/core";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const PlayersCard = ({ player, onConfirm, onAbsent, onUndecided }) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
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
              <Text style={styles.cardText}>{`Name: ${player.name}`}</Text>
              <Text
                style={styles.cardText}
              >{`Position: ${player.position}`}</Text>
              <Text style={styles.cardText}>{`Status: ${player.status}`}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.overlayContainer}>
          <Avatar
            size={70}
            rounded
            image={player.avatar}
            containerStyle={styles.overlayAvatarContainer}
          />
          <View style={styles.overlayTextContainer}>
            <Text style={styles.overlayText}>{`Name: ${player.name}`}</Text>
            <Text
              style={styles.overlayText}
            >{`Position: ${player.position}`}</Text>
            <Text style={styles.overlayText}>{`Status: ${player.status}`}</Text>
            {/* Adicione as informações adicionais aqui */}
            <Text style={styles.cardText}>{`${player.points}`}</Text>
            <Text style={styles.cardText}>{`${player.assists}`}</Text>
            <Text style={styles.cardText}>{`${player.rebounds}`}</Text>
            <Text style={styles.cardText}>{`${player.blocks}`}</Text>
          </View>
          <View style={styles.overlayButtonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonColar]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonDuvida]}
              onPress={onAbsent}
            >
              <Text style={styles.buttonText}>Ausente</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonNaoColar]}
              onPress={onUndecided}
            >
              <Text style={styles.buttonText}>Em Dúvida</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
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
});

export default PlayersCard;
