import { prisma } from ".";

export const getCukurWithQueueById = (id) => {
  return prisma.cukur.findUnique({
    where: {
      id,
    },
    include: {
      queue: {
        include: {
          santri: true,
        },
      },
    },
  });
};

export const createQueue = (queueData) => {
  return prisma.queue.create({
    data: {
      ...queueData,
    },
  });
};

export const updateQueue = (id, queueData) => {
  return prisma.queue.update({
    where: {
      id,
    },
    data: {
      ...queueData,
    },
  });
};

export const updateQueueWhereValueMoreThan = (value, queueData) => {
  return prisma.queue.updateMany({
    where: {
      queueNumber: {
        gt: value,
      },
    },
    data: (queue) => ({
      queueNumber: queue.queueNumber + 1,
    }),
  });
};

export const deleteQueue = (id) => {
  return prisma.queue.delete({
    where: {
      id,
    },
  });
};

export const getVVIPQueue = (id) => {
  return prisma.queue.findMany({
    where: {
      cukurId: id,
      ticketType: "VIP",
      status: "VIP_WAITING",
    },
    include: {
      santri: true,
    },
  });
};

export const getRegQueue = (id) => {
  return prisma.queue.findMany({
    where: {
      cukurId: id,
      ticketType: "REGULER",
      status: "WAITING",
    },
    include: {
      santri: true,
    },
  });
};

export const getWaitingQueue = (id) => {
  return prisma.queue.findMany({
    where: {
      cukurId: id,
      status: "WAITING",
    },
    include: {
      santri: true,
    },
  });
};

export const getOnProgressQueue = (id) => {
  return prisma.queue.findFirst({
    where: {
      cukurId: id,
      status: "PROGRESS",
    },
    include: {
      santri: true,
    },
  });
};

export const getFinishedQueue = (id) => {
  return prisma.queue.findMany({
    where: {
      cukurId: id,
      status: "FINISHED",
    },
    include: {
      santri: true,
    },
  });
};
