import { getCukurById } from "~/server/db/cukur";
import { getRegQueue, getVVIPQueue, getOnProgressQueue } from "~/server/db/queue";
import { transformCukur } from "~/server/transformers/cukur";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  const cukur = await getCukurById(id);

  const queue = await getRegQueue(id);
  const vip = await getVVIPQueue(id);
  const progress = await getOnProgressQueue(id);

  return {
    cukur: transformCukur(cukur),
    onProgress: progress.map(transformCukur),
    vip: vip.map(transformCukur),
    queue: queue.map(transformCukur),
  };
});
