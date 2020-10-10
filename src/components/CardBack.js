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
    borderRadius: 5
    // transform: [{ rotate: "90deg" }]
  },
  horizontalBackCard: {
    minWidth: 50,
    maxWidth: 100,
    minHeight: 35,
    maxHeight: 50,
    marginBottom: -20,
    borderWidth: 0.5,
    borderColor: "#78cc99",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  verticalBackCard: {
    height: 127,
    minWidth: 75,
    maxWidth: 75,
    margin: 5,
    borderColor: "#78cc99",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.4
  }
});

export default CardBack;
