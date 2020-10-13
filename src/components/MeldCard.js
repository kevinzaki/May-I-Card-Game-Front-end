import React from "react";
import { View, StyleSheet, Text } from "react-native";
import cardSymbols from "../../util/cardSymbols";

/**
 *
 * MeldCard
 * A card component that is rendered in the meld area to represent one
 * card in a meld.
 *
 */
function MeldCard(props) {
  const { suit } = props;
  /** Determine card style based on suit */
  const cardStyle =
    suit === "Hearts" || suit === "Diamonds"
      ? styles.redCard
      : styles.blackCard;
  /** Get card symbol */
  const symbol = String.fromCharCode(cardSymbols[suit]);

  return (
    <View style={styles.container}>
      <Text style={[cardStyle, styles.cardText]}>{props.rank}</Text>
      <Text style={cardStyle}>{symbol}</Text>
    </View>
  );
}

/** Styling for MeldCard Component */
const styles = StyleSheet.create({
  dull: {
    backgroundColor: "rgba(165,165,165,1)"
  },
  cardText: {
    fontWeight: "bold",
    fontFamily: "HelveticaNeue-CondensedBold"
  },
  container: {
    flex: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    height: 50,
    minWidth: 35,
    maxWidth: 35,
    marginLeft: -15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#999",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.1,
    shadowRadius: 2
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
