import React, { useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import { MeldsContext } from "../contexts/MeldsContext";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { RoomContext } from "../contexts/RoomContext";
import Meld from "./Meld";
import MeldCard from "./MeldCard";
import { LinearGradient } from "expo-linear-gradient";
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
    setMeldButtonAreaHeight,
    setScrolledInSwapArea
  } = useContext(DimensionsContext);

  return (
    <View
      style={styles.container}
      onLayout={e => setMeldContainerHeight(e.nativeEvent.layout.height)}
    >
      <ScrollView onMomentumScrollEnd={() => setScrolledInSwapArea(true)}>
        <View style={styles.meldsArea}>
          {melds.map(({ id, cards }) => (
            <Meld key={id} id={id} cards={cards} />
          ))}
        </View>
      </ScrollView>
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
        <TouchableOpacity
          style={[styles.button, { marginRight: 10 }]}
          onPress={() => {
            if (user === turn) {
              setMeldButton(true);
              setMeldToDisplay(0);
            } else {
              alert("In must be your turn in order to meld.");
            }
          }}
        >
          <Text style={styles.buttonText}>MELD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginRight: 10 }]}
          onPress={() => {
            setCreateMeld(meldToDisplay, null);
            setMeldToDisplay(0);
          }}
        >
          <Text style={styles.buttonText}>CLEAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setMeldToDisplay(meldToDisplay === 0 ? 1 : 0)}
        >
          <Text style={styles.buttonText}>
            {meldToDisplay === 0 ? "NEXT" : "PREV"}
          </Text>
        </TouchableOpacity>
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
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "stretch",
    alignItems: "stretch"
  },
  button: {
    flex: 1,
    backgroundColor: "#00802c",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.01,
    alignContent: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "HelveticaNeue-CondensedBold",
    fontSize: 16,
    alignSelf: "center",
    justifyContent: "center"
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
    minHeight: 60,
    maxHeight: 60,
    paddingVertical: 5,
    backgroundColor: "#00802c",
    flex: 1,
    borderRadius: 5,
    paddingLeft: 15,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.01
  }
});

// !UkS@mj%3FmcH
// !UkS@mj%3FmcH
// !UkS@mj%3FmcH
