import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@modules/jwtUtil";
import statusCode from "@modules/statusCode";
import { fail } from "@modules/response";

const authJWT = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    const result = verifyAccessToken(token);

    if (result.isSuccess) {
      req.userId = result.userId;
      next();
    } else {
      //토큰 만료 or 유효하지 않은 토큰
      res.status(statusCode.BAD_REQUEST).json(fail(statusCode.BAD_REQUEST, result.message));
    }
  }
};

export default authJWT;
