import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const AppBar = ({
  title,
  subtitle,
  centerTitle = false,
  centerSubtitle = false,
  leading,
  trailing,
}) => {
  return (
    <View style={styles.appBar}>
      <View style={styles.leftContainer}>{leading}</View>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, centerTitle && styles.centerTitle]}>
          {title}
        </Text>
        <Text style={[styles.subtitle, centerSubtitle && styles.centerTitle]}>
          {subtitle}
        </Text>
      </View>
      <View style={styles.rightContainer}>{trailing}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#da733c",
  },
  leftContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 2,
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  centerTitle: {
    textAlign: "center",
  },
  subtitle: {
    color: "#fff",
    fontSize: 14,
  },
  centerSubtitle: {
    textAlign: "center",
  },
});

export default AppBar;
