import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import TwitterScrollable from "./src/TwitterScrollable";
import PG_TwitterScrollable from "./src/PG_TwitterScrollable";
import DeckSwiper from "./src/DeckSwiper";
import PG_DeckSwiper from "./src/PG_DeckSwiper";

class App extends Component {
  render() {
    return (
      <View style={(style = styles.container)}>
        {/* <TwitterScrollable /> */}
        {/* <PG_TwitterScrollable /> */}
        {/* <DeckSwiper /> */}
        <PG_DeckSwiper />
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
