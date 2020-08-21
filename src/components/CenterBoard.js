import React from "react";
import { StyleSheet, View, Text } from "react-native";
import DeckArea from "./DeckArea";
import MeldArea from "./MeldArea";
import MyCards from "./MyCards";
function CenterBoard() {
  return (
    <View style={styles.container}>
      <MeldArea />
      <DeckArea />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00a33a"
  }
});

export default CenterBoard;
