import express from "express";
import { UPDATE_TYPE_CASH, UPDATE_TYPE_CREDIT } from "../consts.js";
import {
    getUserData,
    getAllUsers,
    addNewUser,
    depositCash,
    withdrawMoney,
    updateCredit,
    transferMoney,
} from "../userController.js";
import { getAccount } from "../accountUtils.js";

export const route = express.Router();

route.get("/users", (req, res) => {
    try {
        const allUsers = getAllUsers();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

route.get("/user", (req, res) => {
    try {
        const userId = req.headers["user-id"];
        const userData = getUserData(userId);
        res.status(200).json(userData);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

route.post("/users", (req, res) => {
    try {
        const userId = req.headers["user-id"];
        addNewUser(req.body, userId);
        res.status(200).json(getUserData(userId));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

route.put("/user/cash/deposit", (req, res) => {
    try {
        const userId = req.headers["user-id"];
        depositCash(req.body, userId);
        res.status(200).json(getUserData(userId));
    } catch (err) {
        res.status(404).send(err.message);
    }
});

route.put("/user/cash/withdraw", (req, res) => {
    try {
        const userId = req.headers["user-id"];
        withdrawMoney(req.body, userId, UPDATE_TYPE_CASH);
        res.status(200).json(getUserData(userId));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

route.put("/user/credit/withdraw", (req, res) => {
    try {
        const userId = req.headers["user-id"];
        withdrawMoney(req.body, userId, UPDATE_TYPE_CREDIT);
        res.status(200).json(getUserData(userId));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

route.put("/user/credit/update", (req, res) => {
    try {
        const userId = req.headers["user-id"];
        updateCredit(req.body, userId);
        res.status(200).json(getUserData(userId));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

route.put("/user/credit/transfer", (req, res) => {
    try {
        const userId = req.headers["user-id"];
        transferMoney(req.body, userId, UPDATE_TYPE_CREDIT);
        res.status(200).json([
            getAccount(req.body.accountId),
            getAccount(req.body.destinationAccountId),
        ]);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

route.put("/user/cash/transfer", (req, res) => {
    try {
        const userId = req.headers["user-id"];
        transferMoney(req.body, userId, UPDATE_TYPE_CASH);
        res.status(200).json([
            getAccount(req.body.accountId),
            getAccount(req.body.destinationAccountId),
        ]);
    } catch (err) {
        res.status(400).send(err.message);
    }
});
