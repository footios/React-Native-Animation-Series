import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Animated } from 'react-native';

HEADER_MAX_HEIGHT = 120;
HEADER_MIN_HEIGHT = 70;
PROFILE_IMAGE_MAX_HEIGHT = 80;
PROFILE_IMAGE_MIN_HEIGHT = 40;

class App extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						backgroundColor: 'lightskyblue',
						height: HEADER_MAX_HEIGHT
					}}
				>
					
				</View>

				<ScrollView style={{ flex: 1 }}>
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
