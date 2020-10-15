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

  useEffect(() => {
    let mounted = true;
    /** Updates player cards on server getMyPlayer emit */
    socket.on("getMyPlayer", data => {
      if (mounted) setMyCards(data["hand"]);
    });

    /** Upon successfully discarding a card server emits a message to end turn */
    socket.on("discardCard", data => {
      if (mounted) setStartTurn(false);
    });

    /** Emits a discardCard message to server when user drops card into the discard pile */
    if (discardCard && mounted) {
      setMyCards([...myCards].filter(card => card.id !== discardCard.id));
      socket.emit("discardCard", { room, user, card: discardCard });
      setDiscardCard();
      setTimer(0);
    }
    return () => (mounted = false);
  }, [discardCard]);

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
