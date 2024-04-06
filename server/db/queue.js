import { prisma } from ".";

export const getAllQueue = () => {
  return prisma.queue.findMany();
};

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
      status: "WAITING",
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
  });
};

getOnProgressQueue = (id) => {
  return prisma.queue.findMany({
    where: {
      cukurId: id,
      status: "PROGRESS",
    },
  });
};

getFinishedQueue = (id) => {
  return prisma.queue.findMany({
    where: {
      cukurId: id,
      status: "FINISHED",
    },
  });
};
