import { getRequestedAccount } from "../userController.js";

export const accountExistValidation = (req, res, next) => {
    const userId = req.headers["user-id"];
    const accountId = req?.body?.accountId;
    const account = getRequestedAccount(userId, accountId);
    console.log(account);
    if (!account) {
        throw Error("This account doesn't exist");
    }
    next();
};
