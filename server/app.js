import express from "express";
import { v4 as uuid } from "uuid";
import crypto from "crypto";
import { route } from "./routes/userController.route.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use("/", route);

const secret = "zxcvbnm,./qwertyuiop[];lkjhgfdsa1029384756";

app.listen(PORT, (req, res) => {
    console.log(`Listen to port ${PORT}`);
    // const id = uuid();
    // const sha = crypto.createHmac("sha256", secret);
    // const hash = sha.update(id).digest("hex");
    // console.log(hash);
});
