import * as dotenv from "dotenv";
import express from "express";
import { userRouter } from "./routes";

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes declaration
app.use("/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Node server started running");
});
