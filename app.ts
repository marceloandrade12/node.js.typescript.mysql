import * as dotenv from "dotenv";
import express from "express";
import { addRoutes } from "./routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes declaration
addRoutes(app);

// swagger route
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
  console.log("Node server started running");
});
