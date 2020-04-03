import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  ScrollView,
  Image,
  Slider
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_HEIGTH = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class AppleMusicUI extends Component {
  UNSAFE_componentWillMount() {
    this.animation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGTH - 100 });

    this.PanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.animation.extractOffset();
      },
      onPanResponderMove: (evt, gestureState) => {
        this.animation.setValue({ x: 0, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          Animated.spring(this.animation.y, {
            toValue: -SCREEN_HEIGTH + 100,
            tension: 1
          }).start();
        } else if (gestureState.dy > 0) {
          Animated.spring(this.animation.y, {
            toValue: SCREEN_HEIGTH - 100,
            tension: 1
          }).start();
        }
      }
    });
  }

  render() {
    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    };

    const animatedImageHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGTH - 100],
      outputRange: [150, 40],
      extrapolate: "clamp"
    });
    const animatedSongTitleOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGTH - 500, SCREEN_HEIGTH - 100],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });
    const animatedImageMarginLeft = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGTH - 100],
      outputRange: [SCREEN_WIDTH / 2 - 77, 10],
      extrapolate: "clamp"
    });
    const animatedHeaderHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGTH - 100],
      outputRange: [SCREEN_HEIGTH / 2, 100],
      extrapolate: "clamp"
    });

    return (
      <Animated.View style={{ flex: 1, backgroundColor: "white" }}>
        <Animated.View
          style={[
            animatedHeight,
            {
              position: "absolute",
              left: 0,
              right: 0,
              zIndex: 10,
              backgroundColor: "orange"
              //   height: SCREEN_HEIGTH // this is probably not needed
            }
          ]}
        >
          <Animated.View
            {...this.PanResponder.panHandlers}
            style={{
              height: animatedHeaderHeight,
              borderTopWidth: 1,
              borderTopColor: "#ebe5e5",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <View
              style={{ flex: 4, flexDirection: "row", alignItems: "center" }}
            >
              <Animated.View
                style={{
                  height: animatedImageHeight,
                  width: animatedImageHeight,
                  marginLeft: animatedImageMarginLeft
                }}
              >
                <Image
                  style={{ flex: 1, width: null, height: null }}
                  source={require("../assets/MattheosTsamkiranis.jpg")}
                />
              </Animated.View>
              <Animated.Text
                style={{
                  opacity: animatedSongTitleOpacity,
                  fontSize: 18,
                  paddingLeft: 10
                }}
              >
                Εωθινόν Ζ΄ήχος βαρύς
              </Animated.Text>
            </View>
            <Animated.View
              style={{
                opacity: animatedSongTitleOpacity,
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Ionicons name="ios-pause" size={32} />
              <Ionicons name="ios-play" size={32} />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
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

export default AppleMusicUI;
