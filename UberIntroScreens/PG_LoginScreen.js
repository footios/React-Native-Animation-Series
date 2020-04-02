import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Animated,
  Dimensions,
  Keyboard,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as Animatable from "react-native-animatable";

const SCREEN_HEIGHT = Dimensions.get("window").height;
class PG_LoginScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      placeholderText: "Enter mobile number..."
    };
  }
  UNSAFE_componentWillMount() {
    this.loginHeight = new Animated.Value(150);
    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardWillShow // no need to dublicate it.
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardWillHide
    );

    this.keyboardHeight = new Animated.Value(0);
    this.forwardArrowOpacity = new Animated.Value(0);
    this.borderBottomWidth = new Animated.Value(0);
  }

  componentWillUnmount = () => {
    Keyboard.removeListener("keyboardWillShow");
    Keyboard.removeListener("keyboardWillHide");
    Keyboard.removeListener("keyboardDidShow");
    Keyboard.removeListener("keyboardDidHide");
  };

  keyboardWillShow = event => {
    // console.log('event', event);
    // const { duration } = event;
    // This works better for android
    let duration = event.duration;
    if (Platform.OS === "android") {
      duration = 100;
    } 
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        toValue: event.endCoordinates.height + 10,
        duration: duration + 100
      }),
      Animated.timing(this.forwardArrowOpacity, {
        toValue: 1,
        duration: duration + 200
      }),
      Animated.timing(this.borderBottomWidth, {
        toValue: 1,
        duration: duration
      })
    ]).start();
  };

  keyboardWillHide = event => {
    let duration = event.duration;
    if (Platform.OS === "android") {
      duration = 100;
    } 
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        toValue: 0,
        duration: duration + 100
      }),
      Animated.timing(this.forwardArrowOpacity, {
        toValue: 0,
        duration: duration
      }),
      Animated.timing(this.borderBottomWidth, {
        toValue: 0,
        duration: duration
      })
    ]).start();
  };

  increaseHeightOfLogin = () => {
    this.setState({ placeholderText: "0988833888" });
    Animated.timing(this.loginHeight, {
      toValue: SCREEN_HEIGHT,
      duration: 700
    }).start(() => {
      this.refs.textInputMobile.focus();
    });
  };

  decreaseHeightOfLogin = () => {
    this.setState({ placeholderText: "Enter mobile number..." });
    Keyboard.dismiss();
    Animated.timing(this.loginHeight, {
      toValue: 150,
      duration: 700
    }).start();
  };

  render() {
    const headerTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [1, 0]
    });

    const marginTop = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [25, 100]
    });

    const headerBackArrowOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1]
    });
    const titleTextLeft = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [100, 25]
    });
    const titleTextBottom = this.loginHeight.interpolate({
      inputRange: [150, 400, SCREEN_HEIGHT],
      outputRange: [0, 0, 100]
    });
    const titleTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1]
    });

    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            position: "absolute",
            height: 60,
            width: 60,
            top: 60,
            left: 25,
            zIndex: 100,
            opacity: 1
          }}
        >
          <TouchableOpacity onPress={() => this.decreaseHeightOfLogin()}>
            <Ionicons
              name="md-arrow-back"
              style={{ color: "black" }}
              size={30}
            />
          </TouchableOpacity>
        </Animated.View>
        {/* Forward arrow */}
        <Animated.View
          style={{
            position: "absolute",
            height: 30,
            width: 30,
            right: 10,
            bottom: this.keyboardHeight, // animated
            opacity: this.forwardArrowOpacity, // animated
            zIndex: 100,
            backgroundColor: "#860F01",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15
          }}
        >
          <Ionicons
            name="md-arrow-forward"
            style={{ color: "white" }}
            size={20}
          />
        </Animated.View>

        <ImageBackground
          source={require("../assets/Jesus.jpeg")}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <Animatable.View
              animation="zoomIn"
              iterationCount={1}
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FBE6B4",
                height: 50,
                width: 100,
                borderRadius: 25,
                shadowColor: "#FBE8B8",
                shadowOffset: { x: 8, y: 8 },
                shadowRadius: 33,
                shadowOpacity: 1,
                opacity: 0.7,
                marginBottom: 120
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 26 }}>IC XC</Text>
            </Animatable.View>
          </View>

          {/* Bottom half */}
          <Animatable.View animation="slideInUp" iterationCount={1}>
            <Animated.View
              style={{ height: this.loginHeight, backgroundColor: "#FBE8B8" }}
            >
              {/* <Animated.View
                style={{
                  opacity: headerTextOpacity,
                  alignItems: "flex-start",
                  paddingHorizontal: 25,
                  marginTop: marginTop
                }}
              > */}
              <Animated.Text
                style={{
                  fontSize: 24,
                  opacity: headerTextOpacity,
                  alignItems: "flex-start",
                  paddingHorizontal: 25,
                  marginTop: marginTop
                }}
              >
                Get to know our Lord Jesus Christ!
              </Animated.Text>
              {/* </Animated.View> */}
              <TouchableOpacity onPress={() => this.increaseHeightOfLogin()}>
                <Animated.View
                  style={{
                    marginTop: marginTop, // animated,
                    paddingHorizontal: 25,
                    flexDirection: "row"
                  }}
                >
                  <Animated.Text
                    style={{
                      fontSize: 24,
                      color: "gray",
                      position: "absolute",
                      bottom: titleTextBottom,
                      left: titleTextLeft,
                      opacity: titleTextOpacity
                    }}
                  >
                    Enter mobile number...
                  </Animated.Text>
                  <Image
                    source={require("../assets/nika.png")}
                    style={{ height: 27, width: 35, resizeMode: "cover" }}
                  />
                  <Animated.View
                    pointerEvents="none"
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      borderBottomWidth: this.borderBottomWidth
                    }}
                  >
                    <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>
                      +30
                    </Text>
                    <TextInput
                      keyboardType="numeric"
                      ref="textInputMobile"
                      style={{ flex: 1, fontSize: 20 }}
                      placeholder={this.state.placeholderText}
                      underlineColorAndroid="transparent"
                    />
                  </Animated.View>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>

            <View
              style={{
                height: 70,
                backgroundColor: "#FBE8B8",
                borderTopColor: "#860F01",
                borderTopWidth: 1
              }}
            >
              <Text
                style={{
                  alignSelf: "flex-start",
                  padding: 20,
                  color: "#384064",
                  fontWeight: "bold"
                }}
              >
                Login with social account
              </Text>
            </View>
          </Animatable.View>
        </ImageBackground>
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

export default PG_LoginScreen;
