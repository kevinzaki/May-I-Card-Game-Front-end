import React from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import io from "socket.io-client";
import socket from "../../util/socketConnection";
import { color } from "react-native-reanimated";

function TopBar() {
  return (
    <View style={styles.container}>
      <View style={styles.rules}>
        <Text style={styles.textColor}>RULES</Text>
      </View>
      <View style={styles.rules}>
        <Text style={styles.textColor}>0:15</Text>
      </View>
      <View style={styles.rules}>
        <Text style={styles.textColor}>SCORE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#212121"
  },
  rules: {
    padding: 20
  },
  textColor: {
    color: "white",
    fontWeight: "bold"
  }
});

export default TopBar;
