import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "@react-native-material/core";

import "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import firebase from "firebase/app";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Validate that email and password are not empty
      if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      // Authentication with Firebase
      await signInWithEmailAndPassword(getAuth(), email, password);

      // // Verificar se o usuário está na tabela users do Firebase Realtime Database
      // const database = getDatabase();
      // const usersRef = database.ref("users");
      // const snapshot = await usersRef
      //   .orderByChild("email")
      //   .equalTo(email)
      //   .once("value");

      // if (!snapshot.exists()) {
      //   // Se não existir, criar um novo usuário na tabela users
      //   const userId = auth().currentUser.uid;
      //   const fullName = auth().currentUser.fullName;
      //   const nickName = auth().currentUser.nickname;
      //   const newUser = {
      //     fullName,
      //     nickName,
      //     email,
      //   };
      //   await database.ref(`users/${userId}`).set(newUser);
      // }

      alert("Login bem-sucedido!");
      navigation.navigate("MainTabs");
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      alert("Credenciais inválidas. Tente novamente.");
    }
  };

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
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
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link} onPress={navigateToRegister}>
        Não tem uma conta? Cadastre-se aqui
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

export default LoginScreen;
