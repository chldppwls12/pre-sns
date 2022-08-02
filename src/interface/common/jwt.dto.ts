export interface JwtPayloadInfo {
  userId: number;
}

export interface JwtRefreshInfo {
  status: number;
  accessToken: string | null;
}

export interface JwtVerifyInfo {
  isSuccess: boolean;
  message: string;
  userId: number | null;
}
