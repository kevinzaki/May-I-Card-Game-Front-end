import React, { createContext, useState, useEffect } from "react";
import socket from "../../util/socketConnection";

export const DeckContext = createContext();

const DeckProvider = props => {
  const [deckDropArea, setDeckDropArea] = useState({
    x: [0, 0],
    y: [0, 0]
  });
  //   const [melds, setMelds] = useState([
  //     {
  //       id: 0,
  //       cards: [
  //         { id: 1, rank: "2", suit: "Hearts" },
  //         { id: 2, rank: "3", suit: "Hearts" },
  //         { id: 3, rank: "4", suit: "Hearts" }
  //       ]
  //     }
  //   ]);

  useEffect(() => {
    // socket.on("getMyPlayer", data => {
    //   setMelds(data["hand"]);
    // });
    // return () => socket.disconnect();
  }, []);

  return (
    <DeckContext.Provider
      value={{
        deckDropArea,
        setDeckDropArea: area => setDeckDropArea(area)
      }}
    >
      {props.children}
    </DeckContext.Provider>
  );
};

export default DeckProvider;
