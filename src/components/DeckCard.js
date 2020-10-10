import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { DimensionsContext } from "../contexts/DimensionsContext";
import { RoomContext } from "../contexts/RoomContext";
import socket from "../../util/socketConnection";

const cardSymbols = {
  Clubs: 9827,
  Diamonds: 9830,
  Hearts: 9829,
  Spades: 9824
};

function DeckCard(props) {
  const { setDiscardAreaSize } = useContext(DimensionsContext);
  const {
    room,
    user,
    buyCard,
    setBuyCard,
    setUsersBuying,
    usersBuying,
    buyInProgress
  } = useContext(RoomContext);

  function _onLongPressButton() {
    if (buyInProgress) {
      socket.emit("buyCard", { room, user });
    }
  }

  // useEffect(() => {
  //   if (usersBuying.length === 3) {
  //     socket.emit("startBuyProcess", { room, usersBuying });
  //   }
  // }, [usersBuying]);

  const cardStyle =
    props.suit === "Hearts" || props.suit === "Diamonds"
      ? styles.redCard
      : styles.blackCard;
  const symbol = String.fromCharCode(cardSymbols[props.suit]);
  return (
    <TouchableHighlight onLongPress={_onLongPressButton} underlayColor="green">
      <View
        onLayout={e => setDiscardAreaSize(e.nativeEvent.layout)}
        style={styles.container}
      >
        <Text
          style={[
            cardStyle,
            { fontWeight: "bold", fontFamily: "HelveticaNeue-CondensedBold" }
          ]}
        >
          {props.rank}
        </Text>
        <Text style={cardStyle}>{symbol}</Text>
      </View>
    </TouchableHighlight>
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
  }
});

export default DeckCard;
