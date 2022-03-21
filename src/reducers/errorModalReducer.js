export default (state = false, action) => {
    switch (action.type) {
        case "TOGGLE_ERROR":
            return !state;
        case "CLOSE_ERRORMESSAGE":
            return false;
        default:
            return state;
    }
};
