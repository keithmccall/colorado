import React from "react";
import {View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {colors} from "shared/constants";


type Props = {
    style?: object,
    color?: string,
    size?: number,
    name: string,
    pressMethod: any,
    longPressMethod?: any
}
const IconButton = (props: Props) => (
    <View
        style={props.style}>
        <Icon.Button
            size={props.size}
            name={props.name}
            backgroundColor="transparent"
            color={props.color}
            onPress={props.pressMethod}
            underlayColor="transparent"
        />
    </View>
)
IconButton.defaultProps = {
    color: colors.primary,
    size: 30,
}
export default IconButton