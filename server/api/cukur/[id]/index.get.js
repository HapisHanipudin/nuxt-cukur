import { getCukurById } from "~/server/db/cukur";
import { getRegQueue, getVVIPQueue, getOnProgressQueue } from "~/server/db/queue";
import { transformCukur } from "~/server/transformers/cukur";
import { transformQueue } from "~/server/transformers/queue";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  const cukur = await getCukurById(id);

  const queue = await getRegQueue(id);
  const vip = await getVVIPQueue(id);
  const progress = await getOnProgressQueue(id);

  return {
    ...transformCukur(cukur),
    onProgress: progress ? transformQueue(progress) : null,
    vip: vip.map(transformQueue),
    queue: queue.map(transformQueue),
  };
});
