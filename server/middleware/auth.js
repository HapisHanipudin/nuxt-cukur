import UrlPattern from "url-pattern";
import { verifyAccessToken } from "../utils/jwt";
import { sendError } from "h3";
import { getUserById } from "../db/users";
import { transformUser } from "../transformers/user";

export default defineEventHandler(async (event) => {
  const endpoints = ["/api/auth/user"];
  const isHandled = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint);

    return pattern.match(event.node.req.url);
  });

  if (!isHandled) {
    return;
  }

  const token = event.node.req.headers["authorization"]?.split(" ")[1];

  const decoded = verifyAccessToken(token);

  if (!decoded) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      })
    );
  }
  try {
    const user = await getUserById(decoded.userId);
    event.context.auth = transformUser(user);
  } catch (error) {
    return;
  }
});
