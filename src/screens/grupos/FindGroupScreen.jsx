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
  get,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { auth } from "../../services/firebaseConfig";

const FindGroupScreen = ({ navigation }) => {
  const [groupCode, setGroupCode] = useState("");
  const [error, setError] = useState("");

  const handleFindGroup = async () => {
    try {
      const database = getDatabase();
      const groupsRef = ref(database, "groups");

      // Query the groups to find the one with the entered group code
      const groupQuery = query(
        groupsRef,
        orderByChild("groupCode"),
        equalTo(groupCode)
      );
      const groupSnapshot = await get(groupQuery);

      if (groupSnapshot.exists()) {
        const groupId = Object.keys(groupSnapshot.val())[0]; // Get the first (and only) group id
        const groupData = groupSnapshot.val()[groupId];

        // Update the user's list of groups
        await set(
          ref(database, `groups/${groupId}/userIds/${auth.currentUser.uid}`),
          true
        );

        // Navigate to the RachaoScreen or any other screen
        navigation.navigate("RachaoScreen");
      } else {
        setError("Group not found. Please check the group code and try again.");
      }
    } catch (error) {
      console.error("Error finding group:", error);
      setError("An error occurred while finding the group. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find a Group</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Group Code"
        value={groupCode}
        onChangeText={(text) => setGroupCode(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleFindGroup}>
        <Text style={styles.buttonText}>Find Group</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default FindGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  button: {
    backgroundColor: "#da733c",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 16,
  },
});
