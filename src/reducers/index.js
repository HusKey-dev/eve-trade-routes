import { combineReducers } from "redux";
import placeParamsReducer from "./placeParamsReducer";
import routesReducer from "./routesReducer";
import optionsParamsReducer from "./optionsParamsReducer";
import searchModalReducer from "./searchModalReducer";
import errorModalReducer from "./errorModalReducer";
import checkPriceReducer from "./checkPriceReducer";

export default combineReducers({
    placeParams: placeParamsReducer,
    optionsParams: optionsParamsReducer,
    routes: routesReducer,
    searchModal: searchModalReducer,
    errorModal: errorModalReducer,
    jitaPrice: checkPriceReducer,
});
