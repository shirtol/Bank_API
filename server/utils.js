import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

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

export const getUserData = (id) => {
    const users = loadJson("users.json");
    const accounts = loadJson("accounts.json");
    const requestedUser = users.find((user) => user.id === id);

    if (!requestedUser) {
        throw Error({ status: 401, message: "This user doesn't exist" });
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
