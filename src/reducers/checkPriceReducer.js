export default (state = false, action) => {
    switch (action.type) {
        case "CHECK_PRICE":
            return action.payload;

        default:
            return state;
    }
};
