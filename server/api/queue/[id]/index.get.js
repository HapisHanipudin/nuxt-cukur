import { getQueueById } from "~/server/db/queue";
import { transformQueue } from "~/server/transformers/queue";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  const queue = await getQueueById(id);

  return transformQueue(queue);
});
