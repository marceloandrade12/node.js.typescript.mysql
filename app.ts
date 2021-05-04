import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { userRouter } from "./routes";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Node server started running");
});
