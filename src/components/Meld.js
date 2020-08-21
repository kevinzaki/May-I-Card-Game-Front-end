import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { MeldsContext } from "../contexts/MeldsContext";
import Card from "./Card";

function Meld(props) {
  const { meldsSwapArea, setMeldsSwapArea } = useContext(MeldsContext);
  const [meldDimensions, setMeldDimensions] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });

  useEffect(() => {
    const { id, yOffset, xOffset } = props;
    const { x, y, width, height } = meldDimensions;
    const swapArea = { ...meldsSwapArea };
    swapArea[id] = {
      x: [xOffset, xOffset + width - x],
      y: [yOffset + y, yOffset + y + height]
    };
    setMeldsSwapArea(swapArea);
  }, [meldDimensions, props]);

  return (
    <View
      onLayout={e => setMeldDimensions(e.nativeEvent.layout)}
      style={styles.container}
    >
      {props.cards.map(({ id, rank, suit, value, order }) => (
        <Card key={id} rank={rank} suit={suit} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 25,
    paddingRight: 100
  }
});

export default Meld;
