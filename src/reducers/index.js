import { combineReducers } from "redux";
import placeParamsReducer from "./placeParamsReducer";
import routesReducer from "./routesReducer";
import optionsParamsReducer from "./optionsParamsReducer";
import searchModalReducer from "./searchModalReducer";

export default combineReducers({
    placeParams: placeParamsReducer,
    optionsParams: optionsParamsReducer,
    routes: routesReducer,
    searchModal: searchModalReducer,
});
