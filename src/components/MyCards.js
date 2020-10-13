import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Card from "./Card";
import { MyCardsContext } from "../contexts/MyCardsContext";

/**
 * MyCards
 * Container for all of a players cards.  Renders each card object associated with
 * the player.
 */
function MyCards() {
  /** The width of each card */
  const [myCardsWidth, setMyCardsWidth] = useState(0);
  /** The margin of each card (negative value) based off width */
  const [cardMargin, setCardMargin] = useState(-25);
  const { myCards } = useContext(MyCardsContext);

  /** Calculates the appropriate margin for a card to make sure each is visible  */
  useEffect(() => {
    if (myCardsWidth > 0 && myCards.length > 0) {
      const margin = myCardsWidth / myCards.length - 50;
      setCardMargin(margin < -25 ? margin : -25);
    }
  }, [myCards, myCardsWidth]);

  return (
    <View
      onLayout={e => setMyCardsWidth(e.nativeEvent.layout.width)}
      style={styles.container}
    >
      {myCards
        .sort((a, b) => a.order - b.order)
        .map(({ id, rank, suit, order, value }) => (
          <Card
            key={id}
            id={id}
            rank={rank}
            suit={suit}
            order={order}
            value={value}
            margin={cardMargin}
          />
        ))}
    </View>
  );
}

/** Styling for MyCards Component */
const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    marginLeft: 25,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default MyCards;
