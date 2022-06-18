import { v4 as uuid } from "uuid";
import { UPDATE_TYPE_CREDIT, UPDATE_TYPE_CASH } from "./consts.js";
import { loadJson, getUsersAndAccountsJson, saveToJson } from "./jsonUtils.js";
import {
    updateAccounts,
    getRequestedAccount,
    checkAccountExistOrThrow,
} from "./accountUtils.js";

export const getUserData = (id) => {
    const { users, accounts } = getUsersAndAccountsJson();
    const requestedUser = users.find((user) => user.id === id);
    const userAccountsData = requestedUser.accounts.map((accountId) => {
        return accounts.find((account) => account.id === accountId);
    });
    const userData = {
        userId: requestedUser.id,
        userName: requestedUser.name,
        accounts: userAccountsData,
    };

    return userData;
};

export const getAllUsers = () => {
    const users = loadJson("users.json");
    return users.map((user) => getUserData(user.id));
};

const createNewAccount = (userNewAccount, newUserId) => ({
    id: userNewAccount,
    cash: 0,
    credit: 0,
    permittedUsers: [newUserId],
});

export const addNewUser = ({ name }, newUserId) => {
    const { users, accounts } = getUsersAndAccountsJson();
    const duplicateUser = users.find((user) => user.id === newUserId);

    if (!duplicateUser) {
        const userNewAccount = uuid();
        users.push({ id: newUserId, name: name, accounts: [userNewAccount] });
        accounts.push(createNewAccount(userNewAccount, newUserId));
        saveToJson("users.json", users);
        saveToJson("accounts.json", accounts);
    } else {
        throw Error("This user already exist");
    }
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
    checkUserBalanceOrThrow(id, fromWhereToWithdraw, amount);
    const newAccountsArr = updateAccounts(id, amount * -1, fromWhereToWithdraw);
    saveToJson("accounts.json", newAccountsArr);
};

export const updateCredit = ({ accountId, amount }, userId) => {
    const { id } = getRequestedAccount(userId, accountId);
    const newAccountsArr = updateAccounts(id, amount, UPDATE_TYPE_CREDIT);
    saveToJson("accounts.json", newAccountsArr);
};

const checkUserBalanceOrThrow = (withdrawAccountId, whereToUpdate, amount) => {
    const totalMoney = getMoneyAmount(withdrawAccountId, whereToUpdate);
    if (totalMoney - amount < 0) {
        throw Error(
            "Can't transfer money (The user can't getting into overdraft)"
        );
    }
};

export const transferMoney = (
    { accountId, destinationAccountId, amount },
    userId,
    whereToUpdate
) => {
    const depositAccount = checkAccountExistOrThrow(destinationAccountId);
    const withdrawAccount = getRequestedAccount(userId, accountId);
    checkUserBalanceOrThrow(withdrawAccount.id, whereToUpdate, amount);
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
