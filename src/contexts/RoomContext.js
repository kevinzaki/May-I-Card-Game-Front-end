import React, { createContext, useState, useEffect, useReducer } from "react";
import socket from "../../util/socketConnection";

export const RoomContext = createContext();

const RoomProvider = props => {
  // Room ID
  const [room, setRoom] = useState();
  // User Name
  const [userName, setUserName] = useState();
  // Number of Game players allowed
  const [numberOfPlayers, setNumberOfPlayers] = useState();
  // Current turn ID
  const [turn, setTurn] = useState();
  // User profile
  const [user, setUser] = useState();
  // Start a users turn
  const [startTurn, setStartTurn] = useState(false);
  // Buy a card
  const [buyCard, setBuyCard] = useState(false);
  // Buying procedure in progress
  const [buyInProgress, setBuyInProgress] = useState(false);
  // Game action timer
  const [timer, setTimer] = useState(0);
  // Current game round
  const [round, setRound] = useState("1");
  // is currently in intermission
  const [intermission, setIntermission] = useState(false);
  // Game scores
  const [scores, setScores] = useState([]);
  // Winner of game
  const [winner, setWinner] = useState(null);

  /** Generate user ID */
  useEffect(() => {
    const random = Math.random()
      .toString(36)
      .substring(3);
    setUser(random);
  }, []);

  return (
    <RoomContext.Provider
      value={{
        room,
        buyCard,
        timer,
        user,
        turn,
        buyInProgress,
        startTurn,
        round,
        intermission,
        scores,
        winner,
        numberOfPlayers,
        userName,
        setTurn: id => setTurn(id),
        setRoom: room => setRoom(room),
        setBuyCard: val => setBuyCard(val),
        setTimer: time => setTimer(time),
        setBuyInProgress: val => setBuyInProgress(val),
        setStartTurn: val => setStartTurn(val),
        setRound: round => setRound(round),
        setIntermission: val => setIntermission(val),
        setScores: scores => setScores(scores),
        setWinner: user => setWinner(user),
        setNumberOfPlayers: num => setNumberOfPlayers(num),
        setUserName: name => setUserName(name)
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
