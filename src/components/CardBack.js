import React from "react";
import { View, Text, StyleSheet } from "react-native";

function CardBack(props) {
  const cardOrientation =
    props.orientation === "vertical"
      ? styles.verticalBackCard
      : styles.horizontalBackCard;
  return <View style={[styles.container, cardOrientation]}></View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#a5f9c6",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#00a33a"
    // transform: [{ rotate: "90deg" }]
  },
  horizontalBackCard: {
    minWidth: 50,
    maxWidth: 100,
    minHeight: 35,
    maxHeight: 50,
    marginBottom: -20
  },
  verticalBackCard: {
    height: 127,
    minWidth: 75,
    maxWidth: 75,
    margin: 5
  }
});

export default CardBack;
