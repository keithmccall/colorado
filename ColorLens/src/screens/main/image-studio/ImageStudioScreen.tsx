import React, {PureComponent, Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";
import StudioGallery from "./components/StudioGallery";
import FocusedImage from "./components/FocusedImage";
import {BottomButtonBar, Layout, LoadingView, ButtonBarOptionType, AnimatedView} from 'shared/containers'
import {AnimatedViewType, CommonImageType} from "types-store";
import {studioActions} from "store/actions";
import rootReducer from "store/reducers"
import style from "./styles";
import {ThunkDispatch} from "redux-thunk";
import StudioInstructions from "./components/StudioInstructions";


type Images = Array<CommonImageType>
type State = {
    galleryOptions: {
        rowSize: number
        rowHeight: number
    },
    editMode: boolean,
    sliderOptions: AnimatedViewType
}
type Props = {
    images: Images,
    focusedImage: CommonImageType,
    navigation: {
        state: {
            params: {
                newSelectedImages: Array<object>
            }
        }
    },
    temporaryAddStudioImages(images: CommonImageType[] | any[]): any,
    fetchStudioImages(): any,
    setFocusedImage(image: CommonImageType): any
}
// @ts-ignore
type ReduxState = rootReducer

class ImageStudioScreen extends PureComponent<Props, State> {
    state = {
        galleryOptions: {
            rowSize: 2,
            rowHeight: 220
        },
        editMode: false,
        sliderOptions: {
            starting: -style.directionsWrapper.height,
            ending: 30,
            key: "bottom"
        }
    };
    toggleGalleryOptions = () => {
        //    rowSize:3,
        //    rowHeight:140
        //    or
        //    rowSize:2,
        //    rowHeight:220
        const toggleRowSize = (rowSize: number) => {
            if (rowSize === 2) {
                // toggle rowsize from 2 per row (default) to 3 per row
                return {rowSize: 3, rowHeight: 140};
            }
            return {rowSize: 2, rowHeight: 220};

        };
        this.setState({
            galleryOptions: toggleRowSize(this.state.galleryOptions.rowSize)
        })
    }
    buttonBarOptions = (): Array<ButtonBarOptionType> => [
        {
            label: "Switch Columns",
            pressMethod: this.toggleGalleryOptions
        }
    ];

    temporaryAddStudioImages = () =>
        this.props.navigation.state.params.newSelectedImages && this.props.temporaryAddStudioImages(this.props.navigation.state.params.newSelectedImages);


    toggleEditMode = (): void => {
        this.setState({
            editMode: !this.state.editMode
        })
    };
    setFocusedImage = (image: CommonImageType) => {
        this.props.setFocusedImage(image)
    };

    render() {
        return (
            <Layout style={style.imageStudioWrapper}>
                <View style={style.imageStudioHeadingWrapper}>
                    <Text style={style.imageStudioHeading}>Studio</Text>
                </View>
                {this.props.focusedImage ?
                    <FocusedImage focusedImage={this.props.focusedImage} editMode={this.state.editMode}
                                  toggleEditMode={this.toggleEditMode}/> : (
                        <LoadingView style={style.focusedImageWrapper}/>
                    )}

                <StudioGallery images={this.props.images} galleryOptions={this.state.galleryOptions}
                               setFocusedImage={this.setFocusedImage}/>
                <BottomButtonBar options={this.buttonBarOptions()} style={style.buttonBarWrapper}
                                 labelStyle={style.buttonBarLabel}/>
                <StudioInstructions editMode={this.state.editMode} sliderOptions={this.state.sliderOptions}/>
            </Layout>
        );
    }

    componentDidMount() {
        this.props.navigation.state.params ? this.temporaryAddStudioImages() : this.props.fetchStudioImages()
        //    adds images from camera roll confirmation to bypass having to reload from storage
        //    creates a better UI as the transition is seamless when confirming new images to studio
    }
}


const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    fetchStudioImages: () => dispatch(studioActions.fetchStudioImages()),
    temporaryAddStudioImages: (newImages: Images) => dispatch(studioActions.temporaryAddStudioImages(newImages)),
    setFocusedImage: (image: CommonImageType) => dispatch(studioActions.setFocusedImage(image))
});

const mapStateToProps = (state: ReduxState) => ({
    images: state.studio.studioImages.length ? state.studio.studioImages : [],
    focusedImage: state.studio.focusedImage ? state.studio.focusedImage : null
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageStudioScreen)