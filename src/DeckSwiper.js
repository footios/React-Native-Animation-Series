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
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    // use it to only apply the panHanler on the first image
    this.state = { currenctIndex: 0 };
  }

  //   console.log('position', position);

  UNSAFE_componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        // update the position when user starts panning
        // to the new position
        // `dy` because we only want to move vertically.
        this.position.setValue({ x: 0, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        //
      }
    });
  }
  renderArticles = () => {
    return ARTICLES.map((item, i) => {
      if (i === this.state.currenctIndex) {
        return (
          <Animated.View
            key={item.id}
            style={this.position.getLayout()}
            {...this.PanResponder.panHandlers}
          >
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
                  source={ARTICLES[i].uri}
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
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum. Lorem
                  Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.
                </Text>
              </View>
            </View>
          </Animated.View>
        );
        // else show a view without the panResponder
      } else {
        return (
          <Animated.View
            key={item.id}
            // style={this.position.getLayout()}
            // {...this.PanResponder.panHandlers}
          >
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
                  source={ARTICLES[i].uri}
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
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum. Lorem
                  Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.
                </Text>
              </View>
            </View>
          </Animated.View>
        );
      }
    }).reverse();
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
