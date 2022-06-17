import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";

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

const getAccountFromUser = (accountId, user) =>
    user.accounts.find((account) => account.id === accountId);

const updateAccountsAfterActivity = (
    accountId,
    amountOfMoney,
    activity,
    fromWhere = "cash"
) => {
    const accounts = loadJson("accounts.json");
    const newAccountsArr = accounts.map((account) => {
        if (account.id === accountId) {
            if (activity === "deposit") {
                account[fromWhere] += amountOfMoney;
            } else if (activity === "withdraw") {
                account[fromWhere] -= amountOfMoney;
            }
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
    const requestedAccount = getRequestedAccount(userId, accountId);
    if (!requestedAccount) {
        throw Error("This account doesn't exist");
    } else {
        const newAccountsArr = updateAccountsAfterActivity(
            accountId,
            cashToDeposit,
            "deposit"
        );
        saveToJson("accounts.json", newAccountsArr);
    }
};

const getMoneyAmount = (accountId, fromWhereToWithdraw) => {
    const accounts = loadJson("accounts.json");
    const accountData = accounts.find((account) => account.id === accountId);
    return accountData[fromWhereToWithdraw];
};

export const withdrawMoney = ({
    userId,
    accountId,
    amountOfMoneyToWithdraw,
    fromWhereToWithdraw,
}) => {
    const requestedAccount = getRequestedAccount(userId, accountId);
    if (!requestedAccount) {
        throw Error("This account doesn't exist");
    } else {
        const moneyAmount = getMoneyAmount(accountId, fromWhereToWithdraw);
        if (moneyAmount - amountOfMoneyToWithdraw <= 0) {
            throw Error("Can't withdraw money");
        } else {
            const newAccountsArr = updateAccountsAfterActivity(
                accountId,
                amountOfMoneyToWithdraw,
                "withdraw",
                fromWhereToWithdraw
            );
            saveToJson("accounts.json", newAccountsArr);
        }
    }
};
