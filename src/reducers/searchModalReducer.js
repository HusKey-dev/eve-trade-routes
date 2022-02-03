export default (state = false, action) => {
    switch (action.type) {
        case "TOGGLE_SEARCHMODAL":
            return !state;
        default:
            return state;
    }
};
