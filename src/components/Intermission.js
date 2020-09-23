import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ScoresTable from "./ScoresTable";
import socket from "../../util/socketConnection";
import { RoomContext } from "../contexts/RoomContext";
import ConfettiCannon from "react-native-confetti-cannon";

function Intermission() {
  const {
    setIntermission,
    intermission,
    round,
    winner,
    room,
    user,
    scores
  } = useContext(RoomContext);

  const [intermissionTimer, setIntermissionTimer] = useState(null);

  useEffect(() => {
    if (round < 6) setIntermissionTimer(20);
  }, []);

  useEffect(() => {
    if (intermissionTimer > 0)
      setTimeout(() => setIntermissionTimer(intermissionTimer - 1), 1000);
    else if (intermissionTimer === 0) {
      socket.emit("startRound", { room, user });
      setIntermission(false);
    }
  }, [intermissionTimer]);

  return (
    <View style={styles.centeredView}>
      <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
      <View style={styles.modalView}>
        {round === 6 && (
          <Text>GAME OVER! {scores[0].name} has won the game!</Text>
        )}
        {round < 6 && (
          <Text>
            {winner} has won round {round}! Round {parseInt(round) + 1} will be
            starting in {intermissionTimer} seconds...
          </Text>
        )}
        <ScoresTable />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.95)",
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    padding: 20,
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  }
});
export default Intermission;
