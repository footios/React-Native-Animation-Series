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
import DeckSwipeView from "./components/DeckSwipeView";

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
          // Note: you have to set also a value for x.
          this.position.setValue({ x: 0, y: gestureState.dy });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Check if there is a previous card,
        // and user swiped down, more than 50.
        if ( 
          this.state.currenctIndex > 0 &&
          gestureState.dy > 200 &&
          gestureState.vy > 1
        ) {
          Animated.timing(this.swipedCardPosition, {
            toValue: { x: 0, y: 0 },
            duration: 700
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
        else if (
          -gestureState.dy > 200 &&
          -gestureState.vy > 1 &&
          this.state.currenctIndex < ARTICLES.length - 1
        ) {
          Animated.timing(this.position, {
            toValue: { x: 0, y: -SCREEN_HEIGHT },
            duration: 700
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
          ]).start();
        }
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
            <DeckSwipeView i={i} />
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
            <DeckSwipeView i={i} />
          </Animated.View>
        );
        // else show a view i.e. the second card without the panResponder
      } else {
        return (
          <Animated.View
            key={item.id}
            // style={this.position.getLayout()}
            // {...this.PanResponder.panHandlers}
          >
            <DeckSwipeView i={i} />
          </Animated.View>
        );
      }
    }).reverse(); // reverse to get the first image first!
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
