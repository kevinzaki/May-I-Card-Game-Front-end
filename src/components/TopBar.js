import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import ScoresModal from "./ScoresModal";
import Rules from "./Rules";
import { RoomContext } from "../contexts/RoomContext";

/**
 * TopBar
 * Manages top bar layout and keeps track of the game clock.  The game clock is the amount
 * of time the user has to make an action during their turn or when buying.
 */
function TopBar() {
  const { timer, setTimer } = useContext(RoomContext);

  /** Manages game clock timer */
  useEffect(() => {
    let timeCount;
    /** If timer is greater than 0 tick 1 second and repeat */
    /** If timer is equal to 0 Set activity indicator until timer is set by server */
    if (timer > 0) timeCount = setTimeout(() => setTimer(timer - 1), 1000);
    else if (timer === 0) {
      setTimer(<ActivityIndicator size="small" color="#1f1f1f" />);
    }
    /** clear timer */
    return () => {
      clearTimeout(timeCount);
    };
  }, [timer]);

  return (
    <View style={styles.container}>
      <Rules></Rules>
      <View style={styles.rules}>
        <Text style={styles.textColor}>{timer}</Text>
      </View>
      <ScoresModal></ScoresModal>
    </View>
  );
}

/** Stying for TopBar Component */
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 20
  },
  textColor: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "HelveticaNeue-CondensedBold",
    fontSize: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.81
  }
});

export default TopBar;
