import { User } from "../types";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (user: User, callback: Function) => {
  const queryString = "INSERT INTO Users (name, age) VALUES (?, ?)";

  db.query(queryString, [user.name, user.age], (err, result) => {
    if (err) {
      callback(err);
      return;
    }

    const insertId = (<OkPacket>result).insertId;
    callback(null, insertId);
  });
};

export const findOne = (userId: number, callback: Function) => {
  const queryString = `SELECT * FROM Users WHERE id=?`;

  db.query(queryString, userId, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    const row = (<RowDataPacket>result)[0];
    console.log(row);
    if (row) {
      callback(null, row);
    } else {
      callback("User not Found");
    }
  });
};

export const findAll = (callback: Function) => {
  const queryString = `SELECT * FROM Users`;

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
        name: row.name,
        age: row.age,
      };
      users.push(user);
    });
    callback(null, users);
  });
};

export const update = (user: User, callback: Function) => {
  const queryString = `UPDATE User SET name=?, age=? WHERE id=?`;

  db.query(queryString, [user.name, user.age, user.id], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};
