import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const ARTICLES = [
  { id: "1", uri: require("../assets/icons/1.jpeg") },
  { id: "2", uri: require("../assets/icons/2.jpeg") },
  { id: "3", uri: require("../assets/icons/3.jpeg") },
  { id: "4", uri: require("../assets/icons/4.jpeg") },
  { id: "5", uri: require("../assets/icons/5.jpeg") }
];

class DeckSwiper extends Component {
  renderArticles = () => {
    return ARTICLES.map((item, i) => {
      return (
        <View
          key={item.id}
          style={{
            flex: 1,
            position: "absolute", // to get the text only one time
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
            backgroundColor: "white"
          }}
        >
          <View style={{ flex: 2, backgroundColor: 'black' }}>
          <Image source={ARTICLES[i].uri} style={{flex: 1, height: null, width: null, resizeMode: 'center'}} />
          </View>
          <View style={{ flex: 3, padding: 5 }}>
              {/* The PanResponder, does not work if there is empty space in the screen */}
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.

              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </View>
        </View>
      );
    });
  };
  render() {
    return <View style={{ flex: 1 }}>{this.renderArticles()}</View>;
  }
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default DeckSwiper;
