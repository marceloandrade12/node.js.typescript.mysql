import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

export type callbackFunction = (
  err?: mysql.QueryError | NodeJS.ErrnoException | null,
  results?:
    | mysql.RowDataPacket[][]
    | mysql.RowDataPacket[]
    | mysql.OkPacket
    | mysql.OkPacket[]
    | mysql.ResultSetHeader
    | null
) => void;

export const db = {
  query: (queryString: string, sqlArgs: any, callback: callbackFunction) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        return callback(err);
      }

      connection.query(queryString, sqlArgs, function (err, results) {
        connection.release(); // always put connection back in pool after last query
        if (err) {
          return callback(err);
        }
        callback(null, results);
      });
    });
  },
};
