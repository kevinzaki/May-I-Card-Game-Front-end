import React from "react";
import { StyleSheet, View } from "react-native";
import DeckArea from "./DeckArea";
import MeldArea from "./MeldArea";

/**
 * CenterBoard
 * Container for all items components in the center of the board (meld and deck areas).
 */
function CenterBoard() {
  return (
    <View style={styles.container}>
      <MeldArea />
      <DeckArea />
    </View>
  );
}

/** Styles form CenterBoard Component */
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
