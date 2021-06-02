import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { sendErrorResponse } from ".";
import { LoginResponse } from "../types";
dotenv.config();

const secretOrPrivateKey = process.env.SECRET || "";
const expiresIn = process.env.SECRET_EXPIRES || "3600000"; // by default 3600000 millisecond ( 60 minutes )

/**
 * Method to generate JWT Token
 * @param identifier identifier to generate token
 * @returns Token
 */
export const generateToken = (identifier: object): string => {
  return jwt.sign({ ...identifier }, secretOrPrivateKey, {
    expiresIn: expiresIn,
    algorithm: "HS256",
  });
};

/**
 * Method to validate JWT Token
 * @param token Token To be validated
 * @returns `true | false`
 */
export const validateToken = (token: string): boolean => {
  let jwtValid = true;
  jwt.verify(token, secretOrPrivateKey, function (err, decoded) {
    if (err) jwtValid = false;
  });
  return jwtValid;
};

// TODO: TYPE THIS ANYs
export const verifyRequestWithJwt = (req: any, res: any, next: any) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json(
      sendErrorResponse<LoginResponse>({
        auth: false,
        message: "No token provided.",
      })
    );

  jwt.verify(
    token,
    secretOrPrivateKey,
    function (err: jwt.VerifyErrors | null, decoded: object | undefined) {
      if (err)
        return res.status(500).json(
          sendErrorResponse<LoginResponse>({
            auth: false,
            message: "Failed to authenticate token.",
            err,
          })
        );

      const bindedDecode = decoded
        ? (decoded as { id: number; username: string })
        : null;
      req.id = bindedDecode && bindedDecode.id; // store user id in request
      req.username = bindedDecode && bindedDecode.username; // store username in request
      next();
    }
  );
};
