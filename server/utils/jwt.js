import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  const config = useRuntimeConfig();
  return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  const config = useRuntimeConfig();
  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: "7d",
  });
};

export const generatTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token) => {
  const config = useRuntimeConfig();
  try {
    return jwt.verify(token, config.jwtAccessSecret);
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token) => {
  const config = useRuntimeConfig();
  try {
    return jwt.verify(token, config.jwtRefreshSecret);
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};

export const sendRefreshToken = (event, token) => {
  setCookie(event, "refreshToken", token, {
    httpOnly: true,
    sameSite: true,
  });
};
