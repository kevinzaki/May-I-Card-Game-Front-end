import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { RoomContext } from "../contexts/RoomContext";
import socket from "../../util/socketConnection";

/** char codes for suit symbols */
const cardSymbols = {
  Clubs: 9827,
  Diamonds: 9830,
  Hearts: 9829,
  Spades: 9824
};

/**
 * DeckCard
 * Component that handles the large discarded deck card.
 * @param {Object} suit - card suit
 * @param {Object} rank - card rank
 */
function DeckCard({ suit, rank }) {
  const { setDiscardAreaSize } = useContext(DimensionsContext);
  const { room, user, buyInProgress } = useContext(RoomContext);

  /** sets styling for card */
  const cardStyle =
    suit === "Hearts" || suit === "Diamonds"
      ? styles.redCard
      : styles.blackCard;

  /** card suit symbol */
  const symbol = String.fromCharCode(cardSymbols[suit]);

  /**
   * onLongPressButton
   * Handles a user attempting to buy a card.  User must long press the discarded card
   * area while the buying process is active.
   */
  function onLongPressButton() {
    if (buyInProgress) {
      socket.emit("buyCard", { room, user });
    }
  }

  return (
    <TouchableHighlight onLongPress={onLongPressButton} underlayColor="green">
      <View
        /** store the dimentions of deck card area in dimensions context */
        onLayout={e => setDiscardAreaSize(e.nativeEvent.layout)}
        style={styles.container}
      >
        <Text style={[cardStyle, styles.cardTxtStyle]}>{rank}</Text>
        <Text style={cardStyle}>{symbol}</Text>
      </View>
    </TouchableHighlight>
  );
}

/** Styling for DeckCard Component */
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    height: 127,
    minWidth: 75,
    maxWidth: 75,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.4
  },
  blackCard: {
    fontSize: 30,
    color: "black"
  },
  redCard: {
    fontSize: 30,
    color: "red"
  },
  cardTxtStyle: {
    fontWeight: "bold",
    fontFamily: "HelveticaNeue-CondensedBold"
  }
});

export default DeckCard;
