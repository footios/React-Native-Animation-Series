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
import UberIntro from "./src/UberIntro";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={(style = styles.container)}>
      {/* <TwitterScrollable /> */}
      {/* <PG_TwitterScrollable /> */}
      {/* <DeckSwiper /> */}
      {/* <PG_DeckSwiper /> */}
      {/* For UberIntro */}
      <NavigationContainer
       
      >
        <Stack.Navigator
         screenOptions={{
          headerShown: false
        }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
