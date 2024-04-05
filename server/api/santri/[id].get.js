import { getSantriByIdOrCardNumber } from "~/server/db/santri";
import { transformSantri } from "~/server/transformers/santri";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  const santri = await getSantriByIdOrCardNumber(id);
  return transformSantri(santri);
});
