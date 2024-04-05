import { deleteSantri, getSantriById } from "~/server/db/santri";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const santri = await getSantriById(id);
  if (!santri) {
    throw createError({
      statusCode: 404,
      statusMessage: "Santri not found",
    });
  }

  await deleteSantri(id);

  return {
    status: "done",
  };
});
