import { updateQueue, vipToWaitlist } from "~/server/db/queue";
import { transformQueue } from "~/server/transformers/queue";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const { num } = getQuery(event);

  const vip = await vipToWaitlist(id, num);

  return transformQueue(vip);
});
