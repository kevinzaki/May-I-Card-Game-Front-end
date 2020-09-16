import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Card from "./Card";
import { MyCardsContext } from "../contexts/MyCardsContext";

function MyCards() {
  const { myCards } = useContext(MyCardsContext);

  return (
    <View style={styles.container}>
      {myCards.map(({ id, rank, suit, order, value }) => (
        <Card
          key={id}
          id={id}
          rank={rank}
          suit={suit}
          order={order}
          value={value}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    marginLeft: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00a33a"
  }
});

export default MyCards;
