import React, { useRef, useState, useContext, useEffect } from "react";
import { StyleSheet, Text, PanResponder, Animated } from "react-native";
import { MeldsContext } from "../contexts/MeldsContext";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { MyCardsContext } from "../contexts/MyCardsContext";
import { RoomContext } from "../contexts/RoomContext";
import cardSymbols from "../../util/cardSymbols";

function Card(props) {
  const { turn, user, buyInProgress } = useContext(RoomContext);
  const { setDiscardCard } = useContext(MyCardsContext);
  const {
    setCreateMeld,
    meldToDisplay,
    createMeld,
    disabledCards,
    setDisabledCards,
    setMeldDropID,
    setDropCard,
    dropCard
  } = useContext(MeldsContext);
  const { newMeldDropArea, meldsSwapArea, discardCardArea } = useContext(
    DimensionsContext
  );

  function isInDropZone(zone, x, y) {
    const [xStart, xEnd] = zone.x;
    const [yStart, yEnd] = zone.y;
    if (between(x, xStart, xEnd) && between(y, yStart, yEnd)) return true;
    return false;
  }

  function between(x, min, max) {
    return x >= min && x <= max;
  }

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gesture) => {
          return true;
        },
        onPanResponderMove: (evt, gesture) => {
          pan.x.setValue(gesture.dx);
          pan.y.setValue(gesture.dy);
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
          if (turn === user && !buyInProgress) {
            const { moveY, moveX } = gesture;
            for (let zone in meldsSwapArea) {
              if (isInDropZone(meldsSwapArea[zone], moveX, moveY)) {
                //setDisabledCards(props.id);
                setDropCard({
                  id: props.id,
                  rank: props.rank,
                  suit: props.suit,
                  order: props.order,
                  value: props.value
                });
                setMeldDropID(zone);
              }
            }
            if (isInDropZone(newMeldDropArea, moveX, moveY)) {
              setDisabledCards(props.id);
              pan.x.setValue(0);
              pan.y.setValue(0);
              setCreateMeld(meldToDisplay, {
                id: props.id,
                rank: props.rank,
                suit: props.suit,
                order: props.order,
                value: props.value
              });
            } else if (isInDropZone(discardCardArea, moveX, moveY)) {
              setDiscardCard({
                id: props.id,
                rank: props.rank,
                suit: props.suit,
                order: props.order,
                value: props.value
              });
            } else {
              Animated.spring(
                pan, // Auto-multiplexed
                { toValue: { x: 0, y: 0 }, useNativeDriver: false } // Back to zero
              ).start();
            }
          } else {
            Animated.spring(
              pan, // Auto-multiplexed
              { toValue: { x: 0, y: 0 }, useNativeDriver: false } // Back to zero
            ).start();
          }
          pan.flattenOffset();
        }
      }),
    [
      newMeldDropArea,
      meldsSwapArea,
      discardCardArea,
      createMeld,
      meldToDisplay,
      buyInProgress,
      turn
    ]
  );

  const cardStyle =
    props.suit === "Hearts" || props.suit === "Diamonds"
      ? disabledCards[props.id]
        ? styles.dullRedCard
        : styles.redCard
      : disabledCards[props.id]
      ? styles.dullBlackCard
      : styles.blackCard;
  const cardSize = props.size === "large" ? styles.large : styles.regular;
  const symbol = String.fromCharCode(cardSymbols[props.suit]);
  const cardTouchMargin = disabledCards[props.id]
    ? styles.marginTop
    : styles.noMarginTop;
  const [dull, setDull] = useState(null);

  useEffect(() => {
    if (disabledCards[props.id] || dropCard.id === props.id)
      setDull(styles.dull);
    else setDull(null);
  }, [disabledCards, dropCard]);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        cardTouchMargin,
        styles.container,
        cardSize,
        pan.getLayout(),
        dull
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
