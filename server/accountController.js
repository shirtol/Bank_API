import { getUsersAndAccountsJson } from "./jsonUtils.js";
import { isNumberOrThrow, isBoolOrThrow } from "../utils.js";

//isAbove=true: equal to or above/ below the threshold.
export const filterByAmount = ({ threshold, isAbove }, filterBy) => {
    isNumberOrThrow(threshold);
    isBoolOrThrow(isAbove);
    const { accounts } = getUsersAndAccountsJson();
    const filteredAccounts = accounts.filter((account) => {
        if (isAbove) {
            return account[filterBy] >= threshold;
        } else {
            return account[filterBy] < threshold;
        }
    });
    return filteredAccounts;
};
