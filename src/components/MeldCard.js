import React from "react";
import { View, StyleSheet, Text } from "react-native";
import cardSymbols from "../../util/cardSymbols";

function MeldCard(props) {
  const { suit } = props;
  const cardStyle =
    suit === "Hearts" || suit === "Diamonds"
      ? styles.redCard
      : styles.blackCard;
  const symbol = String.fromCharCode(cardSymbols[suit]);

  return (
    <View style={styles.container}>
      <Text style={cardStyle}>{props.rank}</Text>
      <Text style={cardStyle}>{symbol}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dull: {
    backgroundColor: "rgba(165,165,165,1)"
  },
  container: {
    flex: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#00a33a",
    height: 50,
    minWidth: 35,
    maxWidth: 35,
    marginLeft: -15
  },
  blackCard: {
    marginLeft: -15,
    color: "black",
    fontSize: 14
  },
  redCard: {
    marginLeft: -15,
    color: "red",
    fontSize: 14
  }
});

export default MeldCard;
