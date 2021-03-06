import React, { memo } from "react";
import { View } from "react-native";
import { globalStyle } from "#styles";
import defaultStyle from "../styles";
import PropTypes from "prop-types";
import { mapSwatchPaletteToArray } from "#utils/swatch.util";
import ConditionalButton from "#containers/tools/ConditionalButton";
import { swatchDictionaryEnum } from "#enum/swatch-dictionary.enum";

const renderSwatches = props => {
  const { onPress, onLongPress, swatches, isStudio } = props;

  return mapSwatchPaletteToArray(swatches).map((swatch, key) => {
    const _key = swatchDictionaryEnum[key];
    return (
      <ConditionalButton
        style={globalStyle.flex1}
        onPress={onPress && onPress.bind(null, swatch, _key)}
        onLongPress={onLongPress && onLongPress.bind(null, swatch, _key)}
        key={`${key}_${swatch.hex}`}
        enable={!isStudio}
      >
        <View style={[globalStyle.flex1, { backgroundColor: swatch.hex }]} key={key} />
      </ConditionalButton>
    );
  });
};

const ColorStrip = props => {
  const { style } = props;
  return (
    <View style={{ ...defaultStyle.colorStripWrapper, ...style }}>{renderSwatches(props)}</View>
  );
};

ColorStrip.propTypes = {
  style: PropTypes.object,
  onLongPress: PropTypes.func,
  onPress: PropTypes.func,
  isStudio: PropTypes.bool,
  swatches: PropTypes.object.isRequired
};

ColorStrip.defaultProps = {
  style: {},
  onPress: null,
  onLongPress: null,
  isStudio: false
};

export default memo(ColorStrip);
