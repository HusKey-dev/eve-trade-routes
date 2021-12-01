import { combineReducers } from "redux";
import placeParamsReducer from "./placeParamsReducer";
import routesReducer from "./routesReducer";

export default combineReducers({
    placeParams: placeParamsReducer,
    routes: routesReducer,
});
