import {combineReducers} from "redux";
import studioReducer from "./studioReducer";
import cameraRollReducer from "./cameraRollReducer";


const rootReducer = combineReducers({
    // @ts-ignore
    studio: studioReducer,
    // @ts-ignore
    cameraRoll: cameraRollReducer
});
export default rootReducer;
