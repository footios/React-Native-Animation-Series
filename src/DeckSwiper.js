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
import DeckSwipeAnimatedView from "./components/DeckSwipeAnimatedView";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

import { ARTICLES } from "./components/ARTICLES";

class DeckSwiper extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    // y: -SCREEN_HEIGHT = So the card behind the first one,
    // will be above it.
    this.swipedCardPosition = new Animated.ValueXY({ x: 0, y: -SCREEN_HEIGHT });
    // use it to only apply the panHanler on the first image
    this.state = { currenctIndex: 0 };
  }

  //   console.log('position', position);

  UNSAFE_componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        // If User swipes down after he already has a card swiped out:
        // Check if there is a card that allready has been swiped out.
        // Then show it as much as the user swipes down.
        if (gestureState.dy > 0 && this.state.currenctIndex > 0) {
          this.swipedCardPosition.setValue({
            x: 0,
            y: -SCREEN_HEIGHT + gestureState.dy
          });
          // If the user swipes up
        } else {
          // update the position when user starts panning
          // to the new position
          // `dy` because we only want to move vertically.
          this.position.setValue({ x: 0, y: gestureState.dy });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Check if there is a previous card,
        // and user swiped down, more then 50.
        if (
          this.state.currenctIndex > 0 &&
          gestureState.dy > 50 &&
          gestureState.vy > 0.7
        ) {
          Animated.timing(this.swipedCardPosition, {
            toValue: { x: 0, y: 0 },
            duration: 1000
          }).start(() => {
            // Add the panresponder to the previous card again
            // Set the position back to where it was
            this.setState({ currenctIndex: this.state.currenctIndex - 1 });
            this.swipedCardPosition.setValue({ x: 0, y: -SCREEN_HEIGHT });
          });
        }
        // If user does not swip up fast or long enough to change card,
        // then card should swipe back
        // Other wise swipe the card out of the screen.
        // 50 is a threshold figure
        // gestureState.vy > 0.7 = velosity is grater than 0.7 seconds
        // Note: gestureState.dy and gestureState.vy
        // will be negative values, because we swip up!
        else if (-gestureState.dy > 50 && -gestureState.vy > 0.7 && this.currenctIndex < ARTICLES.length - 1) {
          Animated.timing(this.position, {
            toValue: { x: 0, y: -SCREEN_HEIGHT },
            duration: 1000
          }).start(() => {
            // Add the panresponder to the next card
            // Set the position back to normal
            this.setState({ currenctIndex: this.state.currenctIndex + 1 });
            this.position.setValue({ x: 0, y: 0 });
          });
        } else {
            // set the card back to where it was
          Animated.parallel([
            Animated.spring(this.position, {
              toValue: { x: 0, y: 0 }
            }),
            Animated.spring(this.swipedCardPosition, {
              toValue: { x: 0, y: -SCREEN_HEIGHT }
            })
          ]).start();;
        }

        // For swiping down
        // if (gestureState.dy > 50 && gestureState.vy > 0.7) {
        //   Animated.timing(this.position, {
        //     toValue: { x: 0, y: SCREEN_HEIGHT },
        //     duration: 400
        //   }).start();
        // } else {
        //   Animated.spring(this.position, {
        //     toValue: { x: 0, y: 0 }
        //   }).start();
        // }
      }
    });
  }
  renderArticles = () => {
    return ARTICLES.map((item, i) => {
      // Returns an Animated.View for the card that is
      // behind the first card.
      // In this way, we can get back the previous card.
      if (i == this.state.currenctIndex - 1) {
        return (
          <Animated.View
            key={item.id}
            style={this.swipedCardPosition.getLayout()}
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
        // hide the cards that are swiped out
      } else if (i < this.state.currenctIndex) {
        return null;
      }
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
