import { StyleSheet } from "react-native";
import { colors, DEVICE_HEIGHT } from "#styles";

export default StyleSheet.create({
  inspectorWrapper: {
    height: "100%"
  },
  inspectorTextWrapper: {
    top: DEVICE_HEIGHT * 0.05,
    left: 20
  },
  inspectorTextName: {
    color: colors.white
  },
  inspectorText: {
    color: colors.white,
    marginTop: 2
  },
  inspectorDetailsWrapper: {
    marginTop: 6
  }
});
