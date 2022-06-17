import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";

const __dirname = dirname(fileURLToPath(import.meta.url));

const loadJson = (jsonLocation) => {
    try {
        console.log(__dirname);
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

export const depositCash = (userId, accountId, amountOfCashToDeposit) => {
    const accounts = loadJson("accounts.json");
    const user = getUserData(userId);
    const requestedAccount = user.accounts.find(
        (account) => account.id === accountId
    );
    if (!requestedAccount) {
        throw Error("This account doesn't exist");
    } else {
        const newAccountsArr = accounts.map((account) => {
            if (account.id === accountId) {
                account.cash += amountOfCashToDeposit;
            }
            return account;
        });
        saveToJson("accounts.json", newAccountsArr);
    }
};
