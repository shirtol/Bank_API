import express from "express";
import { v4 as uuid } from "uuid";
import crypto from "crypto";
import { route } from "./routes/userController.route.js";
import { amountValidation } from "./middlewares/middlewares.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(["/users/cash", "/users/credit"], amountValidation); //I used middleware only to understand the concept (I know these checks should be inside the corresponding endpoint)
app.use((err, req, res, next) => {
    res.status(400).send(err.message);
});
app.use("/", route);

app.listen(PORT, (req, res) => {
    console.log(`Listen to port ${PORT}`);
});
