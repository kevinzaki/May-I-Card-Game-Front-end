import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Card from "./Card";
import { MyCardsContext } from "../contexts/MyCardsContext";

function MyCards() {
  const [myCardsWidth, setMyCardsWidth] = useState(0);
  const [cardMargin, setCardMargin] = useState(-25);
  const { myCards } = useContext(MyCardsContext);

  // Whenever myCards changes recalculate the spacing of the cards
  useEffect(() => {
    if (myCardsWidth > 0 && myCards.length > 0) {
      const margin = myCardsWidth / myCards.length - 50;
      setCardMargin(margin < -25 ? margin : -25);
    }

    // myCardsWidth 389 / myCards.length = maxWidth 35
    // 50 * myCards.length = width = 50 * 11 = 550
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
