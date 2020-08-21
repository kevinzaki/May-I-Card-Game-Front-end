import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import { MeldsContext } from "../contexts/MeldsContext";
import Meld from "./Meld";
import Card from "./Card";

function MeldArea(props) {
  const {
    melds,
    setNewMeldDropArea,
    newMeldDropArea,
    createMeld,
    meldToDisplay,
    setMeldToDisplay
  } = useContext(MeldsContext);
  const [meldAreaSize, setMeldAreaSize] = useState({ width: 0, height: 0 });
  const [meldContainerHeight, setMeldContainerHeight] = useState(0);
  const [buttonAreaHeight, setButtonAreaHeight] = useState(0);
  //const [offset, setOffset] = useState([0, 0]);
  //   const [newMeldDisplayID, setNewMeldDisplayID] = useState(0);
  //const heightOffset = 0;

  useEffect(() => {
    const { width: screenWidth } = Dimensions.get("screen");
    const { width, height } = meldAreaSize;
    setNewMeldDropArea({
      x: [(screenWidth - width) / 2, width + (screenWidth - width) / 2],
      y: [
        props.heightOffset + meldContainerHeight - height - buttonAreaHeight,
        props.heightOffset + meldContainerHeight - buttonAreaHeight
      ]
    });
    //setOffset([props.heightOffset, newMeldDropArea.x[0]]);
  }, [meldAreaSize, props.heightOffset, meldContainerHeight, buttonAreaHeight]);

  //   useEffect(() => {
  //     console.log(newMeldDropArea);
  //   }, [newMeldDropArea]);

  return (
    <View
      style={styles.container}
      onLayout={e => setMeldContainerHeight(e.nativeEvent.layout.height)}
    >
      <View style={styles.meldsArea}>
        {melds.map(({ id, cards }) => (
          <Meld
            key={id}
            id={id}
            cards={cards}
            xOffset={newMeldDropArea.x[0]}
            yOffset={props.heightOffset}
          />
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
          <Card key={id} id={id} rank={rank} suit={suit} />
        ))}
      </View>
      <View
        style={styles.buttonContainer}
        onLayout={e => setButtonAreaHeight(e.nativeEvent.layout.height)}
      >
        <View style={styles.button}>
          <Button onPress={() => console.log("pressed MELD")} title="MELD" />
        </View>
        <View style={styles.button}>
          <Button onPress={() => console.log("pressed CLEAR")} title="CLEAR" />
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
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    flexWrap: "wrap"
  },
  meldDropZone: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: "green"
  }
});

// !UkS@mj%3FmcH
// !UkS@mj%3FmcH
// !UkS@mj%3FmcH
