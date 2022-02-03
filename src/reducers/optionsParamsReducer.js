export default (state = {}, action) => {
    switch (action.type) {
        case "UPDATE_PARAMS":
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
