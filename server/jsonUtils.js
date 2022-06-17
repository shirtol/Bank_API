import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const loadJson = (jsonLocation) => {
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

export const getUsersAndAccountsJson = () => ({
    users: loadJson("users.json"),
    accounts: loadJson("accounts.json"),
});

export const saveToJson = (jsonLocation, updatedArr) => {
    const dataJson = JSON.stringify(updatedArr);
    fs.writeFileSync(`${__dirname}/${jsonLocation}`, dataJson);
};
