import { createSantri } from "~/server/db/santri";
import { transformSantri } from "~/server/transformers/santri";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, cardNumber, kelas } = body;

  const santri = await createSantri({ name, cardNumber, kelas });

  return {
    santri: transformSantri(santri),
  };
});
