import { getSantriByCardNumber, getSantriById } from "~/server/db/santri";
import { transformSantri } from "~/server/transformers/santri";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const santri = await getSantriByCardNumber(query.card);

  return {
    santri: transformSantri(santri),
  };
});
