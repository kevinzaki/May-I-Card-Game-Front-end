import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import socket from "../../util/socketConnection";
import { DimensionsContext } from "../contexts/DimensionsContext";
import DeckCard from "./DeckCard";
import CardBack from "./CardBack";

function DeckArea() {
  const { setDeckAreaSize } = useContext(DimensionsContext);
  const [deckCount, setDeckCount] = useState(0);
  const [discardedCards, setDiscardedCards] = useState({
    rank: null,
    suit: null
  });
  useEffect(() => {
    socket.on("deck", data => {
      setDeckCount(data["count"]);
      setDiscardedCards(data["discarded"]);
    });
    //return () => socket.disconnect();
  }, []);

  return (
    <View
      onLayout={e => setDeckAreaSize(e.nativeEvent.layout)}
      style={styles.container}
    >
      <CardBack orientation="vertical" />
      <DeckCard rank={discardedCards["rank"]} suit={discardedCards["suit"]} />
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
