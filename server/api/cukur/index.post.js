import { createCukur } from "~/server/db/cukur";
import { transformCukur } from "~/server/transformers/cukur";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, tanggal, tukangCukur } = body;

  const newCukur = await createCukur({ name, tanggal, tukangCukur });

  return transformCukur(newCukur);
});
