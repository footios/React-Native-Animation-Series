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
// import Slider from "@react-native-community/slider";

import { Ionicons } from "@expo/vector-icons";

const SCREEN_HEIGTH = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class AppleMusicUI extends Component {
  state = {
    isScrollEnabled: false
  };

  UNSAFE_componentWillMount() {
    this.scrollOffset = 0;

    this.animation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGTH - 100 });

    this.PanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Check when to enable the panResponder
        if (
          (this.state.isScrollEnabled &&
          this.scrollOffset <= 0 && // so it's open
            gestureState.dy > 0) || // the user tries to swipe down
          (!this.state.isScrollEnabled && gestureState.dy < 0) // the user is down and tries to swipe up
        ) {
          return true;
        }
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.animation.extractOffset();
      },
      onPanResponderMove: (evt, gestureState) => {
        this.animation.setValue({ x: 0, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.moveY > SCREEN_HEIGTH - 90) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start();
        } else if (gestureState.moveY < 90) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start();
        } else if (gestureState.dy < 0) {
          this.setState({ isScrollEnabled: true });
          Animated.spring(this.animation.y, {
            toValue: -SCREEN_HEIGTH + 100,
            tension: 1
          }).start();
        } else if (gestureState.dy > 0) {
          this.setState({ isScrollEnabled: false });
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
      // transform: this.animation.getTranslateTransform()
      // this is also working
      transform: [{ translateY: this.animation.y }]
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
    const animatedSongDetailsOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGTH - 500, SCREEN_HEIGTH - 100],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    });
    const animatedBackgroundColor = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGTH - 100],
      outputRange: ["rgba(0,0,0,0.5)", "white"],
      extrapolate: "clamp"
    });

    return (
      <Animated.View
        style={{ flex: 1, backgroundColor: animatedBackgroundColor }}
      >
        <Animated.View
          {...this.PanResponder.panHandlers} // here we can access to the whole View
          style={[
            animatedHeight,
            {
              position: "absolute",
              left: 0,
              right: 0,
              zIndex: 10,
              backgroundColor: "white",
              // Since we use the 'animatedHeight'
              // this is probably not needed
              // height: SCREEN_HEIGTH 
            }
          ]}
        >
          <ScrollView
          // we need to set this other wise the ScrollView is not working
            style={{
              height: 1000
            }}
            scrollEnabled={this.state.isScrollEnabled}
            scrollEventThrottle={16}
            onScroll={event => {
              this.scrollOffset = event.nativeEvent.contentOffset.y;
            }}
          >
            <Animated.View
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
            <Animated.View
              style={{
                height: animatedHeaderHeight,
                opacity: animatedSongDetailsOpacity
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                  Εωθινόν Ζ΄ήχος βαρύς
                </Text>
                <Text style={{ fontSize: 18, color: "gray" }}>
                  Ματθαίος Τσαμκιράνης
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  width: SCREEN_WIDTH,
                  alignItems: "center"
                }}
              >
                <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={0}
                  maximumValue={1}
                  value={18}
                  // minimumTrackTintColor="#FFFFFF"
                  // maximumTrackTintColor="#000000"
                />
              </View>
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around"
                }}
              >
                <Ionicons name="ios-rewind" size={40} />
                <Ionicons name="ios-play" size={50} />
                <Ionicons name="ios-fastforward" size={40} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  paddingBottom: 20
                }}
              >
                <Ionicons name="ios-add" size={30} color="gray" />
                <Ionicons name="md-more" size={30} color="gray" />
              </View>
            </Animated.View>
            {/* Just put some space in the ScrollView */}
            <View style={{ height: 3000 }} />
          </ScrollView>
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
