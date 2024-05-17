import { createQueue, getRegQueue, getVIP, getVVIPQueue, getWaitingQueue } from "~/server/db/queue";
import { transformQueue } from "~/server/transformers/queue";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const body = await readBody(event);

  const data = {
    ...body,
    cukurId: id,
  };

  if (body.ticketType === "VIP") {
    const VIPQueue = await getVIP(id);
    const queueNum = VIPQueue.length;

    if (queueNum >= 6) {
      throw createError({
        statusCode: 400,
        statusMessage: "VIP queue is full",
      });
    }

    data.status = "VIP_WAITING";
    data.queueNumber = queueNum + 1;
  } else {
    const queuenum = await getWaitingQueue(id);
    if (queuenum && queuenum.length > 0) {
      data.queueNumber = queuenum.pop().queueNumber + 1;
    } else {
      data.queueNumber = 1;
    }
  }

  const queue = await createQueue(data);
  return transformQueue(queue);
});
