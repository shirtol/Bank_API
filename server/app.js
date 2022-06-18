import express from "express";
import { route as usersRoute } from "./routes/userController.route.js";
import { route as accountsRoute } from "./routes/accountController.route.js";
import { amountValidation } from "./middlewares/amountValidationMiddlewares.js";
import { userExistValidation } from "./middlewares/userExistValidationMiddlewares.js";
import { accountExistValidation } from "./middlewares/accountExistValidationMiddleware.js";
import * as path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { accountActiveValidation } from "./middlewares/accountActiveValidationMiddleware.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use("/user", userExistValidation);
app.use(["/user/cash", "/user/credit"], accountExistValidation);
app.use(["/user/cash", "/user/credit"], accountActiveValidation);
app.use(["/user/cash", "/user/credit"], amountValidation);

app.use((err, req, res, next) => {
    res.status(400).send(err.message);
});
app.use("/", usersRoute);
app.use("/", accountsRoute);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

app.listen(PORT, (req, res) => {
    console.log(`Listen to port ${PORT}`);
});
