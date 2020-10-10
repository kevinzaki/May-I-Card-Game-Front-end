import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import { melds } from "../melds";

function BottomBar(props) {
  const [meldName, setMeldName] = useState(false);

  useEffect(() => {
    setMeldName(melds[props["round"] - 1]);
  });

  return (
    <View style={styles.container}>
      <View style={styles.rules}>
        <Text style={styles.textColor}>
          <Text style={{ color: "#a5f9c6" }}>BUYS:</Text> {props.buys}
        </Text>
      </View>
      <View style={styles.rules}>
        <Text style={styles.textColor}>
          <Text style={{ color: "#a5f9c6" }}>MELD:</Text>{" "}
          {meldName ? meldName["name"].toUpperCase() : "Loading..."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#191919"
  },
  rules: {
    paddingTop: 10,
    paddingBottom: 15
  },
  textColor: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "HelveticaNeue-CondensedBold",
    fontSize: 20
  }
});

export default BottomBar;
