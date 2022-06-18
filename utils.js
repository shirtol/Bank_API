export const isNumberOrThrow = (input) => {
    if (typeof input !== "number") {
        throw Error(`${input} must be a number`);
    }
};

export const isBoolOrThrow = (input) => {
    if (typeof input !== "boolean") {
        throw Error(`${input} must be a boolean`);
    }
};
