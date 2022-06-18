import { v4 as uuid } from "uuid";
import { UPDATE_TYPE_CREDIT, UPDATE_TYPE_CASH } from "./consts.js";
import { loadJson, getUsersAndAccountsJson, saveToJson } from "./jsonUtils.js";

export const getUserData = (id) => {
    const { users, accounts } = getUsersAndAccountsJson();
    const requestedUser = users.find((user) => user.id === id);
    const userAccountsData = requestedUser.accounts.map((accountId) => {
        return accounts.find((account) => account.id === accountId);
    });
    const userData = {
        userId: requestedUser.id,
        accounts: userAccountsData,
    };

    return userData;
};

export const getAllUsers = () => {
    const users = loadJson("users.json");
    return users.map((user) => getUserData(user.id));
};

const createNewUser = (userNewAccount, newUserId) => ({
    id: userNewAccount,
    cash: 0,
    credit: 0,
    permittedUsers: [newUserId],
});

export const addNewUser = (newUserId) => {
    const { users, accounts } = getUsersAndAccountsJson();
    const duplicateUser = users.find((user) => user.id === newUserId);

    if (!duplicateUser) {
        const userNewAccount = uuid();
        users.push({ id: newUserId, accounts: [userNewAccount] });
        accounts.push(createNewUser(userNewAccount, newUserId));
        saveToJson("users.json", users);
        saveToJson("accounts.json", accounts);
    } else {
        throw Error("This user already exist");
    }
};

export const getAccount = (accountId) => {
    const accounts = loadJson("accounts.json");

    return accounts.find((account) => account.id === accountId);
};

const updateAccounts = (
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

export const depositCash = ({ accountId, amount }, userId) => {
    const { id } = getRequestedAccount(userId, accountId);
    console.log(id);
    const newAccountsArr = updateAccounts(id, amount);
    saveToJson("accounts.json", newAccountsArr);
};

const getMoneyAmount = (accountId, fromWhereToWithdraw) => {
    const accounts = loadJson("accounts.json");
    const accountData = accounts.find((account) => account.id === accountId);

    return accountData[fromWhereToWithdraw];
};

export const withdrawMoney = (
    { accountId, amount },
    userId,
    fromWhereToWithdraw
) => {
    const { id } = getRequestedAccount(userId, accountId);
    checkUserBalanceAndThrow(id, fromWhereToWithdraw, amount);
    const newAccountsArr = updateAccounts(id, amount * -1, fromWhereToWithdraw);
    saveToJson("accounts.json", newAccountsArr);
};

export const updateCredit = ({ accountId, amount }, userId) => {
    const { id } = getRequestedAccount(userId, accountId);
    const newAccountsArr = updateAccounts(id, amount, UPDATE_TYPE_CREDIT);
    saveToJson("accounts.json", newAccountsArr);
};

const checkUserBalanceAndThrow = (withdrawAccountId, whereToUpdate, amount) => {
    const totalMoney = getMoneyAmount(withdrawAccountId, whereToUpdate);
    if (totalMoney - amount < 0) {
        throw Error(
            "Can't transfer money (The user can't getting into overdraft)"
        );
    }
};

const checkAccountExistAndThrow = (accountId) => {
    const account = getAccount(accountId);
    if (!account) {
        throw Error("Destination account doesn't exist");
    }
    return account;
};

export const transferMoney = (
    { accountId, destinationAccountId, amount },
    userId,
    whereToUpdate
) => {
    const depositAccount = checkAccountExistAndThrow(destinationAccountId);
    const withdrawAccount = getRequestedAccount(userId, accountId);
    checkUserBalanceAndThrow(withdrawAccount.id, whereToUpdate, amount);
    //Withdraw
    let updatedAccounts = updateAccounts(
        withdrawAccount.id,
        amount * -1,
        whereToUpdate
    );
    //Deposit
    updatedAccounts = updateAccounts(
        depositAccount.id,
        amount,
        UPDATE_TYPE_CASH,
        updatedAccounts
    );
    saveToJson("accounts.json", updatedAccounts);
};
