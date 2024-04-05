import { createSantri } from "~/server/db/santri";
import { transformSantri } from "~/server/transformers/santri";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, cardNumber, kelas } = body;

  let data = {
    name,
    kelas,
  };

  if (cardNumber !== "") {
    data.cardNumber = cardNumber;
  }

  const santri = await createSantri(data);

  return transformSantri(santri);
});
