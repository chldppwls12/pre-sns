import "dotenv/config";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import logger from "@config/logger";
import redisClient from "@config/redis";
import { JwtPayloadInfo, JwtRefreshInfo, JwtVerifyInfo } from "@interface/common/jwt.dto";
import { jwtRefreshStatus } from "@modules/constants";
import message from "./message";

const jwtSecret = process.env.JWT_SECRET as string;

//Access Token 발급
const signAccessToken = (userId: number) => {
  const payload: JwtPayloadInfo = {
    userId,
  };

  return jwt.sign(payload, jwtSecret, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};

//Refresh Token 발급
const signRefreshToken = () => {
  return jwt.sign({}, jwtSecret, {
    algorithm: "HS256",
    expiresIn: "14d",
  });
};

//Access Token 검증
const verifyAccessToken = (token: string) => {
  let result: JwtVerifyInfo;
  try {
    const decoded: any = jwt.verify(token, jwtSecret);
    result = {
      isSuccess: true,
      userId: decoded.userId,
      message: message.SUCCESS,
    };

    return result;
  } catch (err: any) {
    //err.message = jwt expired || invalid token
    if (err.message.includes("expired")) {
      result = {
        isSuccess: false,
        userId: null,
        message: message.EXPIRED_TOKEN,
      };
    }
    result = {
      isSuccess: false,
      userId: null,
      message: message.INVALID_TOKEN,
    };

    return result;
  }
};

//Refresh Token 검증
const verifyRefreshToken = async (token: string, userId: number) => {
  const getAsync = promisify(redisClient.get).bind(redisClient);

  try {
    const data = await getAsync(String(userId));
    if (token === data) {
      try {
        jwt.verify(token, jwtSecret);
        return true;
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    logger.error(err);
    return false;
  }
};

/*
  Access Token 재발급

  토큰 재발급 시나리오
  1. Access Token 만료, Refresh Token 만료x => 새로운 Access Token 발급
  2. Access Token 만료, Refresh Token 만료 => 새로 로그인 필요
  3. Access Token 만료x => Refresh 필요x
*/
const resignAccessToken = async (accessToken: string, refreshToken: string) => {
  const accessTokenResult = verifyAccessToken(accessToken);
  const decoded: any = jwt.decode(accessToken);

  let result: JwtRefreshInfo;

  //Access Token 검증 실패 혹은 디코딩 결과 없음 => 권한 없음 반환
  if (!accessTokenResult.isSuccess || decoded === null) {
    result = {
      status: jwtRefreshStatus.notAuthorized,
      accessToken: null,
    };

    return result;
  }

  const { userId } = decoded;
  const refreshTokenResult = await verifyRefreshToken(refreshToken, userId);

  //3. Access Token 아직 유효
  result = {
    status: jwtRefreshStatus.tokenNotExpired,
    accessToken: null,
  };

  if (accessTokenResult.message === message.EXPIRED_TOKEN) {
    //2. Refresh Token 만료 전 => 새로 로그인 필요
    if (refreshTokenResult) {
      result = {
        status: jwtRefreshStatus.tokenIsExpired,
        accessToken: null,
      };
    }
    //1. Refresh Token도 만료 => 새로운 Access Token 발급
    else {
      const newAccessToken = signAccessToken(userId);
      result = {
        status: jwtRefreshStatus.getNewToken,
        accessToken: newAccessToken,
      };
    }
  }

  return result;
};

export {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  resignAccessToken,
};
