import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import SideBoard from "./SideBoard";
import socket from "../../util/socketConnection";
import MyCards from "./MyCards";
import DeckArea from "./DeckArea";
import MeldArea from "./MeldArea";
// import { MeldsContext } from "../contexts/MeldsContext";

function GameBoard() {
  const [opponentCards, setOpponentCards] = useState([]);
  const [opponentOneCardCount, SetOpponentOneCardCount] = useState(11);
  const [opponentTwoCardCount, SetOpponentTwoCardCount] = useState(11);
  const [meldArea, setMeldArea] = useState({ x: [0, 0], y: [0, 0] });
  const [heightOffset, setHeightOffset] = useState(0);

  useEffect(() => {
    socket.on("getOtherPlayers", data => {
      setOpponentCards(data);
      SetOpponentOneCardCount(data[0].cardCount);
      SetOpponentTwoCardCount(data[1] ? data[1].cardCount : 11);
      return () => socket.disconnect();
    });
  }, []);

  return (
    <>
      <View
        onLayout={e => {
          setHeightOffset(e.nativeEvent.layout.y);
        }}
        style={styles.container}
      >
        <SideBoard players={opponentOneCardCount} />
        <View style={styles.centerContainer}>
          <View style={styles.meldContainer}>
            <MeldArea heightOffset={heightOffset} />
          </View>
          <DeckArea />
        </View>
        <SideBoard players={opponentTwoCardCount} />
      </View>
      <MyCards meldDropArea={meldArea} />
    </>
  );
}

const styles = StyleSheet.create({
  meldContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch"
  },
  centerContainer: {
    flex: 8,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "stretch"
  }
});

export default GameBoard;
