import express from "express";
import { getUserData } from "../utils.js";

export const route = express.Router();

route.get("/users/:id", (req, res) => {
    try {
        const { id } = req.params;
        console.log(typeof id);
        const userData = getUserData(id);
        console.log(userData);
        res.status(200).json(userData);
    } catch (err) {
        console.error(err.message);
        res.status(400).json(err.message);
    }
});
