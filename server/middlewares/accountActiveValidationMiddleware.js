import { getAccount } from "../accountUtils.js";

export const accountActiveValidation = (req, res, next) => {
    // const isActive = req?.body?.isActive;
    const accountId = req?.body?.accountId;
    const destinationAccountId = req?.body?.destinationAccountId;
    const account = getAccount(accountId);
    const destAccount = getAccount(destinationAccountId);
    console.log(account);
    if (!account.isActive) {
        throw Error("Account isn't active");
    } else if (!destAccount.isActive) {
        throw Error(
            "The account you are trying to transfer money to isn't active"
        );
    }
    next();
};
