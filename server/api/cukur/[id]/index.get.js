import { getCukurById } from "~/server/db/cukur";
import { getRegQueue, getVVIPQueue, getOnProgressQueue, getWaitingQueue } from "~/server/db/queue";
import { transformCukur } from "~/server/transformers/cukur";
import { transformQueue } from "~/server/transformers/queue";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  const cukur = await getCukurById(id);

  const queue = await getWaitingQueue(id);
  const vip = await getVVIPQueue(id);
  const progress = await getOnProgressQueue(id);

  return {
    ...transformCukur(cukur),
    onProgress: progress ? progress.map(transformQueue) : [],
    vip: vip.map(transformQueue),
    queue: queue.map(transformQueue),
  };
});
