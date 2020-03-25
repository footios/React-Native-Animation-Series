import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder
} from "react-native";


class UberIntro extends Component {
  constructor(props) {
    super(props);
   
  }

  render() {
    return <View style={{ flex: 1, marginTop: 50 }}>
      <Text>Hello</Text>
    </View>;
  }
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default UberIntro;
