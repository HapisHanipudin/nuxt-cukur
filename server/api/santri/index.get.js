import { getAllSantri } from "~/server/db/santri";
import { transformSantri } from "~/server/transformers/santri";

export default defineEventHandler(async (event) => {
  const santri = await getAllSantri();

  return santri.map(transformSantri);
});
