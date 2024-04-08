import { createQueue, getRegQueue, getVIP, getVVIPQueue, getWaitingQueue } from "~/server/db/queue";
import { transformQueue } from "~/server/transformers/queue";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const body = await readBody(event);

  const { santriId, ticketType, payment } = body;

  const data = {
    santriId,
    ticketType,
    payment,
    cukurId: id,
  };

  if (ticketType === "VIP") {
    const VIPQueue = await getVIP(id);
    const queueNum = VIPQueue.length;

    if (queueNum > 5) {
      throw createError({
        statusCode: 400,
        statusMessage: "VIP queue is full",
      });
    }

    data.status = "VIP_WAITING";
    data.queueNumber = queueNum + 1;
  } else {
    const queuenum = await getWaitingQueue(id);
    data.queueNumber = queuenum.length + 1;
  }

  const queue = await createQueue(data);
  return transformQueue(queue);
});
