import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import SideBoard from "./SideBoard";
import socket from "../../util/socketConnection";
import MyCards from "./MyCards";
import DeckArea from "./DeckArea";
import MeldArea from "./MeldArea";
import { DimensionsContext } from "../contexts/DimensionsContext";

function GameBoard() {
  const [opponents, setOponnents] = useState([]);
  const { setMeldAreaHeightOffset } = useContext(DimensionsContext);

  useEffect(() => {
    socket.on("getOtherPlayers", data => {
      setOponnents(data);
    });
  }, []);

  return (
    <>
      <View
        onLayout={e => {
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
