import React, { useRef, useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, PanResponder, Animated } from "react-native";
import { MeldsContext } from "../contexts/MeldsContext";
import { DeckContext } from "../contexts/DeckContext";
import { MyCardsContext } from "../contexts/MyCardsContext";

const cardSymbols = {
  Clubs: 9827,
  Diamonds: 9830,
  Hearts: 9829,
  Spades: 9824
};

function Card(props) {
  const {
    newMeldDropArea,
    setCreateMeld,
    meldToDisplay,
    meldsSwapArea
  } = useContext(MeldsContext);
  const { deckDropArea } = useContext(DeckContext);
  const { setDiscardCard } = useContext(MyCardsContext);

  const [cardTouch, setCardTouch] = useState(false);

  //   function isInDropZone(zone, x, y) {
  //     const [xStart, xEnd] = zone.x;
  //     const [yStart, yEnd] = zone.y;
  //     if (between(x, xStart, xEnd) && between(y, yStart, yEnd)) return true;
  //     return false;
  //   }

  //   function between(x, min, max) {
  //     return x >= min && x <= max;
  //   }

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gesture) => {
      if (!complete) return true;
    },
    onPanResponderMove: (evt, gesture) => {
      if (!complete) {
        pan.x.setValue(gesture.dx);
        pan.y.setValue(gesture.dy);
      }
      //   Animated.event(
      //     [
      //       null,
      //       {
      //         dx: pan.x, // x,y are Animated.Value
      //         dy: pan.y
      //       }
      //     ],
      //     { useNativeDriver: false }
      //   )(evt, gestureState);
    },
    onPanResponderRelease: (evt, gesture) => {
      //   const { moveY, moveX } = gesture;
      //   if (isInDropZone(newMeldDropArea, moveX, moveY)){
      //     setComplete(true);
      //     pan.x.setValue(0);
      //     pan.y.setValue(0);
      //     setCreateMeld(meldToDisplay, {
      //       id: props.id,
      //       rank: props.rank,
      //       suit: props.suit
      //     });
      //   }
      const [yNewMeldDropStart, yNewMeldDropEnd] = newMeldDropArea.y;
      const [xNewMeldDropStart, xNewMeldDropEnd] = newMeldDropArea.x;
      const [yDeckDropStart, yDeckDropEnd] = deckDropArea.y;
      const [xDeckDropStart, xDeckDropEnd] = deckDropArea.x;
      if (
        gesture.moveY > yNewMeldDropStart &&
        gesture.moveY < yNewMeldDropEnd &&
        gesture.moveX > xNewMeldDropStart &&
        gesture.moveX < xNewMeldDropEnd
      ) {
        setComplete(true);
        pan.x.setValue(0);
        pan.y.setValue(0);
        setCreateMeld(meldToDisplay, {
          id: props.id,
          rank: props.rank,
          suit: props.suit
        });
      } else if (
        gesture.moveY > yDeckDropStart &&
        gesture.moveY < yDeckDropEnd &&
        gesture.moveX > xDeckDropStart &&
        gesture.moveX < xDeckDropEnd
      ) {
        setDiscardCard({
          id: props.id,
          rank: props.rank,
          suit: props.suit
        });
        console.log("IN THE DISCARD AREA");
      } else {
        Animated.spring(
          pan, // Auto-multiplexed
          { toValue: { x: 0, y: 0 }, useNativeDriver: false } // Back to zero
        ).start();
      }
      pan.flattenOffset();
    }
  });
  const [complete, setComplete] = useState(false);
  const cardStyle =
    props.suit === "Hearts" || props.suit === "Diamonds"
      ? complete
        ? styles.dullRedCard
        : styles.redCard
      : complete
      ? styles.dullBlackCard
      : styles.blackCard;
  const cardSize = props.size === "large" ? styles.large : styles.regular;
  const symbol = String.fromCharCode(cardSymbols[props.suit]);
  const cardTouchMargin = complete ? styles.marginTop : styles.noMarginTop;
  const completed = complete ? styles.dull : null;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        cardTouchMargin,
        styles.container,
        cardSize,
        pan.getLayout(),
        completed
      ]}
    >
      <Text style={cardStyle}>{props.rank}</Text>
      <Text style={cardStyle}>{symbol}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dull: {
    backgroundColor: "rgba(165,165,165,1)"
  },
  container: {
    flex: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#00a33a"
  },
  large: {
    height: 127,
    minWidth: 75,
    maxWidth: 75,
    margin: 5
  },
  regular: {
    height: 85,
    minWidth: 50,
    maxWidth: 50,
    marginLeft: -25
  },
  blackCard: {
    marginLeft: -25,
    color: "black"
  },
  redCard: {
    marginLeft: -25,
    color: "red"
  },
  dullBlackCard: {
    marginLeft: -25,
    color: "#7d7d7d"
  },
  dullRedCard: {
    marginLeft: -25,
    color: "#ff5c5c"
  },
  marginTop: {
    marginBottom: 0
  },
  noMarginTop: {
    marginTop: 0
  }
});

export default Card;
