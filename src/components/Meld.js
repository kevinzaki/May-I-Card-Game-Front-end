import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { DimensionsContext } from "../contexts/DimensionsContext";
import MeldCard from "./MeldCard";

function Meld(props) {
  const { setMeldDimensions } = useContext(DimensionsContext);

  return (
    <View
      onLayout={e => setMeldDimensions(props.id, e.nativeEvent.layout)}
      style={styles.container}
    >
      {props.cards.map(({ id, rank, suit, value, order }) => (
        <MeldCard key={id} rank={rank} suit={suit} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexGrow: 1,
    flexDirection: "row",
    marginLeft: 15
  }
});

export default Meld;
