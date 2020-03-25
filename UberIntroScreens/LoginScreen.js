import React, { Component } from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

class LoginScreen extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/Jesus.jpeg")}
          style={{ flex: 1 }}
        ></ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default LoginScreen;
