import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RoomContext } from "../contexts/RoomContext";

/**
 * ScoresTable
 * Gets game scores from RoomContext and generates a table of scores.
 */
function ScoresTable() {
  const { user, scores } = useContext(RoomContext);

  return (
    <View style={tableStyle.table}>
      <View style={tableStyle.titleHeaderRow}>
        <View style={{ flex: 1 }}>
          <Text style={tableStyle.title}>SCORECARD</Text>
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
              <Text
                style={[
                  user === item.id && tableStyle.txtBold,
                  tableStyle.tableFont
                ]}
              >
                {idx + 1}
              </Text>
            </View>
            <View style={{ flex: 6 }}>
              <Text
                style={[
                  user === item.id && tableStyle.txtBold,
                  tableStyle.tableFont
                ]}
              >
                {item.name}
              </Text>
            </View>
            <View style={{ flex: 3 }}>
              <Text
                style={[
                  tableStyle.dataText,
                  tableStyle.tableFont,
                  user === item.id && tableStyle.txtBold
                ]}
              >
                {item.points}
              </Text>
            </View>
          </View>
        ))}
    </View>
  );
}

/** Styling for ScoresTable Component */
const tableStyle = StyleSheet.create({
  table: {
    width: 275,
    borderRadius: 10,
    paddingBottom: 10,
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.5,
    shadowRadius: 5.41
  },
  tableFont: {
    fontFamily: "HelveticaNeue"
  },
  row: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#e8e8e8",
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  txtBold: {
    fontWeight: "bold"
  },
  headerRow: {
    backgroundColor: "#e8e8e8",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  titleHeaderRow: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#00a33a",
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#00a33a",
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  header: {
    color: "#1f1f1f",
    fontSize: 16,
    fontFamily: "HelveticaNeue-CondensedBold",
    shadowColor: "#fff",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.5
  },
  title: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
    fontFamily: "HelveticaNeue-CondensedBold",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41
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
