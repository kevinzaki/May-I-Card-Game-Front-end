import React, { createContext, useState, useEffect, useContext } from "react";
import socket from "../../util/socketConnection";
import { RoomContext } from "./RoomContext";

export const MyCardsContext = createContext();

const MyCardsProvider = props => {
  const { room, user, setStartTurn, setTimer } = useContext(RoomContext);

  const [myCards, setMyCards] = useState([]);
  const [discardCard, setDiscardCard] = useState();

  useEffect(() => {
    socket.on("getMyPlayer", data => {
      setMyCards(data["hand"]);
    });
  }, []);

  useEffect(() => {
    if (discardCard) {
      setMyCards([...myCards].filter(card => card.id !== discardCard.id));
      socket.emit("discardCard", { room, user, card: discardCard });
      setDiscardCard();
      setTimer("L");
    }
  }, [discardCard]);

  useEffect(() => {
    socket.on("discardCard", data => {
      setStartTurn(false);
    });
  });

  return (
    <MyCardsContext.Provider
      value={{
        myCards,
        setMelds: newCard => setMyCards([...myCards, newCard]),
        setDiscardCard: card => setDiscardCard(card),
        discardCard
      }}
    >
      {props.children}
    </MyCardsContext.Provider>
  );
};

export default MyCardsProvider;
