import React, { Component, Fragment } from "react";
import { View, TouchableOpacity } from "react-native";
import LoadingView from "../../containers/loading/LoadingView";
import ColorStripContainer from "../../containers/color-strips/ColorStripContainer";
import ResponsiveImage from "../image-containers/ResponsiveImage";

class ImageWithColorStrip extends Component {
  state = {
    isImageReady: false,
    isColorsReady: false
  };

  imageReady = () => {
    this.setState({ isImageReady: true });
  };

  colorsReady = () => {
    this.setState({ isColorsReady: true });
  };

  resetImageStatus = prevProps => {
    if (prevProps.image.id !== this.props.image.id) {
      this.setState({
        isImageReady: false
      });
    }
  };

  componentDidUpdate(prevProps) {
    this.resetImageStatus(prevProps);
  }

  content = () => {
    const { image, isStudio } = this.props;
    const { isColorsReady, isImageReady } = this.state;

    return (
      <Fragment>
        <ResponsiveImage src={image} onReady={this.imageReady} />
        <ColorStripContainer
          image={image}
          onReady={this.colorsReady}
          editMode={this.props.editMode}
          isStudio={isStudio}
          onPress={this.props.onPress}
          onLongPress={this.props.onLongPress}
        />
        {!(isColorsReady && isImageReady) && <LoadingView />}
      </Fragment>
    );
  };

  renderContent = () => {
    const { onPress, style } = this.props;
    return onPress ? (
      <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.8}>
        {this.content()}
      </TouchableOpacity>
    ) : (
      <View style={style}>{this.content()}</View>
    );
  };

  render() {
    return <Fragment>{this.renderContent()}</Fragment>;
  }
}

ImageWithColorStrip.defaultProps = {
  editMode: false,
  isStudio: false,
  onPress: null,
  onLongPress: null
};

export default ImageWithColorStrip;
