import React, { useRef, useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { MeldsContext } from "../contexts/MeldsContext";
import { DeckContext } from "../contexts/DeckContext";

const cardSymbols = {
  Clubs: 9827,
  Diamonds: 9830,
  Hearts: 9829,
  Spades: 9824
};

function DeckCard(props) {
  const { newMeldDropArea } = useContext(MeldsContext);
  const { setDeckDropArea } = useContext(DeckContext);

  const [discardAreaSize, setDiscardAreaSize] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0
  });
  const [discardAreaDimensions, setDiscardAreaDimensions] = useState({
    x: [0, 0],
    y: [0, 0]
  });
  useEffect(() => {
    setDeckDropArea({
      x: [
        newMeldDropArea.x[0] + discardAreaSize.x,
        newMeldDropArea.x[0] + discardAreaSize.x + discardAreaSize.width
      ],
      y: [
        newMeldDropArea.y[1] + discardAreaSize.y + 33,
        newMeldDropArea.y[1] + discardAreaSize.y + discardAreaSize.height + 33
      ]
    });
  }, [discardAreaSize, props.offset, newMeldDropArea]);

  const [cardTouch, setCardTouch] = useState(false);

  const cardStyle =
    props.suit === "Hearts" || props.suit === "Diamonds"
      ? styles.redCard
      : styles.blackCard;
  const symbol = String.fromCharCode(cardSymbols[props.suit]);
  return (
    <View
      onLayout={e => setDiscardAreaSize(e.nativeEvent.layout)}
      style={styles.container}
    >
      <Text style={cardStyle}>{props.rank}</Text>
      <Text style={cardStyle}>{symbol}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#00a33a",
    height: 127,
    minWidth: 75,
    maxWidth: 75,
    margin: 5
  },
  blackCard: {
    fontSize: 30,
    color: "black"
  },
  redCard: {
    fontSize: 30,
    color: "red"
  }
});

export default DeckCard;
