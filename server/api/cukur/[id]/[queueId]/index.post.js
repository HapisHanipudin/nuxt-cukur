import { getCukurById } from "~/server/db/cukur";
import { getOnProgressQueue, getQueueById, getVVIPQueue, getWaitingQueue, updateQueue, updateQueueWhereValueMoreThan, updateVipToWaitlist } from "~/server/db/queue";

export default defineEventHandler(async (event) => {
  const cukurId = event.context.params.id;
  const queueId = event.context.params.queueId;

  const cukur = await getCukurById(cukurId);
  const res = await getQueueById(queueId);
  const queues = await getWaitingQueue(cukurId);
  const vip = await getVVIPQueue(cukurId);
  const progress = await getOnProgressQueue(cukurId);

  if (res.status === "VIP_WAITING" && res.ticketType === "VIP") {
    let queueNum = queues[0].queueNumber;

    const lastVipQueue = queues.filter((q) => q.ticketType === "VIP").pop();
    if (lastVipQueue) {
      queueNum = lastVipQueue.queueNumber + 1;
    }

    const updated = await updateQueueWhereValueMoreThan(cukurId, queueNum);

    const vip = await updateVipToWaitlist(queueId, queueNum);

    return {
      updated,
      vip,
    };
  } else if (res.status == "WAITING" && res.id === queues[0].id && progress.length < cukur.tukangCukur) {
    const updated = await updateQueue(queueId, {
      status: "PROGRESS",
    });
    return {
      updated,
    };
  } else if (res.status == "PROGRESS") {
    const updatedAt = new Date(res.updatedAt);
    const durasiCukur = (new Date() - updatedAt) / 1000;

    const durasiCukurStr = durasiCukur < 60 ? `${Math.floor(durasiCukur)} Detik` : durasiCukur < 3600 ? `${Math.floor(durasiCukur / 60)} Menit` : `${Math.floor(durasiCukur / 3600)} Jam`;

    const updated = await updateQueue(queueId, {
      status: "FINISHED",
      durasiCukur: durasiCukurStr,
    });
    return {
      updated,
    };
  }
  return {
    hllo: "world",
  };
});
