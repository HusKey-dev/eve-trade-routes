export default (state = [], action) => {
    switch (action.type) {
        case "CALCULATE_ROUTES":
            return [...action.payload];

        default:
            return state;
    }
};
