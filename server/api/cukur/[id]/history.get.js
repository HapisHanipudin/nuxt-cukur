import { getCukurById } from "~/server/db/cukur";
import { getCukurWithQueueById, getREG, getVIP } from "~/server/db/queue";
import { transformCukur } from "~/server/transformers/cukur";
import { transformQueue } from "~/server/transformers/queue";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  const cukur = await getCukurById(id);
  const queues = await getCukurWithQueueById(id);
  const vip = await getVIP(id);
  const reg = await getREG(id);

  return {
    cukur: transformCukur(cukur),
    queues: queues.queue.map(transformQueue),
    vip: vip.map(transformQueue),
    reg: reg.map(transformQueue),
  };
});
