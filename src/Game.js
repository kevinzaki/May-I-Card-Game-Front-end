import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  Alert
} from "react-native";
import { Snackbar } from "react-native-paper";
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
 * Initializes and maintains game layout.
 *
 */
function Game({ navigation, createRoom }) {
  const isMountedRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [snackBar, setSnackBar] = useState(false);
  const [snackBarText, setSnackBarText] = useState(null);
  const [myPlayer, setMyPlayer] = useState({});
  const [buys, setBuys] = useState("6");
  const {
    room,
    user,
    setRoom,
    setUserName,
    userName,
    numberOfPlayers,
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

  useEffect(() => {
    isMountedRef.current = true;

    //const socket = io("http://192.168.1.2:3000");
    console.log("Game " + room);
    if (!socket.connected && isMountedRef.current) socket.connect();
    /** create or join room uses createRoom prop to determine which action to take */
    if (room && user && isMountedRef.current) {
      if (createRoom) {
        socket.emit(
          "createRoom",
          { room, user, userName, numberOfPlayers },
          function({ success, message }) {
            if (success) {
              console.log(message);
            } else {
              Alert.alert("ERROR", message, [
                { text: "Back", onPress: () => navigation.goBack() }
              ]);
            }
          }
        );
      } else {
        socket.emit("joinRoom", { room, user, userName }, function({
          success,
          message
        }) {
          if (success) {
            console.log(message);
          } else {
            Alert.alert("ERROR", message, [
              { text: "Back", onPress: () => navigation.goBack() }
            ]);
          }
        });
      }
    }

    /**
     * reconnectEstablished
     * Server alerts client when a sucessful reconnection was established.
     * Client then closes "Waiting for other players" modal and messages
     * server to reconnect to game.
     */
    socket.on("reconnectEstablished", () => {
      if (isMountedRef.current) {
        setModalVisible(false);
        socket.emit("reconnectToGame", { room, user });
      }
    });

    /**
     * gameReady
     * The server alerts us when the game parameters are met. Close modal
     * and message server to begin procedures to start round.
     */
    socket.on("gameReady", data => {
      if (isMountedRef.current) {
        setModalVisible(false);
        console.log("Start Roun " + room);
        socket.emit("startRound", { room, user });
      }
    });

    /**
     * getMyPlayer
     * Message from server containing all data relevant to ones own player.
     */
    socket.on("getMyPlayer", data => {
      if (isMountedRef.current) {
        setMyPlayer(data);
        setBuys(data.buys.toString());
      }
    });

    /**
     * getCurrentRound
     * Message from server containing the current round
     */
    socket.on("getCurrentRound", data => {
      if (isMountedRef.current) setRound(data);
    });

    /**
     * timedEvent
     * Each buy and turn in game play have time limits to complete an action. The server
     * handles the time and sends the client what to set their timer to.
     */
    socket.on("timedEvent", ({ timer, event }) => {
      if (event === "BUY") setBuyInProgress(true);
      if (event === "TURN") setStartTurn(true);
      setTimer(Math.floor((timer - Date.now()) / 1000) - 1);
    });

    /**
     * setTurn
     * Updated turn id
     */
    socket.on("setTurn", id => {
      if (isMountedRef.current) setTurn(id);
    });

    /**
     * buyFinalized
     * When a user successfully buys a card the server emits a buyFinalized message
     * The client then emits an updateAfterBuy message to the server to get all the
     * required game updates after a buy.  Sets buyCard and BuyInProgress states to false.
     */
    socket.on("buyFinalized", () => {
      if (isMountedRef.current) {
        socket.emit("updateAfterBuy", { room, user }, function(data) {
          setBuyCard(false);
          setBuyInProgress(false);
        });
      }
    });

    /**
     * userDrewACard
     * Server messages client when a user drew a card.  The client then requests updated
     * player data.
     */
    socket.on("userDrewACard", () => {
      if (isMountedRef.current) socket.emit("getOtherPlayers", { room, user });
    });

    /**
     * updateOpponentCards
     * Server messages clients that it needs to update opponent card card because of a game
     * action that occurred.
     */
    socket.on("updateOpponentCards", () => {
      if (isMountedRef.current) socket.emit("getOpponentCards", { room, user });
    });

    /**
     * updateAfterMeldDropOrSwap
     * Server alerts us to a change in the meld objects.  Client requests updates to
     * other opponents cards and melds object.
     */
    socket.on("updateAfterMeldDropOrSwap", () => {
      if (isMountedRef.current) socket.emit("getOpponentCards", { room, user });
      if (isMountedRef.current) socket.emit("getMelds", { room });
    });

    /**
     * roundFinished
     * On round ending the server alerts the client and client resets game timer to 0,
     * sets the winner of round sent by server, and begins intermission period
     */
    socket.on("roundFinished", user => {
      if (isMountedRef.current) setTimer(0); // L
      if (isMountedRef.current) setWinner(user);
      if (isMountedRef.current) setIntermission(true);
    });

    /**
     * scores
     * Updates scores data after a round has ended.
     */
    socket.on("scores", data => {
      if (isMountedRef.current) setScores(data);
    });

    return () => {
      isMountedRef.current = false;
      socket.disconnect();
    };
  }, []);

  /** Every turn update triggers a buyProcess */
  useEffect(() => {
    if (turn !== undefined && isMountedRef.current) {
      socket.emit("buyProcess", { room, user });
    }
  }, [turn]);

  /** Handles Snack Bar / Game Alerts / Updates */
  useEffect(() => {
    let timer;
    /**
     * snackBar
     * When there is a critical game action such as a change in TURN, BUY, or MELD
     * the server alerts us to display a snack bar alert.
     */
    if (isMountedRef.current) {
      socket.on("snackBar", ({ userID, name, action }) => {
        let message = action => {
          let msg = "";
          switch (action) {
            case "TURN":
              msg =
                userID === user
                  ? "It is now your turn!"
                  : `It is ${name}'s turn.`;
              break;
            case "BUY":
              msg =
                userID === user
                  ? "You bought a card."
                  : `${name} bought a card.`;
              break;
            case "MELD":
              msg =
                userID === user
                  ? "You placed down a meld."
                  : `${name} placed down a meld.`;
          }
          return msg;
        };
        setSnackBarText(message(action));
        setSnackBar(true);
        timer = setTimeout(() => setSnackBar(false), 3000);
      });
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  /** Handles drawing card when it is the users turn */
  useEffect(() => {
    if (startTurn && turn === user && isMountedRef.current)
      socket.emit("drawCard", { room, user });
  }, [startTurn]);

  /**
   * handleLeaveRoom
   * While a user is waiting for others players they may go back / leave the room.
   * This function alerts the server and navigates back to the home screen.
   */
  function handleLeaveRoom() {
    if (isMountedRef.current) {
      socket.emit("leaveRoom", { room, user }, function() {
        setRoom("");
        setUserName("");
        socket.disconnect();
        navigation.goBack();
      });
    }
  }

  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.modalText}>
              Please be patient while we wait for other players.
            </Text>
            <TouchableHighlight
              style={styles.openButton}
              onPressIn={handleLeaveRoom}
            >
              <Text style={styles.textColor}>GO BACK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={intermission}>
        <Intermission navigation={navigation} />
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
      <Snackbar
        visible={snackBar}
        onDismiss={() => setSnackBar(false)}
        action={{
          label: "Close",
          onPress: () => {}
        }}
      >
        {snackBarText}
      </Snackbar>
    </View>
  );
}

/** All styling for Game Component */
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
  },
  openButton: {
    width: 100,
    alignSelf: "center",
    backgroundColor: "#00a33a",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.81
  },
  textColor: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
    fontFamily: "HelveticaNeue-CondensedBold",
    fontSize: 16
  }
});

export default Game;
