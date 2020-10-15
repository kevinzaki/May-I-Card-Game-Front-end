import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import SideBoard from "./SideBoard";
import socket from "../../util/socketConnection";
import MyCards from "./MyCards";
import DeckArea from "./DeckArea";
import MeldArea from "./MeldArea";
import { DimensionsContext } from "../contexts/DimensionsContext";

/**
 * GameBoard
 * Component manages the entire actionable game board.
 */
function GameBoard() {
  const [opponents, setOponnents] = useState([]);
  const { setMeldAreaHeightOffset } = useContext(DimensionsContext);

  useEffect(() => {
    let mounted = true;
    /**
     * getOtherPlayers
     * Sets opponent data on message from server.
     */
    socket.on("getOtherPlayers", data => {
      if (mounted) setOponnents(data);
    });

    return () => (mounted = false);
  }, []);

  return (
    <>
      <View
        onLayout={e => {
          /** sets offset of top bar for use in dimensions context */
          setMeldAreaHeightOffset(e.nativeEvent.layout.y);
        }}
        style={styles.container}
      >
        <SideBoard opponents={opponents} side="left" />
        <View style={styles.centerContainer}>
          <View style={styles.meldContainer}>
            <MeldArea />
          </View>
          <DeckArea />
        </View>
        <SideBoard opponents={opponents} side="right" />
      </View>
      <MyCards />
    </>
  );
}

/** Styling for GameBoard component */
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
