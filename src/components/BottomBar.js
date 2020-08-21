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
        <Text style={styles.textColor}>Buys: {props.buys}</Text>
      </View>
      <View style={styles.rules}>
        <Text style={styles.textColor}>
          {" "}
          Meld: {meldName ? meldName["name"] : "Loading..."}
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
    backgroundColor: "#212121"
  },
  rules: {
    padding: 20
  },
  textColor: {
    color: "white",
    fontWeight: "bold"
  }
});

export default BottomBar;
