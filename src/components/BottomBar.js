import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { melds } from "../melds";
import { RoomContext } from "../contexts/RoomContext";

/**
 *
 * BottomBar Component
 * Renders and manages all activity related to the bottom bar on
 * the game view.
 *
 */
function BottomBar(props) {
  const { round } = useContext(RoomContext);
  const roundText = melds[round - 1].name.toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.rules}>
        <Text style={styles.textColor}>
          <Text style={styles.title}>BUYS:</Text> {props.buys}
        </Text>
      </View>
      <View style={styles.rules}>
        <Text style={styles.textColor}>
          <Text style={styles.title}>MELD:</Text> {roundText}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#191919"
  },
  title: {
    color: "#a5f9c6"
  },
  rules: {
    paddingTop: 10,
    paddingBottom: 15
  },
  textColor: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "HelveticaNeue-CondensedBold",
    fontSize: 20
  }
});

export default BottomBar;
