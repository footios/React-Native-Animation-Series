import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import TwitterScrollable from "./src/TwitterScrollable";
import DeckSwiper from "./src/DeckSwiper";

class App extends Component {
  render() {
    return (
      <View style={(style = styles.container)}>
		  <DeckSwiper />
        {/* <TwitterScrollable /> */}
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
