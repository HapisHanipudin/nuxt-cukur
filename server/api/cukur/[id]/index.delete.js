import { getCukurById, deleteCukur } from "~/server/db/cukur";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const cukur = await getCukurById(id);
  if (!cukur) {
    throw createError({
      statusCode: 404,
      statusMessage: "Cukur not found",
    });
  }

  await deleteCukur(id);

  return {
    status: "done",
  };
});
