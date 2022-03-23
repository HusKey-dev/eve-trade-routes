const INITIAL_STATE = {
    startingOptions: { data: [], system: "" },
    endingOptions: { data: [], system: "" },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "STARTINGSELECT_OPTIONS":
            return { ...state, startingOptions: action.payload };
        case "ENDINGSELECT_OPTIONS":
            return { ...state, endingOptions: action.payload };
        case "VALIDATE_GENERAL":
            console.log("validate reducer worked");
            return {
                startingOptions: {
                    ...state.startingOptions,
                    ...action.payload.startingOptions,
                },
                endingOptions: {
                    ...state.endingOptions,
                    ...action.payload.endingOptions,
                },
            };
        default:
            return state;
    }
};
