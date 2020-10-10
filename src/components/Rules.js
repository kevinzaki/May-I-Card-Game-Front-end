import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SafeAreaView,
  ScrollView
} from "react-native";

function Rules() {
  const [modalVisible, setModalVisible] = useState(false);
  //   useEffect(() => {
  //     setModalVisible(true);
  //   }, [setModalVisible]);

  return (
    <View style={styles.centeredView}>
      <Modal
        presentationStyle="formSheet"
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          Alert.alert("Modal has been closed.");
        }}
        onDismiss={() => {
          setModalVisible(!modalVisible);
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scrollView}>
                <Text style={styles.text}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Text>
              </ScrollView>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
      <TouchableHighlight
        style={styles.openButton}
        onPressIn={() => setModalVisible(false)}
        onPressOut={() => setModalVisible(true)}
      >
        <Text style={styles.textColor}>RULES</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    marginHorizontal: 20
  },
  text: {
    fontSize: 16
  },
  rightView: {
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "flex-end",
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
    width: 100,
    alignSelf: "flex-start",
    backgroundColor: "#1f1f1f",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.81
  },
  textColor: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
    fontFamily: "HelveticaNeue-CondensedBold",
    fontSize: 18
  },
  modalText: {
    textAlign: "center"
  }
});

export default Rules;
