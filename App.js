import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import AppNavigator from "./src/navigator/AppNavigator";
import { getApps, initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDn5K1WCyk7A3716GQ81ZM2h-COedMu2iA",
  authDomain: "basketball-teams-3a9c2.firebaseapp.com",
  databaseURL: "https://g-o-a-t-7e34e-default-rtdb.firebaseio.com/",
  projectId: "g-o-a-t-7e34e",
  storageBucket: "basketball-teams-3a9c2.appspot.com",
  messagingSenderId: "104927386167",
  appId: "104927386167",
  measurementId: "G-9XZ8XZ7GQK",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator />
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
