import { getCukurById } from "~/server/db/cukur";
import { transformCukur } from "~/server/transformers/cukur";

export default defineEventHandler(async (event) => {
  const cukur = await getCukurById(event.context.params.id);

  return transformCukur(cukur);
});
