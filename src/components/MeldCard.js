import React from "react";
import { View, StyleSheet, Text } from "react-native";
import cardSymbols from "../../util/cardSymbols";

function MeldCard(props) {
  const { suit } = props;
  const cardStyle =
    suit === "Hearts" || suit === "Diamonds"
      ? styles.redCard
      : styles.blackCard;
  const symbol = String.fromCharCode(cardSymbols[suit]);

  return (
    <View style={styles.container}>
      <Text
        style={[
          cardStyle,
          { fontWeight: "bold", fontFamily: "HelveticaNeue-CondensedBold" }
        ]}
      >
        {props.rank}
      </Text>
      <Text style={cardStyle}>{symbol}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dull: {
    backgroundColor: "rgba(165,165,165,1)"
  },
  container: {
    flex: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    height: 50,
    minWidth: 35,
    maxWidth: 35,
    marginLeft: -15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#999",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  blackCard: {
    marginLeft: -15,
    color: "black",
    fontSize: 14
  },
  redCard: {
    marginLeft: -15,
    color: "red",
    fontSize: 14
  }
});

export default MeldCard;
