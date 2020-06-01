import React, { useState, useEffect } from "react";
import { getPalette } from "react-native-color-lens";
import ColorStrip from "./components/ColorStrip";
import PropTypes from "prop-types";
import { normalizeSwatches } from "#utils";
import LoadingView from "../loading/LoadingView";
import { studioActions } from "#store/actions";
import { connect } from "react-redux";
import defaultStyle from "./styles";

const ColorStripContainer = props => {
  const {
    isStudio,
    onPress,
    onLongPress,
    image,
    onReady,
    setSwatchesOnImage,
    setSwatchesOnStudioImage
  } = props;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const { swatches: hasSwatches = false, uri } = image;
    //    checks to see if image has swatches already,
    //    if not then it runs code to find the dominant colors
    if (hasSwatches) {
      setIsLoaded(true);
      if (onReady) {
        onReady();
      }
    } else {
      getPalette(uri, (error, newSwatches) => {
        const imageSwatches = {
          swatches: normalizeSwatches(newSwatches),
          image
        };
        if (error) {
          console.log("error in ColorStripContainer.getDominantSwatches", error);
          return;
        }
        if (isStudio) {
          setSwatchesOnStudioImage(imageSwatches);
        } else {
          setSwatchesOnImage(imageSwatches);
        }
      });
    }
  }, [image, isStudio, onReady, setSwatchesOnImage, setSwatchesOnStudioImage]);

  return isLoaded ? (
    <ColorStrip swatches={image.swatches} onPress={onPress} onLongPress={onLongPress} isStudio />
  ) : (
    <LoadingView blank />
  );
};

ColorStripContainer.propTypes = {
  image: PropTypes.shape({
    uri: PropTypes.string.isRequired,
    swatches: PropTypes.object
  }).isRequired,
  onPress: PropTypes.func,
  onReady: PropTypes.func,
  isStudio: PropTypes.bool,
  onLongPress: PropTypes.func
};

ColorStripContainer.defaultProps = {
  style: defaultStyle.containerDefaultWrapper,
  quality: "medium",
  isStudio: false,
  onReady: null,
  onPress: null,
  onLongPress: null
};

const mapDispatchToProps = dispatch => ({
  setSwatchesOnStudioImage: swatches => dispatch(studioActions.setSwatchesOnStudioImage(swatches)),
  setSwatchesOnImage: swatches => dispatch(studioActions.setSwatchesOnImage(swatches))
});

export default connect(null, mapDispatchToProps)(ColorStripContainer);
