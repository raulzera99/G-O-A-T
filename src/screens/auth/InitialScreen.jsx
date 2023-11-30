import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Text, Button } from "@react-native-material/core"; // Certifique-se de que a importação esteja correta

const InitialScreen = ({ navigation }) => {
  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Conteúdo principal */}
      <View style={styles.mainContent}>
        {/* Imagem e texto à esquerda */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/initial-pagelogo.png")}
            style={styles.logo}
          />
          <Text style={styles.logoText}>GOAT {"\n\n"}GREATEST OF ALL TIME</Text>
        </View>

        {/* Texto "Seja bem-vindo" */}
        <Text style={styles.welcomeText}>SEJA BEM-VINDO</Text>
        <Text style={styles.subtitleText}>
          A melhor forma de organizar seu grupo no basquete
        </Text>

        {/* Botões de entrada */}
        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleButtonText}>Entrar com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.emailButton}>
          <Text style={styles.appleButtonText}>Entrar com Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.link}>Já tem uma conta? Faça login aqui</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFAD80",
  },
  navText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  mainContent: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginRight: 10,
    marginStart: 5,
    marginTop: 50,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    width: 150,
  },
  googleButton: {
    width: 300,
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 80,
  },
  emailButton: {
    width: 300,
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  googleButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  appleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    marginTop: 15,
    color: "black",
  },
});

export default InitialScreen;
