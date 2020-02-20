import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Animated } from 'react-native';

HEADER_MAX_HEIGHT = 120;
HEADER_MIN_HEIGHT = 70;
PROFILE_IMAGE_MAX_HEIGHT = 80;
PROFILE_IMAGE_MIN_HEIGHT = 40;

// Change the height of the header, depending on the distance that the user scrolled.
// When scroll up, reduce height of header.
// So we monitor the onScroll prop of the ScrollView
// and to that we'll attach an animated event method.
class App extends Component {
state = { scrollY: new Animated.Value(0)}

	render() {

const headerHeight = this.state.scrollY.interpolate({
	inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT], 
	outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
	extrapolate: 'clamp' // so the header doesn't go further up than the minimun height.
})

		return (
			<View style={{ flex: 1 }}>
				<Animated.View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						backgroundColor: 'lightskyblue',
						// height: HEADER_MAX_HEIGHT
						height: headerHeight // animated
					}}
				>
					
				</Animated.View>

				<ScrollView style={{ flex: 1 }}
				scrollEventThrottle={16} // lets the header move
				onScroll={Animated.event(
					[{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
				)}
				>
					<View
						style={{
							height: PROFILE_IMAGE_MAX_HEIGHT,
							width: PROFILE_IMAGE_MAX_HEIGHT,
							borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
							borderColor: 'white',
							borderWidth: 3,
							overflow: 'hidden',
							marginLeft: 10,
							// Set the image in the middle of the line of the header.
							marginTop: HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
							marginLeft: 10
						}}
					>
						<Image source={require('./assets/expo.jpeg')} style={{ flex: 1, width: null, height: null }} />
					</View>
					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 26, paddingLeft: 10 }}>Expo</Text>
					</View>
					{/* This View does not allow the header to bounch back when we leave it up. 
					 It acts like it's taking all the place*/}
					<View style={{ height: 1000 }} />
				</ScrollView>
			</View>
		);
	}
}
export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
