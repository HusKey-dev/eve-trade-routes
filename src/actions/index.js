export const saveOptions = (type, state) => {
    console.log("save options triggered with state=", state, "type= ", type);
    return {
        type,
        payload: { data: state.data, system: state.system },
    };
};
