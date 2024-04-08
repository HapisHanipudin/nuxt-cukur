import { getQueueById, getWaitingQueue, updateQueue, updateQueueBetween, updateQueueWhereValueMoreThan } from "~/server/db/queue";

export default defineEventHandler(async (event) => {
  const cukurId = event.context.params.id;
  const queueId = event.context.params.queueId;

  const queues = await getWaitingQueue(cukurId);

  const queue = await getQueueById(queueId);

  if (queue.failed > 1) {
    const lastQueue = queues.pop();
    const newQueueNum = lastQueue.queueNumber;
    const updated = await updateQueueWhereValueMoreThan(cukurId, queue.queueNumber, {
      queueNumber: {
        decrement: 1,
      },
    });
    const failed = await updateQueue(queueId, {
      failed: queue.failed + 1,
      queueNumber: newQueueNum,
    });
    return {
      action: "FAILED",
      type: "warning",
      message: "Diturunkan ke antrian paling bawah",
      result: {
        newQueueNum,
        failed,
        updated,
      },
    };
  } else {
    const update = await updateQueueBetween(
      cukurId,
      queue.queueNumber,
      queue.queueNumber + 3,
      {
        queueNumber: {
          decrement: 1,
        },
      },
      queues[queues.length - 1].queueNumber
    );
    const failed = await updateQueue(queueId, {
      failed: queue.failed + 1,
      queueNumber: queue.queueNumber + 2,
    });
    return {
      action: "FAILED",
      type: "warning",
      message: "Cukur gagal diproses, turun 2 antrian",
      result: {
        failed,
        update,
      },
    };
  }
});
