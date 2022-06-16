import express from "express";

export const route = express.Router();

route.get("/users", (req, res) => {
    try {
        console.log(req.body);
        res.status(200).send(req.body.id);
    } catch (err) {
        res.status(400).send(e.message);
    }
});
