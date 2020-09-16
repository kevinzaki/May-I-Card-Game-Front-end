import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import { MeldsContext } from "../contexts/MeldsContext";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { RoomContext } from "../contexts/RoomContext";
import Meld from "./Meld";
import MeldCard from "./MeldCard";
import socket from "../../util/socketConnection";

function MeldArea(props) {
  const { turn, user } = useContext(RoomContext);
  const {
    melds,
    createMeld,
    meldToDisplay,
    setMeldToDisplay,
    setMeldButton,
    setCreateMeld
  } = useContext(MeldsContext);

  const {
    setMeldAreaSize,
    setMeldContainerHeight,
    setMeldButtonAreaHeight
  } = useContext(DimensionsContext);

  return (
    <View
      style={styles.container}
      onLayout={e => setMeldContainerHeight(e.nativeEvent.layout.height)}
    >
      <View style={styles.meldsArea}>
        {melds.map(({ id, cards }) => (
          <Meld key={id} id={id} cards={cards} />
        ))}
      </View>
      <View
        onLayout={e =>
          setMeldAreaSize({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height
          })
        }
        style={styles.meldDropZone}
      >
        {createMeld[meldToDisplay].map(({ id, rank, suit }) => (
          <MeldCard key={id} id={id} rank={rank} suit={suit} />
        ))}
      </View>
      <View
        style={styles.buttonContainer}
        onLayout={e => setMeldButtonAreaHeight(e.nativeEvent.layout.height)}
      >
        <View style={styles.button}>
          <Button
            onPress={() => {
              if (user === turn) {
                setMeldButton(true);
                setMeldToDisplay(0);
              } else {
                alert("In must be your turn in order to meld.");
              }
            }}
            title="MELD"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => {
              setCreateMeld(meldToDisplay, null);
              setMeldToDisplay(0);
            }}
            title="CLEAR"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => setMeldToDisplay(meldToDisplay === 0 ? 1 : 0)}
            title={meldToDisplay === 0 ? "Next" : "Prev"}
          />
        </View>
      </View>
    </View>
  );
}

export default MeldArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    alignItems: "stretch"
  },
  button: {
    flex: 1
  },
  meldsArea: {
    flex: 5,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
    alignContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  meldDropZone: {
    flex: 1,
    paddingLeft: 15,
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center"
  }
});

// !UkS@mj%3FmcH
// !UkS@mj%3FmcH
// !UkS@mj%3FmcH
