import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableHighlight
} from "react-native";
import ScoresModal from "./ScoresModal";
import Rules from "./Rules";
import io from "socket.io-client";
import socket from "../../util/socketConnection";
import { RoomContext } from "../contexts/RoomContext";
import { MyCardsContext } from "../contexts/MyCardsContext";

function TopBar() {
  const {
    room,
    user,
    timer,
    setTimer,
    buyCard,
    buyInProgress,
    setUsersBuying,
    startTurn,
    turn
  } = useContext(RoomContext);

  const { setDiscardCard, discardCard, myCards } = useContext(MyCardsContext);
  useEffect(() => {
    let timeCount;
    //if (timer === "L") clearTimeout(settimer);
    if (timer > 0) timeCount = setTimeout(() => setTimer(timer - 1), 1000);
    // else if (timer === 0 && buyInProgress) {
    //   socket.emit("buyCard", { room, user, buyCard });
    //   setTimer("L");
    // }
    // else if (timer === 0 && startTurn && turn === user && !discardCard) {
    //   let { id, rank, suit, order, value } = myCards[
    //     Math.floor(Math.random() * myCards.length)
    //   ];
    //   setDiscardCard({ id, rank, suit, order, value });
    // }
    else if (timer === 0) {
      setTimer(<ActivityIndicator size="small" color="#1f1f1f" />);
    }
    return () => {
      clearTimeout(timeCount);
    };
  }, [timer]);

  return (
    <View style={styles.container}>
      <Rules></Rules>
      <View style={styles.rules}>
        <Text style={styles.textColor}>{timer}</Text>
      </View>
      <ScoresModal></ScoresModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 20
  },
  rules: {},
  textColor: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "HelveticaNeue-CondensedBold",
    fontSize: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.81
  }
});

export default TopBar;
