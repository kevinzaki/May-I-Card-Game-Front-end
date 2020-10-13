import React from "react";
import { View, StyleSheet } from "react-native";
import CardBack from "./CardBack";

/**
 * OpponentCards
 * Container for each opponent hand.  Renders a card (back) for each card in the players hand.
 */
function OpponentCards(props) {
  const items = [];
  /** render a CardBack component for each card in the opponents hand. */
  for (let i = 0; i < props.cardCount; i++) {
    items.push(<CardBack key={i} orientation="horizontal" />);
  }

  return <View style={styles.container}>{items}</View>;
}

/** Styling for OpponentCards Component */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30
  }
});

export default OpponentCards;
