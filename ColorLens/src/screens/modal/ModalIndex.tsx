import React, {Component} from "react";
import {Layout} from 'shared/containers'
import {colors} from 'shared/constants'
import CameraRollScreen from "./camera-roll/CameraRollScreen";

type Props = {
    navigation: object
}
export default class ModalIndex extends Component<Props> {
    render() {
        const modalContent = <CameraRollScreen navigation={this.props.navigation}/>;

        return (
            <Layout style={{backgroundColor: colors.modalViewBackground}}>
                {modalContent}
            </Layout>
        );
    }
}
