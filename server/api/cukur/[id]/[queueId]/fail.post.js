import { getQueueById } from "~/server/db/queue";

export default defineEventHandler(async (event) => {
  const cukurId = event.context.params.id;
  const queueId = event.context.params.queueId;

  const queue = await getQueueById(queueId);

  if (queue.failed > 3) {
    throw createError({
      statusCode: 400,
      statusMessage: "Max failed reached",
    });
  }
});
