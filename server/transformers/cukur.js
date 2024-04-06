import human from "human-time";
import { transformQueue } from "./queue";

export const transformCukur = (cukur) => {
  return {
    id: cukur.id,
    name: cukur.name,
    waktu: human(cukur.tanggal),
  };
};

export const transformCukurWithQueue = (cukur) => {
  return {
    cukur: transformCukur(cukur),
    queue: cukur.queue.map(transformQueue),
  };
};
