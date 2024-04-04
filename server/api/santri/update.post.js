import { updateSantri } from "~/server/db/santri";
import { transformSantri } from "~/server/transformers/santri";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id, name, cardNumber, kelas } = body;

  const santri = await updateSantri(id, { name, cardNumber, kelas });

  return {
    santri: transformSantri(santri),
  };
});
