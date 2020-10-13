import React, { useRef, useState, useContext, useEffect } from "react";
import { StyleSheet, Text, PanResponder, Animated } from "react-native";
import { MeldsContext } from "../contexts/MeldsContext";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { MyCardsContext } from "../contexts/MyCardsContext";
import { RoomContext } from "../contexts/RoomContext";
import cardSymbols from "../../util/cardSymbols";

/**
 *
 * Card Component
 * Renders and manages all activity related a card in a players hand including
 * drag and drop functionality.
 *
 */
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

  /**
   *
   * isInDropZone
   * Checks if a provided x and y are in a provided zone.
   *
   * @param {Object} zone - Coordinates / range to check against
   * @param {Number} x - horizontal start and end point
   * @param {Number} y - vertical start and end point
   * @return {boolean}
   */
  function isInDropZone(zone, x, y) {
    const [xStart, xEnd] = zone.x;
    const [yStart, yEnd] = zone.y;
    if (between(x, xStart, xEnd) && between(y, yStart, yEnd)) return true;
    return false;
  }

  /**
   *
   * between
   * Checks if a provided x value is between a provided min and max value.
   *
   * @param {Number} x
   * @param {Number} min
   * @param {Number} max
   */
  function between(x, min, max) {
    return x >= min && x <= max;
  }

  const pan = useRef(new Animated.ValueXY())
    .current; /** references current position */

  /**
   * panResponder to handle touch events
   * Also utilize useMemo to subscribe to updates from events that changes the card
   */
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        /** allow the gesture if conditions are met */
        onStartShouldSetPanResponder: (evt, gesture) => {
          if (
            turn === user &&
            !buyInProgress &&
            !disabledCards[props.id] &&
            dropCard.id === null
          ) {
            return true;
          }
          return false;
        },
        /** sets current position of the card based on touch gesture */
        onPanResponderMove: (evt, gesture) => {
          pan.x.setValue(gesture.dx);
          pan.y.setValue(gesture.dy);
        },
        /**
         * onPanResponderRelease
         * On the gesture release check that the user has permission to move the card
         * then check the drop location of the card to determine which game action to take.
         */
        onPanResponderRelease: (evt, gesture) => {
          const { moveY, moveX } = gesture;
          for (let zone in meldsSwapArea) {
            /** card is dropped on top of a meld to swap or discard */
            if (isInDropZone(meldsSwapArea[zone], moveX, moveY)) {
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
          /** card is dropped on top of meld area to use in creating a new meld */
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
            /** card is dropped into the discard pile */
          } else if (isInDropZone(discardCardArea, moveX, moveY)) {
            setDiscardCard({
              id: props.id,
              rank: props.rank,
              suit: props.suit,
              order: props.order,
              value: props.value
            });
            /** card is released elsewhere, animate back to original position */
          } else {
            Animated.spring(
              pan,
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

  /** manages whether the card is being used */
  const [dull, setDull] = useState(false);

  /** clears dull cards when meld area is cleared */
  useEffect(() => {
    if (createMeld[0].length + createMeld[1].length === 0) setDull(false);
  }, [createMeld]);

  /** sets a card to dull */
  useEffect(() => {
    if (disabledCards[props.id] || dropCard.id === props.id) setDull(true);
    else setDull(false);
  }, [disabledCards, dropCard]);

  /** sets card style to red or black or dull */
  const cardStyle = () => {
    if (props.suit === "Hearts" || props.suit === "Diamonds") {
      if (dull) return styles.dullRedCard;
      else return styles.redCard;
    } else {
      if (dull) return styles.dullBlackCard;
      else return styles.blackCard;
    }
  };

  /** Get card suit symbol */
  const symbol = String.fromCharCode(cardSymbols[props.suit]);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        { marginLeft: props.margin },
        styles.container,
        pan.getLayout(),
        dull ? styles.dull : {}
      ]}
    >
      <Text style={[cardStyle(), styles.cardTxtStyle]}>{props.rank}</Text>
      <Text style={cardStyle()}>{symbol}</Text>
    </Animated.View>
  );
}

/** all card styling */
const styles = StyleSheet.create({
  cardTxtStyle: {
    marginLeft: -25,
    fontWeight: "bold",
    fontFamily: "HelveticaNeue-CondensedBold"
  },
  dull: {
    backgroundColor: "rgba(165,165,165,1)"
  },
  container: {
    height: 85,
    minWidth: 50,
    maxWidth: 50,
    elevation: 10,
    flex: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#999",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.1,
    shadowRadius: 2
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
  }
});

export default Card;
