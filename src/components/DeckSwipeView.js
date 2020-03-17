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

import { ARTICLES } from "./ARTICLES";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class DeckSwipeView extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          position: "absolute", // to get the text only one time
          height: SCREEN_HEIGHT,
          width: SCREEN_WIDTH,
          backgroundColor: "white"
        }}
      >
        <View style={{ flex: 2, backgroundColor: "black" }}>
          <Image
            source={ARTICLES[this.props.i].uri}
            style={{
              flex: 1,
              height: null,
              width: null,
              resizeMode: "center"
            }}
          />
        </View>
        <View style={{ flex: 3, padding: 5 }}>
          {/* The PanResponder, does not work if there is empty space in the screen */}
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
          </Text>
        </View>
      </View>
    );
  }
}

export default DeckSwipeView;
