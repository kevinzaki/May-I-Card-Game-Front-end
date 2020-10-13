import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { DimensionsContext } from "../contexts/DimensionsContext";
import MeldCard from "./MeldCard";

/**
 *
 * Meld
 * Component manages each individual meld that is displayed in melds area.
 * Makes a meld card for each card in a given meld.
 * Uses onLayout to set each Melds dimensions to be used in Dimensions Context for
 * dropping/swapping a card onto a meld.
 */
function Meld(props) {
  const { setMeldDimensions } = useContext(DimensionsContext);

  return (
    <View
      onLayout={e => setMeldDimensions(props.id, e.nativeEvent.layout)}
      style={styles.container}
    >
      {props.cards.map(({ id, rank, suit, value, order }) => (
        <MeldCard
          key={id}
          rank={rank}
          suit={suit}
          value={value}
          order={order}
        />
      ))}
    </View>
  );
}

/** Meld Component Styling */
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexGrow: 1,
    flexDirection: "row",
    marginLeft: 15
  }
});

export default Meld;
