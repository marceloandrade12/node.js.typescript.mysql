import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";
import * as userModel from "../models/user";
import { User } from "../types";

export const login = (
  user: string,
  password: string,
  callback: (sucess: boolean, userId: number | null) => void
) => {
  try {
    userModel.findOneByUsername(user, (err: Error, responseUser: User) => {
      if (err) {
        callback(false, null);
        return;
      }

      if (responseUser.password === password) {
        callback(true, responseUser.id);
      } else {
        callback(false, null);
      }
    });
  } catch {
    callback(false, null);
  }
};
