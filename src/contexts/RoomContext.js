import React, { createContext, useState, useEffect, useReducer } from "react";
import socket from "../../util/socketConnection";

export const RoomContext = createContext();

const RoomProvider = props => {
  const [room, setRoom] = useState();
  const [userName, setUserName] = useState();
  const [numberOfPlayers, setNumberOfPlayers] = useState();
  const [turn, setTurn] = useState();
  const [user, setUser] = useState();
  const [startTurn, setStartTurn] = useState(false);
  const [buyCard, setBuyCard] = useState(false);
  const [buyInProgress, setBuyInProgress] = useState(false);
  const [timer, setTimer] = useState(0);
  const [usersBuying, setUsersBuying] = useState([]);
  const [round, setRound] = useState("1");
  const [intermission, setIntermission] = useState(false);
  const [scores, setScores] = useState([]);
  const [winner, setWinner] = useState(null);

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
        setRoom: room => setRoom(room),
        user,
        turn,
        setTurn: id => setTurn(id),
        buyCard,
        setBuyCard: val => setBuyCard(val),
        timer,
        setTimer: time => setTimer(time),
        buyInProgress,
        setBuyInProgress: val => setBuyInProgress(val),
        usersBuying,
        setUsersBuying: users => setUsersBuying(users),
        startTurn,
        setStartTurn: val => setStartTurn(val),
        round,
        setRound: round => setRound(round),
        intermission,
        setIntermission: val => setIntermission(val),
        scores,
        setScores: scores => setScores(scores),
        winner,
        setWinner: user => setWinner(user),
        numberOfPlayers,
        setNumberOfPlayers: num => setNumberOfPlayers(num),
        userName,
        setUserName: name => setUserName(name)
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
