import React, { createContext, useState, useEffect, useContext } from "react";
import { Alert } from "react-native";
import socket from "../../util/socketConnection";
import { RoomContext } from "./RoomContext";

export const MeldsContext = createContext();

const MeldsProvider = props => {
  const { room, user, round } = useContext(RoomContext);

  const [melds, setMelds] = useState([]);
  const [createMeld, setCreateMeld] = useState([[], []]);
  const [meldToDisplay, setMeldToDisplay] = useState(0);
  const [meldButton, setMeldButton] = useState(false);
  const [disabledCards, setDisabledCards] = useState({});
  const [dropCard, setDropCard] = useState({
    id: null,
    rank: null,
    suit: null,
    order: null,
    value: null
  });
  const [meldDropID, setMeldDropID] = useState();
  const [swapButton, setSwapButton] = useState(false);

  useEffect(() => {
    setDisabledCards({});
  }, [round]);

  useEffect(() => {
    if (meldDropID >= 0 && dropCard.id >= 0) {
      // check if user has meld
      socket.emit("hasMeld", { room, user }, function(res) {
        // if true check if meld is swapable
        if (res) {
          socket.emit(
            "canSwapWithMeld",
            { room, user, meldDropID, card: dropCard },
            function(res) {
              if (res) {
                Alert.alert(
                  "SWAP OR DISCARD",
                  "Would you like to pick up the wildcard 2?",
                  [
                    {
                      text: "Yes, swap!",
                      onPress: () => {
                        socket.emit("swapWithMeld", {
                          room,
                          user,
                          meldDropID,
                          card: dropCard
                        });
                      }
                    },
                    {
                      text: "No, just discard!",
                      onPress: () => {
                        socket.emit("addToMeld", {
                          room,
                          user,
                          meldDropID,
                          card: dropCard
                        });
                      }
                    }
                  ],
                  { cancelable: false }
                );
              } else {
                socket.emit("addToMeld", {
                  room,
                  user,
                  meldDropID,
                  card: dropCard
                });
              }
            }
          );
        } else {
          alert("You Must have you meld before swapping with melds");
        }
        setMeldDropID();
        setDropCard({
          id: null,
          rank: null,
          suit: null,
          order: null,
          value: null
        });
      });
    }
    // see if we can swap with meld
    // if there is a duce ask user if they want to pick the duce up
    // or just drop their card down
    // then take appropriate action
  }, [dropCard]);

  // useEffect(() => {
  //   socket.on("melds", allMelds => {
  //     setMelds(allMelds);
  //   });
  // });

  useEffect(() => {
    socket.on("melds", data => {
      setMelds(data);
    });
  }, []);

  useEffect(() => {
    if (meldButton) {
      console.log(createMeld);
      setMeldButton(false);
      let newMelds = [];
      if (createMeld[0].length) newMelds.push(createMeld[0]);
      if (createMeld[1].length) newMelds.push(createMeld[1]);

      if (
        (createMeld[0].length && createMeld[0].length < 3) ||
        (createMeld[1].length && createMeld[1].length < 3) ||
        !newMelds.length
      ) {
        alert("Invalid Melds.");
      } else {
        socket.emit(
          "newMeld",
          { room: room, user: user, melds: newMelds },
          function(response) {
            if (response) {
              setCreateMeld([[], []]);
            }
          }
        );
      }
    }
  }, [meldButton]);

  function createNewMeld(id, card) {
    let newMelds = [[...createMeld[0]], [...createMeld[1]]];
    if (card) newMelds[id].push(card);
    else {
      newMelds = [[], []];
      setDisabledCards({});
    }
    setCreateMeld(newMelds);
  }

  function addToDisabledCards(id) {
    setDisabledCards({ ...disabledCards, [id]: true });
  }

  return (
    <MeldsContext.Provider
      value={{
        melds,
        setMelds: newMeld => setMelds([...Melds, newMeld]),
        setCreateMeld: (id, card) => createNewMeld(id, card),
        createMeld,
        meldToDisplay,
        setMeldToDisplay: value => setMeldToDisplay(value),
        meldButton,
        setMeldButton: value => setMeldButton(value),
        disabledCards,
        setDisabledCards: cardID => addToDisabledCards(cardID),
        setDropCard: card => setDropCard(card),
        setMeldDropID: id => setMeldDropID(id),
        dropCard
      }}
    >
      {props.children}
    </MeldsContext.Provider>
  );
};

export default MeldsProvider;
