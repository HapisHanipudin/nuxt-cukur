import { getQueueById, getWaitingQueue, updateQueue, updateQueueWhereValueMoreThan } from "~/server/db/queue";

export default defineEventHandler(async (event) => {
  const cukurId = event.context.params.id;
  const queueId = event.context.params.queueId;

  const queues = await getWaitingQueue(cukurId);

  const queue = await getQueueById(queueId);

  if (queue.failed > 3) {
    const update = await updateQueueWhereValueMoreThan(cukurId, queue.queueNumber, {
      queueNumber: {
        decrement: 1,
      },
    });
    const failed = await updateQueue(queueId, {
      queueNumber: queues[queues.length - 1].queueNumber,
    });
    return {
      action: "FAILED",
      type: "warning",
      message: "Diturunkan ke antrian paling bawah",
      result: {
        failed,
        update,
      },
    };
  } else {
    const newQueueNum = queue.queueNumber + 2;
    const failed = await updateQueue(queueId, {
      failed: queue.failed + 1,
      queueNumber: newQueueNum,
    });
    const updated = await updateQueueWhereValueMoreThan(
      cukurId,
      queue.queueNumber,
      {
        queueNumber: {
          decrement: 1,
        },
      },
      newQueueNum
    );
    return {
      action: "FAILED",
      type: "warning",
      message: "Cukur gagal diproses",
      result: {
        failed,
        updated,
      },
    };
  }
});
