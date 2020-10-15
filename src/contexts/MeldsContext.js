import React, { createContext, useState, useEffect, useContext } from "react";
import { Alert } from "react-native";
import socket from "../../util/socketConnection";
import { RoomContext } from "./RoomContext";

export const MeldsContext = createContext();

/**
 * MeldsContext
 * Stores and manages data for all melds related data.  Manages cards currently
 * being used to create a meld.  Manages all active melds. Manages dropping and swapping
 * with a meld card.
 */
const MeldsProvider = props => {
  const { room, user, round } = useContext(RoomContext);
  // All current melds
  const [melds, setMelds] = useState([]);
  // Melds currently being created
  const [createMeld, setCreateMeld] = useState([[], []]);
  // Current meld to display in the create a meld area
  const [meldToDisplay, setMeldToDisplay] = useState(0);
  // Meld button state
  const [meldButton, setMeldButton] = useState(false);
  // All cards from hand currently being used to meld or discard
  const [disabledCards, setDisabledCards] = useState({});
  // ID of meld a user is trying to swap / drop a card on
  const [meldDropID, setMeldDropID] = useState();
  // Current card from a user Hand they are attempting to drop on a meld
  const [dropCard, setDropCard] = useState({
    id: null,
    rank: null,
    suit: null,
    order: null,
    value: null
  });

  /** Reset disabled cards on new rounds */
  useEffect(() => {
    setDisabledCards({});
  }, [round]);

  /** Handles dropping or swapping a card onto an existing meld */
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
              // If swappable ask if player wants to swap or discard
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
                // if not swappable just attempt add to meld
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
        // reset meld drop ID and drop card
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
  }, [dropCard]);

  /** Receive meld data */
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      socket.on("melds", data => {
        setMelds(data);
      });
    }
    return () => (mounted = false);
  }, []);

  /** Handles creating a new meld */
  useEffect(() => {
    if (meldButton) {
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

  /**
   * createNewMeld
   * Helper method to setting state for create Meld.
   * @param {Number} id
   * @param {Object} card
   */
  function createNewMeld(id, card) {
    let newMelds = [[...createMeld[0]], [...createMeld[1]]];
    if (card) newMelds[id].push(card);
    else {
      newMelds = [[], []];
      setDisabledCards({});
    }
    setCreateMeld(newMelds);
  }

  /**
   * addToDisabledCards
   * Adds a card to disabled cards
   * @param {number} id
   */
  function addToDisabledCards(id) {
    setDisabledCards({ ...disabledCards, [id]: true });
  }

  return (
    <MeldsContext.Provider
      value={{
        melds,
        createMeld,
        meldToDisplay,
        meldButton,
        disabledCards,
        dropCard,
        setMelds: newMeld => setMelds([...Melds, newMeld]),
        setCreateMeld: (id, card) => createNewMeld(id, card),
        setMeldToDisplay: value => setMeldToDisplay(value),
        setMeldButton: value => setMeldButton(value),
        setDisabledCards: cardID => addToDisabledCards(cardID),
        setDropCard: card => setDropCard(card),
        setMeldDropID: id => setMeldDropID(id)
      }}
    >
      {props.children}
    </MeldsContext.Provider>
  );
};

export default MeldsProvider;
