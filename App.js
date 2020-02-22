import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import TwitterScrollable from "./src/TwitterScrollable";

class App extends Component {
  render() {
    return (
      <View style={(style = styles.container)}>
        <TwitterScrollable />
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
