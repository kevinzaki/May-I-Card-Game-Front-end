import React, { createContext, useState, useEffect } from "react";
import socket from "../../util/socketConnection";
export const MeldsContext = createContext();

const MeldsProvider = props => {
  const [newMeldDropArea, setNewMeldDropArea] = useState({
    x: [0, 0],
    y: [0, 0]
  });
  const [meldsSwapArea, setMeldsSwapArea] = useState({});
  const [melds, setMelds] = useState([
    {
      id: 0,
      cards: [
        { id: 1, rank: "2", suit: "Hearts" },
        { id: 2, rank: "3", suit: "Hearts" },
        { id: 3, rank: "4", suit: "Hearts" }
      ]
    },
    {
      id: 1,
      cards: [
        { id: 10, rank: "8", suit: "Hearts" },
        { id: 11, rank: "8", suit: "Hearts" },
        { id: 12, rank: "8", suit: "Hearts" }
      ]
    },
    {
      id: 3,
      cards: [
        { id: 10, rank: "8", suit: "Hearts" },
        { id: 11, rank: "8", suit: "Hearts" },
        { id: 12, rank: "8", suit: "Hearts" }
      ]
    },
    {
      id: 4,
      cards: [
        { id: 10, rank: "8", suit: "Hearts" },
        { id: 11, rank: "8", suit: "Hearts" },
        { id: 12, rank: "8", suit: "Hearts" }
      ]
    }
  ]);
  const [createMeld, setCreateMeld] = useState([[], []]);
  const [meldToDisplay, setMeldToDisplay] = useState(0);

  useEffect(() => {
    socket.on("getMyPlayer", data => {
      setMelds(data["hand"]);
    });
    return () => socket.disconnect();
  }, []);

  // function createNewMeld(id, card) {
  //   let newMelds = [[...createMeld[0]], [...createMeld[1]]];
  //   newMelds[id].push(card);
  //   setCreateMeld(newMelds);
  // }

  return (
    <MeldsContext.Provider
      value={{
        melds,
        addToState: newMeld => setMelds([...Melds, newMeld]),
        newMeldDropArea,
        setNewMeldDropArea: area => setNewMeldDropArea(area),
        //setCreateMeld: (id, card) => createNewMeld(id, card),
        createMeld,
        meldToDisplay,
        setMeldToDisplay: value => setMeldToDisplay(value),
        setMeldsSwapArea: areas => setMeldsSwapArea(areas),
        meldsSwapArea
      }}
    >
      {props.children}
    </MeldsContext.Provider>
  );
};

export default MeldsProvider;
