import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import ScoresTable from "./ScoresTable";
import socket from "../../util/socketConnection";
import { RoomContext } from "../contexts/RoomContext";
import ConfettiCannon from "react-native-confetti-cannon";

function Intermission({ navigation }) {
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

  function handleLeaveRoom() {
    socket.emit("leaveRoom", { room, user });
    navigation.goBack();
  }

  return (
    <View style={styles.centeredView}>
      <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
      <View style={styles.modalView}>
        {round >= 6 && (
          <View>
            <Text style={styles.winnerTxt}>WINNER</Text>
            <Text style={styles.winnerNameTxt}>{scores[0].name}</Text>
          </View>
        )}
        {round < 6 && (
          <View>
            <Text style={styles.roundTxt}>Round {round} complete</Text>
            <Text style={styles.intermissionTxt}>
              {winner} has won the round!
            </Text>
          </View>
        )}
        <ScoresTable />
        {round < 6 && (
          <Text style={styles.nextRoundTxt}>
            Round {parseInt(round) + 1} will be starting in {intermissionTimer}{" "}
            seconds...
          </Text>
        )}
        {round >= 6 && (
          <View>
            <Text style={styles.nextRoundTxt}>Thank you for playing!</Text>
            <TouchableHighlight
              style={styles.openButton}
              onPressIn={handleLeaveRoom}
            >
              <Text style={styles.textColor}>GO BACK</Text>
            </TouchableHighlight>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(25,25,25,1)",
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
  },
  roundTxt: {
    alignSelf: "center",
    color: "#00a33a",
    textTransform: "uppercase",
    fontSize: 28,
    fontFamily: "HelveticaNeue-CondensedBold",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.8,
    shadowRadius: 1.5
  },
  winnerTxt: {
    alignSelf: "center",
    color: "#00a33a",
    textTransform: "uppercase",
    fontSize: 32,
    fontFamily: "HelveticaNeue-CondensedBold",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.8,
    shadowRadius: 1.5
  },
  winnerNameTxt: {
    paddingBottom: 40,
    alignSelf: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 42,
    fontFamily: "HelveticaNeue-CondensedBold",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.8,
    shadowRadius: 1.5
  },
  intermissionTxt: {
    paddingBottom: 40,
    alignSelf: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 22,
    fontFamily: "HelveticaNeue-CondensedBold",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.8,
    shadowRadius: 1.5
  },
  nextRoundTxt: {
    paddingTop: 30,
    alignSelf: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 14,
    fontFamily: "HelveticaNeue-CondensedBold",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.8,
    shadowRadius: 1.5
  }
});
export default Intermission;
