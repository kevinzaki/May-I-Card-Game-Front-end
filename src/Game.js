import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Modal,
  Text,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import Snackbar from "react-native-snackbar";
import socket from "../util/socketConnection";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import GameBoard from "./components/GameBoard";
import Intermission from "./components/Intermission";
import MyCardsProvider from "./contexts/MyCardsContext";
import MeldsProvider from "./contexts/MeldsContext";
import DimensionsProvider from "./contexts/DimensionsContext";
import { RoomContext } from "./contexts/RoomContext";

/**
 *
 * Game Component
 * Sets up the inital game board layout.
 * Upon game ready this component will set the initial game data.
 *
 */
function Game(props) {
  const [modalVisible, setModalVisible] = useState(true);
  // const [intermissionModalVisible, setIntermissionModalVisible] = useState(
  //   true
  // );
  const [myPlayer, setMyPlayer] = useState({});
  const [buys, setBuys] = useState("6");
  const {
    room,
    user,
    turn,
    setTurn,
    setBuyInProgress,
    setTimer,
    setStartTurn,
    startTurn,
    setBuyCard,
    round,
    setRound,
    intermission,
    setIntermission,
    setWinner,
    setScores
  } = useContext(RoomContext);

  // useEffect(() => {
  //   if (modalVisible) setTimeout(() => setModalVisible(false), 4000);
  // }, [modalVisible]);

  useEffect(() => {
    // attempt to join desired room
    if (room && user) {
      socket.emit("joinRoom", { room, user }, function(res) {
        if (res) console.log(user + " successfully joined room " + room);
        else alert("There was a problem connecting you to room " + room);
      });
    }

    // game server alerts us game is ready to begin
    // send a response to start game
    // server will send a series of emits with game data
    socket.on("gameReady", data => {
      setModalVisible(false);
      socket.emit("startRound", { room, user });
    });

    // sets / updates myPlayer profile upon server emit
    socket.on("getMyPlayer", data => {
      setMyPlayer(data);
      setBuys(data.buys.toString());
    });

    // sets / updates current round data
    socket.on("getCurrentRound", data => {
      setRound(data);
    });

    // each game event is timed
    // use time event to manage the amount of time a user has to complete actions
    socket.on("timedEvent", ({ timer, event }) => {
      //if (event === "ROUND") setIntermission(true);
      if (event === "BUY") setBuyInProgress(true);
      if (event === "TURN") setStartTurn(true);
      // set timer
      setTimer(Math.floor((timer - Date.now()) / 1000) - 1);
    });

    // on setTurn a new turn is being initiated, update turn accordingly
    socket.on("setTurn", id => {
      setTurn(id);
    });

    // the server will let us know if a user bought a card
    // client requests updates to game data based on card purchase
    // upon receiving the updates setBuyCard to false (the default buy card value)
    // setBuyInProgress to false as we are no longer in buying phase
    socket.on("buyFinalized", buyer => {
      socket.emit("updateAfterBuy", { room, user }, function(data) {
        setBuyCard(false);
        setBuyInProgress(false);
      });
    });

    // server will alert us when a user drew a card from the deck
    // client asks server for an update of all oponents data
    socket.on("userDrewACard", () => {
      socket.emit("getOtherPlayers", { room, user });
    });

    // upon round completetion
    socket.on("roundFinished", winner => {
      //alert(winner + " won the round!");
      //setIntermission(true);
      // socket.emit("isGameOver", { room }, function(res) {
      //   if (res) {
      //     console.log("GAME IS OVER");
      //     // game is over
      //   } else {
      //     console.log("ROUND IS OVER");
      //     // continue to next round
      //     //setIntermission(true);
      //     socket.emit("startRound", { room, user });
      //   }
      // });
    });

    socket.on("updateOpponentCards", () => {
      socket.emit("getOponentCards", { room, user });
    });

    socket.on("updateAfterMeldDropOrSwap", () => {
      socket.emit("getOponentCards", { room, user });
      socket.emit("getMelds", { room });
    });

    socket.on("roundFinished", user => {
      setTimer("L");
      setWinner(user);
      setIntermission(true);
    });

    socket.on("scores", data => {
      setScores(data);
    });

    socket.on("snackBar", msg => {
      Snackbar.dismiss();
      Snackbar.show({
        text: msg,
        duration: Snackbar.LENGTH_SHORT
      });
    });
    //return () => socket.disconnect();
  }, [room]);

  // every turn update triggers a buy process event
  useEffect(() => {
    if (turn !== undefined) {
      socket.emit("buyProcess", { room, user });
    }
  }, [turn]);

  useEffect(() => {
    // once the buying process is over, the user turn begins
    // user draws a card from the deck and their timer begins
    if (startTurn && turn === user) {
      socket.emit("drawCard", { room, user }, function(data) {
        setTimer(50);
      });
    }
  }, [startTurn]);

  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.modalText}>
              Please be patient while we wait for other players.
            </Text>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={intermission}>
        <Intermission />
      </Modal>
      <DimensionsProvider>
        <MyCardsProvider>
          <MeldsProvider>
            <TopBar />
            <GameBoard />
            <BottomBar round={round} buys={buys} />
          </MeldsProvider>
        </MyCardsProvider>
      </DimensionsProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {},
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    padding: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default Game;
