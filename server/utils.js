import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";
import { UPDATE_TYPE_CREDIT, UPDATE_TYPE_CASH } from "./consts.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const loadJson = (jsonLocation) => {
    try {
        const dataBuffer = fs.readFileSync(`${__dirname}/${jsonLocation}`);
        const dataJson = dataBuffer.toString();
        const data = JSON.parse(dataJson);
        return data;
    } catch (err) {
        console.log(err);
        return [];
    }
};

const saveToJson = (jsonLocation, updatedArr) => {
    const dataJson = JSON.stringify(updatedArr);
    fs.writeFileSync(`${__dirname}/${jsonLocation}`, dataJson);
};

export const getUserData = (id) => {
    const users = loadJson("users.json");
    const accounts = loadJson("accounts.json");
    const requestedUser = users.find((user) => user.id === id);

    if (!requestedUser) {
        throw Error("This user doesn't exist");
    } else {
        const userAccountsData = requestedUser.accounts.map((accountId) => {
            return accounts.find((account) => account.id === accountId);
        });
        const userData = {
            userId: requestedUser.id,
            accounts: userAccountsData,
        };
        return userData;
    }
};

export const getAllUsers = () => {
    const users = loadJson("users.json");
    return users.map((user) => getUserData(user.id));
};

export const addNewUser = (newUserId) => {
    const users = loadJson("users.json");
    const accounts = loadJson("accounts.json");
    const duplicateUser = users.find((user) => user.id === newUserId);

    if (!duplicateUser) {
        const userNewAccount = uuid();
        users.push({ id: newUserId, accounts: [userNewAccount] });
        accounts.push({
            id: userNewAccount,
            cash: 0,
            credit: 0,
            permittedUsers: [newUserId],
        });
        saveToJson("users.json", users);
        saveToJson("accounts.json", accounts);
    } else {
        throw Error("This user already exist");
    }
};

const getAccount = (accountId) => {
    const accounts = loadJson("accounts.json");
    return accounts.find((account) => account.id === accountId);
};

const getAccountFromUser = (requestedAccountId, user) => {
    const accountId = user.accounts.find(
        (account) => account.id === requestedAccountId
    );
    if (!accountId) {
        throw Error("This account doesn't exist");
    }
    return accountId;
};

const updateAccountsAfterActivity = (
    accountId,
    amountOfMoney,
    fromWhere = UPDATE_TYPE_CASH
) => {
    const accounts = loadJson("accounts.json");
    const newAccountsArr = accounts.map((account) => {
        if (account.id === accountId) {
            account[fromWhere] += amountOfMoney;
        }

        return account;
    });

    return newAccountsArr;
};

const getRequestedAccount = (userId, accountId) => {
    const accountFromAllAccounts = getAccount(accountId);
    const user = getUserData(userId);
    if (!accountFromAllAccounts) {
        throw Error("This account doesn't exist");
    } else {
        return getAccountFromUser(accountId, user);
    }
};

export const depositCash = ({ userId, accountId, cashToDeposit }) => {
    const { id } = getRequestedAccount(userId, accountId);
    const newAccountsArr = updateAccountsAfterActivity(id, cashToDeposit);
    saveToJson("accounts.json", newAccountsArr);
};

const getMoneyAmount = (accountId, fromWhereToWithdraw) => {
    const accounts = loadJson("accounts.json");
    const accountData = accounts.find((account) => account.id === accountId);

    return accountData[fromWhereToWithdraw];
};

export const withdrawMoney = (
    { userId, accountId, amount },
    fromWhereToWithdraw
) => {
    const { id } = getRequestedAccount(userId, accountId);
    const moneyAmount = getMoneyAmount(id, fromWhereToWithdraw);
    if (moneyAmount - amount <= 0) {
        throw Error("Can't withdraw money");
    }

    const newAccountsArr = updateAccountsAfterActivity(
        id,
        amount * -1,
        fromWhereToWithdraw
    );
    saveToJson("accounts.json", newAccountsArr);
};

export const updateCredit = ({ userId, accountId, amount }) => {
    if (amount < 0) {
        throw Error("Can't update credit with negative amount");
    }
    const { id } = getRequestedAccount(userId, accountId);
    const newAccountsArr = updateAccountsAfterActivity(
        id,
        amount,
        UPDATE_TYPE_CREDIT
    );
    saveToJson("accounts.json", newAccountsArr);
};
