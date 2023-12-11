import React from "react";
import { View, Alert } from "react-native";
import { Button } from "@react-native-material/core";
import Icon from "react-native-vector-icons/FontAwesome";
import AppBar from "../../components/common/AppBar";
import firebase from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import User from "../../models/User";

const AjustesScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Realizar logout no Firebase
    getAuth().signOut();

    // Redirecionar para a tela inicial
    navigation.reset({
      index: 0,
      routes: [{ name: "G O A T" }],
    });
  };

  const clearAllDataAndReset = async () => {
    try {
      // Limpar dados locais (se necessário)
      // ...

      // Realizar logout no Firebase
      firebase.auth().signOut();

      // Redirecionar para a tela inicial
      navigation.reset({
        index: 0,
        routes: [{ name: "G O A T" }],
      });

      Alert.alert(
        "Dados Apagados e Aplicação Resetada",
        "Todos os dados locais foram apagados e a aplicação foi resetada com sucesso.",
        [{ text: "OK", onPress: () => console.log("Alerta fechado.") }]
      );
    } catch (error) {
      console.error("Erro ao apagar dados: ", error);
    }
  };

  const clearTasks = async () => {
    try {
      // Limpar tarefas no Firebase Realtime Database
      const userId = firebase.auth().currentUser.uid;
      await firebase.database().ref(`users/${userId}/tasks`).remove();

      Alert.alert(
        "Tarefas Apagadas",
        "Todas as tarefas foram apagadas com sucesso.",
        [{ text: "OK", onPress: () => console.log("Alerta fechado.") }]
      );

      // Redirecionar para a tela inicial
      navigation.reset({
        index: 0,
        routes: [{ name: "G O A T" }],
      });
    } catch (error) {
      console.error("Erro ao apagar tarefas: ", error);
    }
  };

  return (
    <>
      <AppBar
        title="Ajustes"
        subtitle="Configurações de usuário e do grupo"
        centerSubtitle={true}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Logout"
          onPress={handleLogout}
          leading={<Icon name="sign-out" size={25} color="#FFF" />}
          style={{ marginBottom: 20 }}
        />

        <Button
          title="Apagar todas as tarefas"
          onPress={() =>
            Alert.alert(
              "Apagar tarefas",
              "Tem certeza que deseja apagar todas as tarefas? Essa ação não pode ser desfeita.",
              [
                {
                  text: "Cancelar",
                  onPress: () => console.log("Apagar tarefas cancelado."),
                  style: "cancel",
                },
                { text: "Apagar", onPress: clearTasks },
              ]
            )
          }
          leading={<Icon name="trash" size={25} color="#FFF" />}
          color="#FF0000"
          style={{ marginBottom: 20 }}
        />

        <Button
          title="Limpar Dados Locais e Resetar"
          onPress={clearAllDataAndReset}
          color="#FF0000"
        />
      </View>
    </>
  );
};

export default AjustesScreen;
