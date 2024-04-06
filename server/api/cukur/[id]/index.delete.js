import { getCukurById, deleteCukur } from "~/server/db/cukur";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const santri = await getCukurById(id);
  if (!santri) {
    throw createError({
      statusCode: 404,
      statusMessage: "Santri not found",
    });
  }

  await deleteCukur(id);

  return {
    status: "done",
  };
});
