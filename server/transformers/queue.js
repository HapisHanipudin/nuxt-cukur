import human from "human-time";
import { transformSantri } from "./santri";
import { transformCukur } from "./cukur";

export const transformQueue = (queue) => {
  return {
    id: queue.id,
    santri: queue.santri ? transformSantri(queue.santri) : null,
    status: queue.status,
    queueNumber: queue.queueNumber,
    ticket: queue.ticketType,
    payment: queue.paymentStatus,
    waktu: human(queue.updatedAt),
    updatedAt: queue.updatedAt,
  };
};

export const transformQueueList = ({ cukur, queue, vip, onProgress, finished }) => {
  return {
    ...transformCukur(cukur),
    queue: queue.map(transformQueue),
    vip: vip.map(transformQueue),
    onProgress: onProgress.map(transformQueue),
    finished: finished.map(transformQueue),
  };
};
