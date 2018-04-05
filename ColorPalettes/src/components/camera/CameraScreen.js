import React, { Component } from "react";
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Button,
	Image,
	ScrollView,
	TouchableOpacity,
	CameraRoll,
	TouchableHighlight,
	Dimensions,
	Modal
} from "react-native";
import { NavigationActions } from "react-navigation";
import { RNCamera } from "react-native-camera";
//
import Camera from "./Camera";
import CameraPunch from "./CameraPunch";
import CameraOptions from "./CameraOptions";
//
import style from "../../Style";
const { Type, FlashMode, WhiteBalance } = RNCamera.Constants;
export default class CameraScreen extends Component {
	constructor() {
		super();
		this.state = {
			cameraType: Type.back,
			flashMode: FlashMode.off,
			whiteBalance: WhiteBalance.auto,
			zoom: 0,
			cameraFired: false,
			//icons
			iconFlashMode: "ios-flash-outline",
			iconCameraType: "ios-reverse-camera",
			iconWhiteBalance: "ios-aperture-outline"
		};
		this.takePicture = this.takePicture.bind(this);
	}
	toggleFlashMode = () => {
		this.state.flashMode === FlashMode.off
			? this.setState({
					flashMode: FlashMode.on,

					iconFlashMode: "ios-flash"
			  })
			: this.setState({
					flashMode: FlashMode.off,
					iconFlashMode: "ios-flash-outline"
			  });
	};
	toggleCameraType = () => {
		this.state.cameraType === Type.back
			? this.setState({
					cameraType: Type.front,
					iconCameraType: "ios-reverse-camera-outline"
			  })
			: this.setState({
					cameraType: Type.back,
					iconCameraType: "ios-reverse-camera"
			  });
	};
	toggleWhiteBalance = () => {
		if (this.state.whiteBalance === WhiteBalance.auto) {
			this.setState({
				whiteBalance: WhiteBalance.sunny,
				iconWhiteBalance: "ios-sunny"
			});
		} else if (this.state.whiteBalance === WhiteBalance.sunny) {
			this.setState({
				whiteBalance: WhiteBalance.cloudy,
				iconWhiteBalance: "ios-cloudy"
			});
		} else {
			this.setState({
				whiteBalance: WhiteBalance.auto,
				iconWhiteBalance: "ios-aperture-outline"
			});
		}
	};
	takePicture = async function() {
		if (this.camera) {
			const options = {
				quality: 1,
				base64: true,
				forceUpOrientation: true
			};
			const data = await this.camera.takePictureAsync(options);
			console.log("cameradata", data);

			CameraRoll.saveToCameraRoll(data.uri).then(res =>
				console.log("saved", res)
			);
		}
	};
	render() {
		return (
			<View
				style={{
					flex: 1,
					flexDirection: "column"
				}}
			>
				<View style={style.statusPadding} />
				<CameraOptions
					toggleCameraType={this.toggleCameraType}
					toggleWhiteBalance={this.toggleWhiteBalance}
					toggleFlashMode={this.toggleFlashMode}
					iconWhiteBalance={this.state.iconWhiteBalance}
					iconCameraType={this.state.iconCameraType}
					iconFlashMode={this.state.iconFlashMode}
				/>
				<Camera
					whiteBalance={this.state.whiteBalance}
					flashMode={this.state.flashMode}
					cameraType={this.state.cameraType}
				/>
				<CameraPunch fire={this.takePicture} />
			</View>
		);
	}
}
