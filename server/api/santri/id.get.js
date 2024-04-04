import { getSantriById } from "~/server/db/santri";
import { transformSantri } from "~/server/transformers/santri";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const santri = await getSantriById(query.id);

  return {
    santri: transformSantri(santri),
  };
});
