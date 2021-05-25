import express, { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../helper";
import * as userModel from "../models/user";
import { User } from "../types";
const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  userModel.findAll((err: Error, users: User[]) => {
    if (err) {
      return res.status(500).json(sendErrorResponse<Error>(err));
    }

    res.status(200).json(sendSuccessResponse<User[]>(users));
  });
});

userRouter.post("/", async (req: Request, res: Response) => {
  const newUser: User = req.body;
  userModel.create(newUser, (err: Error, id: number) => {
    if (err) {
      return res.status(500).json(sendErrorResponse<Error>(err));
    }

    res.status(200).json(sendSuccessResponse<number>(id));
  });
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  userModel.findOne(id, (err: Error, user: User) => {
    if (err) {
      return res.status(500).json(sendErrorResponse<Error>(err));
    }
    res.status(200).json(sendSuccessResponse<User>(user));
  });
});

userRouter.put("/:id", async (req: Request, res: Response) => {
  const user: User = req.body;
  userModel.update(user, (err: Error) => {
    if (err) {
      return res.status(500).json(sendErrorResponse<Error>(err));
    }

    res.status(200).send(sendSuccessResponse(undefined));
  });
});

export { userRouter };
