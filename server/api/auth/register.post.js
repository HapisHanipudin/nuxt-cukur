import { createUser } from "~/server/db/users";
import { transformUser } from "~/server/transformers/user";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password, confirmpassword } = body;

  if (!username || !password || !confirmpassword) {
    throw createError({
      statusCode: 400,
      message: "Please fill out all fields",
    });
  }

  if (password !== confirmpassword) {
    throw createError({
      statusCode: 400,
      message: "Passwords do not match",
    });
  }

  const userData = {
    username,
    password,
  };

  const user = await createUser(userData);
  return transformUser(user);
});
