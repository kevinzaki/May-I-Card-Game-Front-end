import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RoomProvider, { RoomContext } from "./src/contexts/RoomContext";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Game from "./src/Game";

/**
 * HomeScreen
 * Component handles all functionality and UI related to joining and creating a game.
 */
function HomeScreen({ navigation }) {
  const { setRoom, setUserName, setNumberOfPlayers } = useContext(RoomContext);
  const [numOfPlayers, setNumOfPlayers] = useState(3);
  const [roomText, setRoomText] = useState("");
  const [userText, setUserText] = useState("");
  const [createRoom, setCreateRoom] = useState(false);

  /** resets all room data upon mounting */
  useEffect(() => {
    setRoom("");
    setUserName("");
    setNumOfPlayers(3);
  }, []);

  /**
   * handleGameRoom
   * Sets context variables from user input and navigate user to game screen
   * upon attempting to join or create a room.
   */
  function handleGameRoom() {
    setRoom(roomText);
    setNumberOfPlayers(numOfPlayers);
    setUserName(userText);
    navigation.navigate("GameCon", { createRoom });
  }

  return (
    <View style={homeScreen.container}>
      <LinearGradient
        colors={["#00a33a", "#00812d"]}
        style={homeScreen.background}
      />
      <View style={homeScreen.logoContainer}>
        <Text style={homeScreen.logo}>MAY I?</Text>
      </View>

      <View style={homeScreen.roomActionTabContainer}>
        <View>
          <Button
            style={{ borderBottomWidth: 3 }}
            labelStyle={homeScreen.tabLabel}
            disabled={!createRoom}
            color="#fff"
            mode="text"
            onPress={() => setCreateRoom(false)}
          >
            Join Room
          </Button>
          <View
            style={[
              homeScreen.tabUnderline,
              !createRoom && homeScreen.tabUnderlineColor
            ]}
          ></View>
        </View>
        <View>
          <Button
            style={{ borderBottomWidth: 3 }}
            labelStyle={homeScreen.tabLabel}
            disabled={createRoom}
            color="#fff"
            mode="text"
            onPress={() => setCreateRoom(true)}
          >
            Create Room
          </Button>

          <View
            style={[
              homeScreen.tabUnderline,
              createRoom && homeScreen.tabUnderlineColor
            ]}
          ></View>
        </View>
      </View>
      <View
        style={{
          flex: 5,
          flexDirection: "column"
        }}
      >
        <View style={homeScreen.input}>
          <TextInput
            selectionColor="#00a33a"
            mode="flat"
            label="User Name"
            value={userText}
            onChangeText={text => setUserText(text)}
          />
        </View>
        <View style={homeScreen.input}>
          <TextInput
            selectionColor="#00a33a"
            mode="flat"
            label="Room Name"
            value={roomText}
            onChangeText={text => setRoomText(text)}
          />
        </View>
        {createRoom && (
          <View style={homeScreen.toggle}>
            <TouchableOpacity
              style={[
                homeScreen.numOfPlayersButton,
                numOfPlayers === 3 && homeScreen.numOfPlayersButtonActive,
                numOfPlayers === 3 && homeScreen.numOfPlayersButtonActiveLeft
              ]}
              onPress={() => setNumOfPlayers(3)}
            >
              <Text style={homeScreen.toggleButtonTxt}>3 PLAYERS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                homeScreen.numOfPlayersButton,
                numOfPlayers === 5 && homeScreen.numOfPlayersButtonActive,
                numOfPlayers === 5 && homeScreen.numOfPlayersButtonActiveRight
              ]}
              onPress={() => setNumOfPlayers(5)}
            >
              <Text style={homeScreen.toggleButtonTxt}>5 PLAYERS</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={homeScreen.input}>
          <Button
            labelStyle={homeScreen.roomButtonLabel}
            style={homeScreen.roomButton}
            mode="contained"
            color="#212121"
            onPress={handleGameRoom}
          >
            {createRoom ? "Create Room" : "Join Room"}
          </Button>
        </View>
      </View>
    </View>
  );
}

/** All styling for HomeScreen Component */
const homeScreen = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: "#00a33a"
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 500
  },
  logoContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  logo: {
    marginVertical: 30,
    textAlign: "center",
    color: "#fff",
    fontWeight: "900",
    fontSize: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    fontWeight: "900",
    fontFamily: "HelveticaNeue-CondensedBold",
    elevation: 2
  },
  roomActionTabContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 30
  },
  tabLabel: {
    fontWeight: "900",
    fontFamily: "HelveticaNeue-CondensedBold",
    fontSize: 18
  },
  tabUnderline: {
    alignSelf: "center",
    width: 100,
    padding: 2
  },
  tabUnderlineColor: { backgroundColor: "#006f26" },
  input: {
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.81
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.81
  },
  toggleButtonTxt: {
    fontWeight: "900",
    fontFamily: "HelveticaNeue-CondensedBold",
    fontSize: 15,
    color: "#3d3d3d"
  },
  numOfPlayersButton: {
    flex: 1,
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 15,
    alignSelf: "stretch"
  },
  numOfPlayersButtonActive: {
    elevation: 5,
    backgroundColor: "#efefef",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 2.81
  },
  numOfPlayersButtonActiveLeft: {
    shadowOffset: {
      width: 2,
      height: 0
    }
  },
  numOfPlayersButtonActiveRight: {
    shadowOffset: {
      width: -2,
      height: 0
    }
  },
  roomButton: {
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.81
  },
  roomButtonLabel: {
    fontWeight: "900",
    fontFamily: "HelveticaNeue-CondensedBold",
    fontSize: 18
  }
});

/**
 * GameContainer
 * Game container which renders entire game functionality via Game Component.
 */
function GameContainer({ route, navigation }) {
  return (
    <View style={gameStyles.container}>
      <LinearGradient
        colors={["#00a33a", "#00862f"]}
        style={gameStyles.gradient}
      />
      <Game createRoom={route.params.createRoom} navigation={navigation} />
    </View>
  );
}

/** Styling for GameContainer Component */
const gameStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00a33a"
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1300
  }
});

/** navigation stack */
const Stack = createStackNavigator();

/**
 * App
 * Root component that mainly handles navigation stack.  Wraps the rest of the components
 * with PaperProvider which manages some of the theme and RoomProvider which manages essentail
 * game data used across all components.
 */
function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <RoomProvider>
          <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="GameCon">
              {props => <GameContainer {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </RoomProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

/** default theme styling */
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#212121",
    accent: "#00a33a",
    background: "#fff"
  }
};

export default App;
