import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import socket from "../../util/socketConnection";

function SimpleTable({ title, data }) {
  return (
    <View style={tableStyle.table}>
      <Text style={tableStyle.title}>{title}</Text>
      <View style={tableStyle.line} />
      <View style={tableStyle.row}>
        <View style={{ flex: 3 }}>
          <Text style={tableStyle.header}>PLACE</Text>
        </View>
        <View style={{ flex: 6 }}>
          <Text style={tableStyle.header}>PLAYER</Text>
        </View>
        <View style={{ flex: 3 }}>
          <Text style={tableStyle.header}>SCORE</Text>
        </View>
      </View>
      {data
        .sort((a, b) => a.points - b.points)
        .map((item, idx) => (
          <View key={item.id} style={tableStyle.row}>
            <View style={{ flex: 3 }}>
              <Text>{idx + 1}</Text>
            </View>
            <View style={{ flex: 6 }}>
              <Text>{item.name}</Text>
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
    width: 300,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
    paddingVertical: 10
  },
  header: {
    fontWeight: "bold"
  },
  dataText: {
    textAlign: "left"
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
  }
});

function Scores() {
  const [modalVisible, setModalVisible] = useState(false);
  const [scores, setScores] = useState([
    { id: "2323", name: "Kevin Zaki", points: 30 },
    { id: "2324", name: "Danny", points: 404 }
  ]);

  useEffect(() => {
    socket.on("scores", data => {
      setScores(data);
    });
  }, []);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <SimpleTable title="SCOREBOARD" data={scores} />

            <TouchableHighlight
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: "#00a33a",
                fontWeight: "bold"
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#fff"
                }}
              >
                CLOSE
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textColor}>SCORES</Text>
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    alignSelf: "flex-end",
    padding: 10
  },
  textColor: {
    color: "white",
    fontWeight: "bold"
  },
  modalText: {
    textAlign: "center"
  }
});

export default Scores;
