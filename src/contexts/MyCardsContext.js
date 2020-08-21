import React, { createContext, useState, useEffect } from "react";
import socket from "../../util/socketConnection";
export const MyCardsContext = createContext();

const MyCardsProvider = props => {
  const [myCards, setMyCards] = useState([
    { id: 0, rank: "A", suit: "Spades" },
    { id: 1, rank: "2", suit: "Hearts" },
    { id: 2, rank: "3", suit: "Hearts" },
    { id: 3, rank: "4", suit: "Hearts" },
    { id: 4, rank: "5", suit: "Hearts" },
    { id: 5, rank: "6", suit: "Hearts" },
    { id: 6, rank: "7", suit: "Hearts" },
    { id: 7, rank: "8", suit: "Hearts" },
    { id: 8, rank: "8", suit: "Hearts" },
    { id: 9, rank: "8", suit: "Hearts" },
    { id: 10, rank: "8", suit: "Hearts" },
    { id: 11, rank: "8", suit: "Hearts" },
    { id: 12, rank: "8", suit: "Hearts" }
  ]);

  const [discardCard, setDiscardCard] = useState({});

  useEffect(() => {
    socket.on("getMyPlayer", data => {
      setMyCards(data["hand"]);
    });
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const currentCards = [...myCards];
    setMyCards([...myCards].filter(card => card.id !== discardCard.id));
    socket.emit("discardCard", discardCard);
    socket.on("discardCard", data => {
      if (!data["success"]) {
        setMyCards(currentCards);
      }
    });
    return () => socket.disconnect();
  }, [discardCard]);

  return (
    <MyCardsContext.Provider
      value={{
        myCards,
        addToState: newCard => setMyCards([...myCards, newCard]),
        setDiscardCard: card => setDiscardCard(card)
      }}
    >
      {props.children}
    </MyCardsContext.Provider>
  );
};

export default MyCardsProvider;
