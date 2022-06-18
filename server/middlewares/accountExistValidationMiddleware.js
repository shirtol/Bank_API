import { getRequestedAccount } from "../accountUtils.js";

export const accountExistValidation = (req, res, next) => {
    const userId = req.headers["user-id"];
    const accountId = req?.body?.accountId;
    const account = getRequestedAccount(userId, accountId);
    if (!account) {
        throw Error("This account doesn't exist");
    }
    next();
};
