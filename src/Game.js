import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import socket from "../util/socketConnection";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import GameBoard from "./components/GameBoard";
import MyCardsProvider from "./contexts/MyCardsContext";
import MeldsProvider from "./contexts/MeldsContext";
import DeckProvider from "./contexts/DeckContext";

function Game(props) {
  // useState is a Hook that lets you add React state to function components
  // initial arguement to useState is the initial state
  // state returns the state (game) along with a function to update it (setGame)
  const [myPlayer, setMyPlayer] = useState({});
  const [round, setRound] = useState("1");
  const [buys, setBuys] = useState("6");
  //const [players, setPlayers] = useState();

  // The Effect Hook lets you perform side effects in function components
  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    socket.emit("joinRoom", props.room);

    socket.on("gameReady", data => {
      socket.emit("startGame", props.room);
    });

    socket.on("getMyPlayer", data => {
      setMyPlayer(data);
      setBuys(data.buys.toString());
    });

    socket.on("getCurrentRound", data => {
      setRound(data);
    });

    // Every effect may return a function that cleans up after it
    // to avoid memory leaks / bugs clean up previous effects
    return () => socket.disconnect();
  }, []); // the useEffect can take a second argument - an array of values
  // the useEffect will only re-run if the values of the array have changed
  // hence passing an empty array will force it to only run on mount and unmount
  return (
    <View style={styles.container}>
      <TopBar />
      <MyCardsProvider>
        <MeldsProvider>
          <DeckProvider>
            <GameBoard />
          </DeckProvider>
        </MeldsProvider>
      </MyCardsProvider>
      <BottomBar round={round} buys={buys} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default Game;
