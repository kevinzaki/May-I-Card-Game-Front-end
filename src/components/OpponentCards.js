import React from "react";
import { View, StyleSheet } from "react-native";
import CardBack from "./CardBack";
import CenterBoard from "./CenterBoard";

function OpponentCards(props) {
  const items = [];
  for (let i = 0; i < props.cardCount; i++)
    items.push(<CardBack key={i} orientation="horizontal" />);

  return <View style={styles.container}>{items}</View>;
}

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
