const closure = () => {
    let id = 0;
    return () => {
        return id++;
    };
};

const createId = closure();

export default createId;
