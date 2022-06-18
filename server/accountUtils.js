import { loadJson } from "./jsonUtils.js";
import { getUserData } from "./userController.js";

export const getAccount = (accountId) => {
    const accounts = loadJson("accounts.json");

    return accounts.find((account) => account.id === accountId);
};

export const updateAccounts = (
    accountId,
    amountOfMoney,
    fromWhere = UPDATE_TYPE_CASH,
    accountsArr
) => {
    console.log(accountsArr);
    const accounts = accountsArr ?? loadJson("accounts.json");
    const newAccountsArr = accounts.map((account) => {
        if (account.id === accountId) {
            account[fromWhere] += amountOfMoney;
        }

        return account;
    });

    return newAccountsArr;
};

export const getRequestedAccount = (userId, accountId) => {
    const accountFromAllAccounts = getAccount(accountId);
    const user = getUserData(userId);

    return user.accounts.find(
        (account) => account.id === accountFromAllAccounts?.id
    );
};

export const checkAccountExistAndThrow = (accountId) => {
    const account = getAccount(accountId);
    if (!account) {
        throw Error("Destination account doesn't exist");
    }
    return account;
};
