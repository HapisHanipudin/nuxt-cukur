import { getAllSantri, searchSantriByName } from "~/server/db/santri";
import { transformSantri } from "~/server/transformers/santri";

export default defineEventHandler(async (event) => {
  const { q } = getQuery(event);

  if (q) {
    const santri = await searchSantriByName(q);
    return santri.map(transformSantri);
  } else {
    const santri = await getAllSantri();
    return santri.map(transformSantri);
  }
});
