import { searchSantriByName } from "~/server/db/santri";
import { transformSantri } from "~/server/transformers/santri";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const santri = await searchSantriByName(query.q);

  return santri.map(transformSantri);
});
