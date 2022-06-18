import express from "express";
import { filterByAmount } from "../accountController.js";
import { UPDATE_TYPE_CASH, UPDATE_TYPE_CREDIT } from "../consts.js";

export const route = express.Router();

route.get("/account/filter/cash", (req, res) => {
    try {
        const filteredAccounts = filterByAmount(req.body, UPDATE_TYPE_CASH);
        res.status(200).json(filteredAccounts);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

route.get("/account/filter/credit", (req, res) => {
    try {
        const filteredAccounts = filterByAmount(req.body, UPDATE_TYPE_CREDIT);
        res.status(200).json(filteredAccounts);
    } catch (err) {
        res.status(400).send(err.message);
    }
});
