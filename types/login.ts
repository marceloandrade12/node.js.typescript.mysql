import * as jwt from "jsonwebtoken";

export interface LoginResponse {
  auth: boolean;
  token?: string | null;
  expiresIn?: string | null;
  expiresInUnit?: string | null;
  message?: string | null;
  err?: jwt.VerifyErrors | null;
}
