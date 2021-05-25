import express, { Request, Response } from "express";
import {
  generateToken,
  sendErrorResponse,
  sendSuccessResponse,
} from "../helper";
import * as loginModel from "../models/login";
import { LoginResponse } from "../types";

const loginRouter = express.Router();

loginRouter.post("/login", async (req: Request, res: Response) => {
  loginModel.login(
    req.body.user,
    req.body.password,
    (sucess: boolean, userId: number | null) => {
      if (sucess) {
        const id = userId;
        const token = generateToken({ id, username: req.body.user });
        return res.status(200).json(
          sendSuccessResponse<LoginResponse>({
            auth: true,
            token: token,
          })
        );
      }

      res.status(500).json(
        sendErrorResponse<LoginResponse>({
          auth: false,
          token: null,
        })
      );
    }
  );
});

loginRouter.post("/logout", async (req: Request, res: Response) => {
  res.status(200).json(
    sendSuccessResponse<LoginResponse>({
      auth: true,
      token: null,
    })
  );
});

export { loginRouter };
