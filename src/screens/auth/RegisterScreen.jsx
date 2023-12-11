import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "@react-native-material/core";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import { auth } from "../../services/firebaseConfig";
import User from "../../models/User";
import Player from "../../models/Player";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      // Criar um novo usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Criar um novo usuário no Firebase Realtime Database
      const userId = userCredential.user.uid;
      const database = getDatabase();
      set(ref(database, `users/${userId}`), {
        fullName,
        nickname,
        email,
        user_id: userId,
      });

      // Push the new player to the "players" table
      const newPlayerRef = push(ref(database, "players"));
      const playerId = newPlayerRef.key;

      const newPlayer = {
        name: fullName,
        points: 0,
        assists: 0,
        rebounds: 0,
        blocks: 0,
        steals: 0,
        match_id: [""],
        user_id: [userId],
        team_id: [""],
        group_id: [""],
        player_id: playerId,
      };

      //Set the player id to the new player
      await set(ref(database, `players/${playerId}`), newPlayer);

      alert("Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao cadastrar: ", error);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        onChangeText={(text) => setFullName(text)}
        value={fullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        onChangeText={(text) => setNickname(text)}
        value={nickname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Cadastrar" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Já tem uma conta? Faça login aqui
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFAD80",
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  link: {
    marginTop: 10,
    color: "blue",
  },
});

export default RegisterScreen;
