import "react-native-gesture-handler";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import TwitterScrollable from "./src/TwitterScrollable";
import PG_TwitterScrollable from "./src/PG_TwitterScrollable";
import DeckSwiper from "./src/DeckSwiper";
import PG_DeckSwiper from "./src/PG_DeckSwiper";
import LoginScreen from "./UberIntroScreens/LoginScreen";
import PG_LoginScreen from "./UberIntroScreens/PG_LoginScreen";
import AppleMusicUI from "./src/AppleMusicUI";

const Stack = createStackNavigator();

export default function App() {
 /* 
  If <AppleMusicUI /> is in a View, then: 
  1. The backgroundColor does not animate to black.
  2. If I try to swipe down and then swipe it back up, 
  then I can get it down but to full screen, 
  but then I cannot swipe it down to the minimal version.
  */
  return <AppleMusicUI />;

  return (
    // <View style={(style = styles.container)}>
    <View >
      {/* <TwitterScrollable /> */}
      {/* <PG_TwitterScrollable /> */}
      {/* <DeckSwiper /> */}
      {/* <PG_DeckSwiper /> */}
      {/* For UberIntro */}

      {/* <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="PG_LoginScreen" component={PG_LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
