import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "#containers/buttons";
import ImageWithColorStrip from "#containers/image-with-color-strip/ImageWithColorStrip";
import style from "../styles";

const ImageStudio = props => {
  const { onEditPress, onPress, image } = props;

  return (
    <Fragment>
      <ImageWithColorStrip
        image={image}
        style={style.imageStudioWrapper}
        onStripPress={onPress}
        onStripLongPress={onPress}
        isStudio
      />
      <Button.Icon
        style={style.imageStudioEditButton}
        name={Button.Icon.enum.edit}
        onPress={onEditPress}
        size={35}
      />
    </Fragment>
  );
};

ImageStudio.propTypes = {
  onPress: PropTypes.func.isRequired,
  onEditPress: PropTypes.func.isRequired,
  image: PropTypes.object
};

ImageStudio.defaultProps = {
  onPress: null,
  onEditPress: null,
  image: {}
};

export default ImageStudio;
