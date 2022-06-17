export const amountValidation = (req, res, next) => {
    console.log("hii");
    const amount = req?.body?.amount;
    if (amount) {
        if (typeof amount !== "number") {
            throw Error("Amount type must be number");
        } else if (amount < 0) {
            throw Error("Amount must be a positive number");
        }
    }
    next();
};
