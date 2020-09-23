import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import socket from "../../util/socketConnection";
import { RoomContext } from "../contexts/RoomContext";

function ScoresTable() {
  const { scores } = useContext(RoomContext);

  return (
    <View style={tableStyle.table}>
      {/* <Text style={tableStyle.title}>SCOREBOARD</Text>
      <View style={tableStyle.line} /> */}
      <View style={tableStyle.titleHeaderRow}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              letterSpacing: 3,
              color: "#fff",
              fontSize: 18,
              textAlign: "center"
            }}
          >
            SCORECARD
          </Text>
        </View>
      </View>
      <View style={tableStyle.headerRow}>
        <View style={{ flex: 3 }}>
          <Text style={tableStyle.header}>PLACE</Text>
        </View>
        <View style={{ flex: 6 }}>
          <Text style={tableStyle.header}>PLAYER</Text>
        </View>
        <View style={{ flex: 3 }}>
          <Text style={[tableStyle.header, tableStyle.dataText]}>SCORE</Text>
        </View>
      </View>
      {scores
        .sort((a, b) => a.points - b.points)
        .map((item, idx) => (
          <View key={item.id} style={tableStyle.row}>
            <View style={{ flex: 3 }}>
              <Text>{idx + 1}</Text>
            </View>
            <View style={{ flex: 6 }}>
              <Text style={{ textTransform: "uppercase" }}>{item.name}</Text>
            </View>
            <View style={{ flex: 3 }}>
              <Text style={tableStyle.dataText}>{item.points}</Text>
            </View>
          </View>
        ))}
    </View>
  );
}
const tableStyle = StyleSheet.create({
  table: {
    width: 275,
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  row: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#e8e8e8",
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  headerRow: {
    backgroundColor: "#e8e8e8",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  titleHeaderRow: {
    backgroundColor: "#00a33a",
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#00a33a",
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  header: {
    fontWeight: "bold",
    fontSize: 12
  },
  dataText: {
    textAlign: "center"
  },
  title: {
    fontWeight: "bold",
    letterSpacing: 2,
    fontSize: 18
  },
  line: {
    marginTop: 10,
    marginBottom: 20,
    width: 30,
    borderBottomWidth: 4,
    borderBottomColor: "#00a33a"
  },
  dataText: {
    textAlign: "right"
  }
});

export default ScoresTable;
