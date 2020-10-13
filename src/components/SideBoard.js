import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import OpponentCards from "./OpponentCards";

/**
 * SideBoard
 * Manages the side bar layout that contains opponent cards.  Each side bar
 * can either contain one or two users depending on the number of players in the game.
 * A game can have either 3 or 5 total players. Renders an OpponentCards component for
 * each opponent in opponents [1 or 1 and 3 for left side] and [2 or 2 and 4 on the right side].
 *
 * @param {String} side - left or right side of the view
 * @param {Object} opponents - Opponent data
 */
function SideBoard({ side, opponents }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const list = [];
    const remainder = side === "left" ? 0 : 1;
    for (let i = 0; i < opponents.length; i++) {
      if (i % 2 === remainder)
        list.push(
          <OpponentCards
            key={opponents[i].id}
            cardCount={opponents[i].cardCount}
          />
        );
    }
    setItems(list);
  }, [opponents]);

  return <View style={styles.container}>{items}</View>;
}
/** Styling for SideBoard Component */
const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginBottom: 25,
    justifyContent: "center"
  }
});

export default SideBoard;
