import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Game from "./src/Game";
import RoomProvider, { RoomContext } from "./src/contexts/RoomContext";

function HomeScreen({ navigation }) {
  //const [roomName, setRoomName] = useState("");
  const { setRoom } = useContext(RoomContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Join Room"
        onPress={() => {
          setRoom("room1");
          navigation.navigate("Details");
        }}
      />
    </View>
  );
}
function DetailsScreen(props) {
  return (
    <View style={styles.container}>
      <Game room={props.roomID} />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  //const roomID = "room1";

  return (
    <NavigationContainer>
      <RoomProvider>
        <Stack.Navigator initialRouteName="Home" headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details">
            {props => <DetailsScreen {...props} />}
          </Stack.Screen>
          {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        </Stack.Navigator>
      </RoomProvider>
    </NavigationContainer>
  );
  //   <View style={styles.container}>
  //     {/* <Text>{response.turn}</Text> */}
  //     {/* <Text>Hi</Text> */}
  //     <Game />
  //     {/* <StatusBar style="auto" /> */}
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00a33a"
  }
});

export default App;
