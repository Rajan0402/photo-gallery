const jwtExpiresMilliSecondForAccessToken =
  process.env.JWT_EXPIRES_MILLISECONDS;
const jwtExpiresMilliSecondForRefreshToken =
  process.env.JWT_REFRESH_TOKEN_EXPIRES_MILLISECONDS;

export const saltOrRounds = 10;

export const HTTP_ONLY_COOKIE = {
  maxAge: Number(jwtExpiresMilliSecondForAccessToken), // cookie lives same amount of time as jwt
  httpOnly: true,
  sameSite: true,
  signed: true,
  expires: false,
  // domain,
};

export const HTTP_ONLY_REFRESH_TOKEN_COOKIE = {
  maxAge: Number(jwtExpiresMilliSecondForRefreshToken), // cookie lives same amount of time as jwt
  httpOnly: true,
  sameSite: true,
  signed: true,
  expires: false,
  // domain,
};
