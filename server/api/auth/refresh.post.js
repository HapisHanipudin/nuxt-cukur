import { getRefreshTokenByToken } from "~/server/db/refreshToken";
import { getUserById } from "~/server/db/users";
import { transformUser } from "~/server/transformers/user";
import { verifyRefreshToken, generatTokens } from "~/server/utils/jwt";

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, "refreshToken");
  if (!refreshToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      })
    );
  }

  const rToken = await getRefreshTokenByToken(refreshToken);

  if (!rToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      })
    );
  }

  const token = verifyRefreshToken(refreshToken);
  try {
    const user = await getUserById(token.userId);

    const { accessToken } = generatTokens(user);
    return { accessToken: accessToken };
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Something went wrong",
      })
    );
  }
});
