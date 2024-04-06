import human from "human-time";
import { transformSantri } from "./santri";

export const transformQueue = (queue) => {
  return {
    id: queue.id,
    santri: transformSantri(queue.santri),
    status: queue.status,
    queueNumber: queue.queueNumber,
    ticket: queue.ticketType,
    payment: queue.paymentStatus,
    updated: human(queue.updatedAt),
  };
};

export const transformQueueList = ({ cukur, queue, vip, onProgress, finished }) => {
  return {
    id: cukur.id,
    name: cukur.name,
    Waktu: human(cukur.tanggal),
    queue: queue.map(transformQueue),
    vip: vip.map(transformQueue),
    onProgress: onProgress.map(transformQueue),
    finished: finished.map(transformQueue),
  };
};
