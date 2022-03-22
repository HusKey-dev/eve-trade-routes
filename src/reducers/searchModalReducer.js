export default (state = false, action) => {
    switch (action.type) {
        case "TOGGLE_SEARCHMODAL":
            return !state;
        case "CLOSE_ERRORMESSAGE":
            return false;
        default:
            return state;
    }
};
