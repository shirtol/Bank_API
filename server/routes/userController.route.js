import express from "express";
import { getUserData, getAllUsers, addNewUser } from "../utils.js";

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