import express, { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
  verifyRequestWithJwt,
} from "../helper";
import * as userModel from "../models/user";
import { User } from "../types";
const userRouter = express.Router();

userRouter.get(
  "/",
  verifyRequestWithJwt,
  async (req: Request, res: Response) => {
    try {
      userModel.findAll((err: Error, users: User[]) => {
        if (err) {
          return res.status(500).json(sendErrorResponse<Error>(err));
        }

        res.status(200).json(sendSuccessResponse<User[]>(users));
      });
    } catch (err: any) {
      res
        .status(500)
        .json(
          sendErrorResponse<any>({ error: "Unexpected Error", message: err })
        );
    }
  }
);

userRouter.post(
  "/",
  verifyRequestWithJwt,
  async (req: Request, res: Response) => {
    try {
      const newUser: User = req.body;
      userModel.create(newUser, (err: Error, id: number) => {
        if (err) {
          return res.status(500).json(sendErrorResponse<Error>(err));
        }

        res.status(200).json(sendSuccessResponse<number>(id));
      });
    } catch (err: any) {
      res
        .status(500)
        .json(
          sendErrorResponse<any>({ error: "Unexpected Error", message: err })
        );
    }
  }
);

userRouter.get(
  "/:id",
  verifyRequestWithJwt,
  async (req: Request, res: Response) => {
    try {
      const id: number = Number(req.params.id);
      userModel.findOneWithoutPassword(id, (err: Error, user: User) => {
        if (err) {
          return res.status(500).json(sendErrorResponse<Error>(err));
        }
        res.status(200).json(sendSuccessResponse<User>(user));
      });
    } catch (err: any) {
      res
        .status(500)
        .json(
          sendErrorResponse<any>({ error: "Unexpected Error", message: err })
        );
    }
  }
);

userRouter.put(
  "/:id",
  verifyRequestWithJwt,
  async (req: Request, res: Response) => {
    try {
      const user: User = req.body;
      user.id = Number.parseInt(req.params.id);
      userModel.update(user, (err: Error) => {
        if (err) {
          return res.status(500).json(sendErrorResponse<Error>(err));
        }

        res.status(200).send(sendSuccessResponse(undefined));
      });
    } catch (err: any) {
      res
        .status(500)
        .json(
          sendErrorResponse<any>({ error: "Unexpected Error", message: err })
        );
    }
  }
);

export { userRouter };
