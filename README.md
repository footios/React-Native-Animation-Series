A Youtube Tutorial:

[React Native Animation Series](https://www.youtube.com/watch?v=LP6zmnMcHR0&list=PLy9JCsy2u97k6olfalMTA_XSPz4pNuT46)

### 1. TwitterScrollable

- [Animated.event](https://animationbook.codedaily.io/animated-event/)
- [interpolation](https://facebook.github.io/react-native/docs/animations#interpolation)
- [scrollEventThrottle](https://reactnative.dev/docs/scrollview#scrolleventthrottle)
- [How does Animated.Event work in React Native?](https://stackoverflow.com/questions/43510145/how-does-animated-event-work-in-react-native)

### 2. DeckSwiper

- [PanResponder](https://facebook.github.io/react-native/docs/panresponder)
- [getLayout](https://animationbook.codedaily.io/get-layout/)
- `getLayout` is a method of [AnimatedValueXY](https://facebook.github.io/react-native/docs/animatedvaluexy#getlayout)
- [Tracking gestures](https://facebook.github.io/react-native/docs/animations#tracking-gestures)
- [A gestureState object has the following](https://facebook.github.io/react-native/docs/panresponder#__docusaurus)

### 3. UberIntro

- It seams like the navigation is outdated. So from the docs of React Navigation, we have to install the following packages:
  - expo install @react-navigation/native react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
- So we don't need to install: react-navigation
- But we still need to install: react-native-animatable native-base
- [nathvarun/Uber-App-UI-Clone-React-Native](https://github.com/nathvarun/Uber-App-UI-Clone-React-Native)
- Extra info: a log in keyboardWillShow for the content of `event` gives:

```js
Object {
  "duration": 250,
  "easing": "keyboard",
  "endCoordinates": Object {
    "height": 301,
    "screenX": 0,
    "screenY": 595,
    "width": 414,
  },
  "isEventFromThisApp": true,
  "startCoordinates": Object {
    "height": 243,
    "screenX": 0,
    "screenY": 896,
    "width": 414,
  },
}
```

### 4. AppleMusicUI

- getTranslateTransform

```js
transform: this.animation.getTranslateTransform();
```

This is a helper that just saves you some code.
The equivalence of what it generates
is something like so:

```js
transform: [
  {
    translateX: this.animation.x
  },
  {
    translateY: this.animation.y
  }
];
```

- [PanResponder](https://reactnative.dev/docs/panresponder#__docusaurus)

It provides a predictable wrapper of the responder handlers provided by the gesture responder system. For each handler, it provides a new `gestureState` object alongside the native `event` object:

- onPanResponderMove: (event, gestureState) => {}

A native `event` is a synthetic touch event with the following form:

- `nativeEvent`

* changedTouches - Array of all touch events that have changed since the last event
* identifier - The ID of the touch
* locationX - The X position of the touch, relative to the element
* locationY - The Y position of the touch, relative to the element
* pageX - The X position of the touch, relative to the root element
* pageY - The Y position of the touch, relative to the root element
* target - The node id of the element receiving the touch event
* timestamp - A time identifier for the touch, useful for velocity calculation
* touches - Array of all current touches on the screen

A `gestureState` object has the following:

- stateID - ID of the gestureState- persisted as long as there at least one touch on screen
- moveX - the latest screen coordinates of the recently-moved touch
- moveY - the latest screen coordinates of the recently-moved touch
- x0 - the screen coordinates of the responder grant
- y0 - the screen coordinates of the responder grant
- dx - accumulated distance of the gesture since the touch started
- dy - accumulated distance of the gesture since the touch started
- vx - current velocity of the gesture
- vy - current velocity of the gesture
- numberActiveTouches - Number of touches currently on screen

`extractOffset` takes the delta values from the `gestureState`, and moves them in the `offset`, before they override the animated values. So we save the position that the animation is currently at.  
When we call `extractOffset` the value is manipulated synchronously. It's not going through `setValue`, that would stop every other animation.

- From the docs:
  `extracOffset` sets the offset value to the base value, and resets the base value to zero. The final output of the value is unchanged.

* Slider: Deprecated.

- We should use @react-native-community/slider instead. But it's not [compatible with Expo yet](https://forums.expo.io/t/react-native-slider/25681). So we stick on the native Slider.

But just for the record here is the docs for `react-native-community/slider`.

- [@react-native-community/slider](https://github.com/react-native-community/react-native-slider)

expo install @react-native-community/slider

- You also need to link it!

react-native link @react-native-community/slider

```js
import Slider from "@react-native-community/slider";
<Slider
  style={{ width: 200, height: 40 }}
  minimumValue={0}
  maximumValue={1}
  minimumTrackTintColor="#FFFFFF"
  maximumTrackTintColor="#000000"
/>;
```

### 5. Udemy Searchbar

We'll learn how to replicate the searchbar animation of the Udemy app on Both Android and iOS using React Native.

Libraries used :

- react-native-animatable - Oblador
- react-native-vector-icons - Oblador
- [Project Files](https://github.com/nathvarun/React-Native-Layout-Tutorial-Series/tree/master/Project%20Files/15.%20Udemy%20Searchbar%20Animation)
