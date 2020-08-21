import React from "react";
import { StyleSheet, View, Text } from "react-native";
import OpponentCards from "./OpponentCards";

function SideBoard(props) {
  return (
    <View style={styles.container}>
      <OpponentCards cardCount={props.players} />
      <OpponentCards cardCount={props.players} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginBottom: 25,
    justifyContent: "center"
  }
});

export default SideBoard;
