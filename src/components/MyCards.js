import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Card from "./Card";
import { MyCardsContext } from "../contexts/MyCardsContext";

function MyCards(props) {
  //const [myPlayerCards, setMyPlayerCards] = useState([]);
  const { myCards, addToState } = useContext(MyCardsContext);
  return (
    // <View style={styles.container}>
    //   {myCards.map(card => {
    //     return <Text>{card.card}</Text>;
    //   })}
    //   <Button
    //     onPress={() => addToState({ card: "test" })}
    //     title="Learn More"
    //     color="#841584"
    //     accessibilityLabel="Learn more about this purple button"
    //   />
    // </View>
    <View style={styles.container}>
      {myCards.map(({ id, rank, suit, value, order }) => (
        <Card key={id} id={id} rank={rank} suit={suit} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    marginLeft: 25,
    flexDirection: "row",
    //justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    //alignItems: "stretch",
    backgroundColor: "#00a33a"
  }
});

export default MyCards;
