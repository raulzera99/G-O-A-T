import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import AppNavigator from "./src/navigator/AppNavigator";
import * as firebase from "firebase/app";
import { firebaseConfig } from "./config.js";
import { auth } from "./src/services/firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator isAuthenticated></AppNavigator>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
