import { createRefreshToken } from "~/server/db/refreshToken";
import { getUserByUsername } from "~/server/db/users";
import { generatTokens, sendRefreshToken } from "~/server/utils/jwt";
import bcrypt from "bcrypt";
import { transformUser } from "~/server/transformers/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: "Please fill out all fields",
    });
  }
  const user = await getUserByUsername(username);

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "User not found",
    });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw createError({
      statusCode: 401,
      message: "Invalid credentials",
    });
  }
  const { accessToken, refreshToken } = generatTokens(user);

  await createRefreshToken(user.id, refreshToken);

  sendRefreshToken(event, refreshToken);
  return {
    accessToken,
    user: transformUser(user),
  };
});
