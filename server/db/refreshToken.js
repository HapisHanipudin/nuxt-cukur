import { prisma } from ".";

export const createRefreshToken = async (userId, token) => {
  const refreshToken = await prisma.refreshToken.create({
    data: {
      userId,
      token,
    },
  });
  return refreshToken;
};
export const getRefreshTokenByToken = (token) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
};

export const removeRefreshToken = (token) => {
  return prisma.refreshToken.delete({
    where: {
      token,
    },
  });
};
