export default (state = "", action) => {
    switch (action.type) {
        case "CALCULATE_ROUTES":
            return { ...state, routes: action.payload };

        default:
            return state;
    }
};
