import { userRouter } from "./user.routes";
import * as core from "express-serve-static-core";
import { loginRouter } from "./login.routes";

/**
 * Method to Available Routes to Express App
 * @param app Express Application In Use
 */
export const addRoutes = (app: core.Express): void => {
  app.use("/users", userRouter);
  app.use("/", loginRouter);
};
