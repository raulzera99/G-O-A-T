// CreateGroupScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  getDatabase,
  ref,
  push,
  get,
  set,
  orderByChild,
  exists,
  equalTo,
  onValue,
  off,
} from "firebase/database";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  where,
  doc,
  query,
  setDoc,
} from "firebase/firestore";

import { auth } from "../../services/firebaseConfig";

import AppBar from "../../components/common/AppBar";

const CreateGroupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");

  const handleCreateGroup = async () => {
    try {
      // Ensure that the user is authenticated
      if (!auth.currentUser || !auth.currentUser.uid) {
        console.error(
          "User is not authenticated or userId is undefined.",
          auth
        );
        // Handle the error appropriately (e.g., show an error message to the user)
        return;
      }

      // Get a reference to the database
      const database = getDatabase();

      // Search the player with the column "user_id" containing the current user id
      const playersRef = ref(database, "players/");
      const playerQuery = query(
        playersRef,
        orderByChild("user_id"),
        where("user_id", "array-contains", auth.currentUser.uid)
      );
      const playerSnapshot = await get(playerQuery);

      console.log("Player Snapshot:", playerSnapshot.val());

      // Check if the player exists
      if (playerSnapshot.exists()) {
        const playerId = Object.keys(playerSnapshot.val())[0];

        // Push the new group to the "groups" node in the database
        const newGroupRef = push(ref(database, "groups"));
        const newGroupId = newGroupRef.key;

        // Create a new group object with name and description
        const newGroup = {
          name,
          description,
          city,
          location,
          user_admin: [auth.currentUser.uid],
          group_id: newGroupId,
        };

        // Set the group data at the new group reference
        await set(ref(database, `groups/${newGroupId}`), newGroup);

        // Update the player's group_id
        const playerGroupIds = playerSnapshot.val()[playerId].group_id || [];
        playerGroupIds.push(newGroupId);
        await set(
          ref(database, `players/${playerId}/group_id`),
          playerGroupIds
        );

        // After creating the group and updating the player, navigate to the RachaoScreen or any other screen
        navigation.navigate("MainTabs");
      } else {
        console.error("Player not found for the current user.");
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };
  const handleCreateGroup1 = async () => {
    try {
      // Ensure that the user is authenticated
      if (!auth.currentUser || !auth.currentUser.uid) {
        console.error(
          "User is not authenticated or userId is undefined.",
          auth
        );
        // Handle the error appropriately (e.g., show an error message to the user)
        return;
      }

      // Get a reference to the database
      const database = getDatabase();
      const playersRef = ref(database, "players/");

      return new Promise((resolve, reject) => {
        let result = true;

        // Push the new group to the "groups" node in the database
        const newGroupRef = push(ref(database, "groups/"));
        const newGroupId = newGroupRef.key;

        // Create a new group object with name and description
        const newGroup = {
          name,
          description,
          city,
          location,
          user_admin: [auth.currentUser.uid],
          group_id: newGroupId,
        };

        // Set the group data vinculated to the player which is the current user
        const playerQuery = query(
          playersRef,
          orderByChild("user_id"),
          equalTo(auth.currentUser.uid)
        );
        const playerSnapshot = onValue(playerQuery, (snapshot) => {
          const players = snapshot.val();
          if (result) {
            for (let id in players) {
              if (players[id].user_id.includes(auth.currentUser.uid)) {
                console.log("Player found for the current user:", players[id]);
                const playerData = players[id];
                // Update the player's group_id
                const playerGroupIds = playerData.group_id || [];
                playerGroupIds.push(newGroupId);
                set(ref(database, `players/${id}/group_id`), playerGroupIds);

                // After creating the group and updating the player, navigate to the RachaoScreen or any other screen
                // navigation.navigate("MainTabs");

                // Resolve the promise
                // result = false;
                resolve(result);
                off();
                return;
              }
            }
          }

          // If the loop completes without finding a player, reject the promise
          if (!result) {
            console.error("Player not found for the current user.");
          }
        });
        // const playerSnapshot = await get(playerQuery);

        // console.log("Player Snapshot:", playerSnapshot.val());

        // // Set the group data at the new group reference
        // set(ref(database, `groups/${newGroupId}`), newGroup);

        // onValue(playersRef, (snapshot) => {
        //   const players = snapshot.val();
        //   const i = false;
        //   if (result) {
        //     for (let id in players) {
        //       if (players[id].user_id.includes(auth.currentUser.uid)) {
        //         console.log("Player found for the current user:", players[id]);
        //         const playerData = players[id];
        //         i = true;
        //         // Update the player's group_id
        //         const playerGroupIds = playerData.group_id || [];
        //         playerGroupIds.push(newGroupId);
        //         set(ref(database, `players/${id}/group_id`), playerGroupIds);

        //         // After creating the group and updating the player, navigate to the RachaoScreen or any other screen
        //         navigation.navigate("MainTabs");

        //         // Resolve the promise
        //         result = false;
        //         resolve(result);
        //         return;
        //       }
        //     }
        //   }

        // If the loop completes without finding a player, reject the promise
        //   if (!result) {
        //     console.error("Player not found for the current user.");
        //   }
        // });
      });
    } catch (error) {
      console.error("Error creating group:", error);
      return error;
    }
  };

  return (
    <View style={styles.container}>
      <AppBar title="Criar Novo Grupo" />
      <View style={styles.card}>
        <Text style={styles.label}>Nome do Grupo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do grupo"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Descrição do Grupo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a descrição do grupo"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Text style={styles.label}>Cidade:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a cidade"
          value={city}
          onChangeText={setCity}
        />
        <Text style={styles.label}>Localização:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a localização"
          value={location}
          onChangeText={setLocation}
        />

        <TouchableOpacity
          style={[styles.button, styles.buttonAdicionar]}
          onPress={handleCreateGroup}
        >
          <Text style={styles.buttonText}>Criar Grupo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateGroupScreen;

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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
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
