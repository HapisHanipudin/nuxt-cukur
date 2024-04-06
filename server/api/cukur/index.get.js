import { getAllCukurs } from "~/server/db/cukur";
import { transformCukur } from "~/server/transformers/cukur";

export default defineEventHandler(async (event) => {
  const allCukurs = await getAllCukurs();
  return allCukurs.map((cukur) => transformCukur(cukur));
});
