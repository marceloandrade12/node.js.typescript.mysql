import * as dotenv from "dotenv";
import express from "express";
import { addRoutes } from "./routes";

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes declaration
addRoutes(app);

app.listen(process.env.PORT, () => {
  console.log("Node server started running");
});
