import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import AppNavigator from "./src/navigator/AppNavigator";
import * as firebase from "firebase/app";
import { firebaseConfig } from "./config.js";
import { auth } from "./src/services/firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

// if (firebase.getApps().length) {
//   firebase.initializeApp(firebaseConfig);
// }

// firebase.initializeApp(firebaseConfig);
// import { getApps, initializeApp } from "firebase/app";
// import {
//   getAuth,
//   initializeAuth,
//   createUserWithEmailAndPassword,
//   getReactNativePersistence,
// } from "firebase/auth";
// import { getDatabase, ref, set } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyDn5K1WCyk7A3716GQ81ZM2h-COedMu2iA",
//   authDomain: "g-o-a-t-7e34e.firebaseapp.com",
//   databaseURL: "https://g-o-a-t-7e34e-default-rtdb.firebaseio.com",
//   projectId: "g-o-a-t-7e34e",
//   storageBucket: "g-o-a-t-7e34e.appspot.com",
//   messagingSenderId: "104927386167",
//   appId: "1:104927386167:web:93fd0c8007e271b3103db2",
//   measurementId: "G-ENNGQ74R8X",
// };

// // Initialize Firebase

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// if (!getApps().length) {
//   // const app = initializeApp(firebaseConfig);
//   // console.log(app);
//   // const auth = getAuth(app, {
//   //   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
//   // });
//   // console.log(auth);
//   // const db = getDatabase(app);
//   // console.log(db);
//   // const usersRef = ref(db, "users/");
//   // console.log(usersRef);
// }

// verifica se esta logado e se sim, isAuth = true

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
