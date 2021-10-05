const INITIAL_STATE = {
    startingOptions: { data: [], system: "" },
    endingOptions: { data: [], system: "" },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "STARTINGSELECT_OPTIONS":
            console.log(action.type);
            return { ...state, startingOptions: action.payload };
        case "ENDINGSELECT_OPTIONS":
            console.log(action.type);
            return { ...state, endingOptions: action.payload };
        default:
            console.log("default action type=", action.type);
            return state;
    }
};
