import { combineReducers } from "redux";
import placeParamsReducer from "./placeParamsReducer";

export default combineReducers({
    placeParams: placeParamsReducer,
});
