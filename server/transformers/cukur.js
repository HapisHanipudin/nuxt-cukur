import human from "human-time";

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
    queue: transformQueue(cukur.queue),
  };
};
