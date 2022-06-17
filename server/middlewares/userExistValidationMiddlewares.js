import { getUsersAndAccountsJson } from "../jsonUtils.js";

export const userExistValidation = (req, res, next) => {
    const { users } = getUsersAndAccountsJson();
    const userId = req.headers["user-id"];
    const requestedUser = users.find((user) => user.id === userId);
    if (!requestedUser) {
        throw Error("This user doesn't exist");
    }
    next();
};
