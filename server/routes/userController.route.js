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
    getAccount,
} from "../userController.js";

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
        const { id } = req.body;
        addNewUser(id);
        res.status(200).json(getAllUsers());
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
        withdrawMoney(req.body, UPDATE_TYPE_CASH);
        res.status(200).json(getUserData(req.body.userId));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

route.put("/user/credit/withdraw", (req, res) => {
    try {
        withdrawMoney(req.body, UPDATE_TYPE_CREDIT);
        res.status(200).json(getUserData(req.body.userId));
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
        transferMoney(req.body, UPDATE_TYPE_CREDIT);
        res.status(200).json([
            getAccount(req.body.withdrawAccountId),
            getAccount(req.body.depositAccountId),
        ]);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

route.put("/user/cash/transfer", (req, res) => {
    try {
        transferMoney(req.body, UPDATE_TYPE_CASH);
        res.status(200).json([
            getAccount(req.body.withdrawAccountId),
            getAccount(req.body.depositAccountId),
        ]);
    } catch (err) {
        res.status(400).send(err.message);
    }
});
