import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import OpponentCards from "./OpponentCards";

function SideBoard(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const list = [];
    const remainder = props.side === "left" ? 0 : 1;
    for (let i = 0; i < props.opponents.length; i++) {
      if (i % 2 === remainder)
        list.push(
          <OpponentCards
            key={props.opponents[i].id}
            cardCount={props.opponents[i].cardCount}
          />
        );
    }
    setItems(list);
  }, [props.opponents]);

  return <View style={styles.container}>{items}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginBottom: 25,
    justifyContent: "center"
  }
});

export default SideBoard;
