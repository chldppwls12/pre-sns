const jwtVerifyStatus = {
  success: 1,
  tokenIsExpired: 2,
  tokenIsInvalid: 3,
};

const jwtRefreshStatus = {
  getNewToken: 1,
  tokenIsExpired: 2,
  tokenNotExpired: 3,
  notAuthorized: 4,
};

export { jwtVerifyStatus, jwtRefreshStatus };
