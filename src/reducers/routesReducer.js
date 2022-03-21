export default (state = null, action) => {
    switch (action.type) {
        case "CALCULATE_ROUTES":
            return [...action.payload];

        default:
            return state;
    }
};
