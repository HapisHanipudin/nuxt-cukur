import { deleteSantri, getSantriById } from "~/server/db/santri";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const santri = await getSantriById(query.id);
  if (!santri) {
    throw createError({
      statusCode: 404,
      statusMessage: "Santri not found",
    });
  }

  await deleteSantri(query.id);

  return {
    status: "done",
  };
});
