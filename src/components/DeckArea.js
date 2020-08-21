import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import socket from "../../util/socketConnection";
import DeckCard from "./DeckCard";
import CardBack from "./CardBack";

function DeckArea() {
  const [deckCount, setDeckCount] = useState(0);
  const [deckAreaSize, setDeckAreaSize] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0
  });
  const [discardedCards, setDiscardedCards] = useState({
    rank: null,
    suit: null
  });
  useEffect(() => {
    socket.on("deck", data => {
      setDeckCount(data["count"]);
      setDiscardedCards(data["discarded"]);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <View
      style={styles.container}
      onLayout={e => setDeckAreaSize(e.nativeEvent.layout)}
    >
      <CardBack orientation="vertical" />
      <DeckCard
        offset={deckAreaSize}
        rank={discardedCards["rank"]}
        suit={discardedCards["suit"]}
      />
    </View>
  );
}

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
