import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import socket from "../../util/socketConnection";
import { DimensionsContext } from "../contexts/DimensionsContext";
import DeckCard from "./DeckCard";
import CardBack from "./CardBack";

/**
 * DeckArea
 * Handles entire deck area including discard pile and deck pile.
 */
function DeckArea() {
  const { setDeckAreaSize } = useContext(DimensionsContext);
  const [deckCount, setDeckCount] = useState(0);
  /** stores currently discarded card */
  const [discardedCards, setDiscardedCards] = useState({
    rank: null,
    suit: null
  });

  useEffect(() => {
    /**
     * deck
     * server emits a deck message whenever there are changes to the discarded card
     * or number of cards in the active deck.
     */
    socket.on("deck", data => {
      setDeckCount(data["count"]);
      setDiscardedCards(data["discarded"]);
    });
  }, []);

  return (
    <View
      /** on rendering layout set the deck area size in our dimensions context */
      onLayout={e => setDeckAreaSize(e.nativeEvent.layout)}
      style={styles.container}
    >
      <CardBack orientation="vertical" />
      <DeckCard rank={discardedCards["rank"]} suit={discardedCards["suit"]} />
    </View>
  );
}

/** Styles for DeckArea Component */
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    alignContent: "center",
    padding: 30
  }
});

export default DeckArea;
