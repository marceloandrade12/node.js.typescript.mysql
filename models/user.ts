import { User } from "../types";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (user: User, callback: Function) => {
  const queryString = "INSERT INTO users (username, password) VALUES (?, ?)";

  db.query(queryString, [user.username, user.password], (err, result) => {
    if (err) {
      callback(err);
      return;
    }

    const insertId = (<OkPacket>result).insertId;
    callback(null, insertId);
  });
};

export const findOneByUsername = (username: string, callback: Function) => {
  const queryString = `SELECT * FROM users WHERE username=?`;

  db.query(queryString, username, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    const user = (<RowDataPacket>result)[0] as User;
    if (user) {
      callback(null, user);
    } else {
      callback("User not Found");
    }
  });
};

export const findOne = (userId: number, callback: Function) => {
  const queryString = `SELECT * FROM users WHERE id=?`;

  db.query(queryString, userId, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    const user = (<RowDataPacket>result)[0] as User;
    if (user) {
      callback(null, user);
    } else {
      callback("User not Found");
    }
  });
};

export const findOneWithoutPassword = (userId: number, callback: Function) => {
  findOne(userId, (err: any, result: User) => {
    if (err) {
      callback(err);
      return;
    }
    if (result) {
      delete result.password;
      callback(null, result);
    }
  });
};

export const findAll = (callback: Function) => {
  const queryString = `SELECT * FROM users`;

  db.query(queryString, null, (err, result) => {
    if (err) {
      callback(err);
      return;
    }

    const rows = <RowDataPacket[]>result;
    const users: User[] = [];

    rows.forEach((row) => {
      const user: User = {
        id: row.id,
        username: row.username,
        created_at: row.created_at,
      };
      users.push(user);
    });
    callback(null, users);
  });
};

export const update = (user: User, callback: Function) => {
  const queryString = `UPDATE Users SET password=? WHERE id=?`;

  db.query(queryString, [user.password, user.id], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
};
