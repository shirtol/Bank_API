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
} from "../utils.js";

export const route = express.Router();

route.get("/users", (req, res) => {
    try {
        const allUsers = getAllUsers();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

route.get("/users/:id", (req, res) => {
    try {
        const { id } = req.params;
        console.log(typeof id);
        const userData = getUserData(id);
        console.log(userData);
        res.status(200).json(userData);
    } catch (err) {
        console.error(err.message);
        res.status(404).send(err.message);
    }
});

route.post("/users", (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        addNewUser(id);
        res.status(200).json(getAllUsers());
    } catch (err) {
        res.status(400).send(err.message);
    }
});

route.put("/users/cash/deposit", (req, res) => {
    try {
        depositCash(req.body);
        res.status(200).json(getUserData(req.body.userId));
    } catch (err) {
        res.status(404).send(err.message);
    }
});

route.put("/users/cash/withdraw", (req, res) => {
    try {
        withdrawMoney(req.body, UPDATE_TYPE_CASH);
        res.status(200).json(getUserData(req.body.userId));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

route.put("/users/credit/withdraw", (req, res) => {
    try {
        withdrawMoney(req.body, UPDATE_TYPE_CREDIT);
        res.status(200).json(getUserData(req.body.userId));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

route.put("/users/credit/update", (req, res) => {
    try {
        updateCredit(req.body);
        res.status(200).json(getUserData(req.body.userId));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

route.put("/users/credit/transfer", (req, res) => {
    try {
        transferMoney(req.body, UPDATE_TYPE_CREDIT);
        res.status(200).json({
            ...getAccount(req.body.withdrawAccountId),
            ...getAccount(req.body.depositAccountId),
        });
        res.status(200).json(getUserData(req.body.userId));
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});

route.put("/users/cash/transfer", (req, res) => {
    try {
        transferMoney(req.body, UPDATE_TYPE_CASH);
        res.status(200).json({
            ...getAccount(req.body.withdrawAccountId),
            ...getAccount(req.body.depositAccountId),
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});
