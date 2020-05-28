import React from "react";
import { View } from "react-native";
import { IconButton as Button } from "react-native-paper";
import { colors } from "#styles";

const IconButton = props => (
  <View style={props.style}>
    <Button size={props.size} icon={props.name} color={"white"} onPress={props.onPress} />
  </View>
);

IconButton.defaultProps = {
  color: colors.primary,
  size: 30,
  onPress: () => {}
};
export default IconButton;
