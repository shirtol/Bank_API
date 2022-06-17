import express from "express";
import { v4 as uuid } from "uuid";
import crypto from "crypto";
import { route } from "./routes/userController.route.js";
import { amountValidation } from "./middlewares/amountValidationMiddlewares.js";
import { userExistValidation } from "./middlewares/userExistValidationMiddlewares.js";
import { accountExistValidation } from "./middlewares/accountExistValidationMiddleware.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use("/user", userExistValidation);
app.use(["/user/cash", "/user/credit"], accountExistValidation);
app.use(["/user/cash", "/user/credit"], amountValidation);

app.use((err, req, res, next) => {
    res.status(400).send(err.message);
});
app.use("/", route);

app.listen(PORT, (req, res) => {
    console.log(`Listen to port ${PORT}`);
});
