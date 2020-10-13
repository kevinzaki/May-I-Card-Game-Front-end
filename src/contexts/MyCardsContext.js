import React, { createContext, useState, useEffect, useContext } from "react";
import socket from "../../util/socketConnection";
import { RoomContext } from "./RoomContext";

export const MyCardsContext = createContext();

/**
 * MyCardsContext
 * Manages all player card data used across application components.
 */
const MyCardsProvider = props => {
  const { room, user, setStartTurn, setTimer } = useContext(RoomContext);
  /** All player cards for a user */
  const [myCards, setMyCards] = useState([]);
  /** Stores a card dropped into the discard pile */
  const [discardCard, setDiscardCard] = useState();

  /** Updates player cards on server getMyPlayer emit */
  useEffect(() => {
    socket.on("getMyPlayer", data => {
      setMyCards(data["hand"]);
    });
  }, []);

  /** Emits a discardCard message to server when user drops card into the discard pile */
  useEffect(() => {
    if (discardCard) {
      setMyCards([...myCards].filter(card => card.id !== discardCard.id));
      socket.emit("discardCard", { room, user, card: discardCard });
      setDiscardCard();
      setTimer(0);
    }
  }, [discardCard]);

  /** Upon successfully discarding a card server emits a message to end turn */
  useEffect(() => {
    socket.on("discardCard", data => {
      setStartTurn(false);
    });
  });

  return (
    <MyCardsContext.Provider
      value={{
        myCards,
        discardCard,
        setMelds: newCard => setMyCards([...myCards, newCard]),
        setDiscardCard: card => setDiscardCard(card)
      }}
    >
      {props.children}
    </MyCardsContext.Provider>
  );
};

export default MyCardsProvider;
