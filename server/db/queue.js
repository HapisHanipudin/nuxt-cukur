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

export const getQueueById = (id) => {
  return prisma.queue.findUnique({
    where: {
      id,
    },
    include: {
      santri: true,
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

export const updateQueueWhereValueMoreThan = (id, queueData) => {
  return prisma.queue.updateMany({
    where: {
      cukurId: id,
      status: "WAITING",
      queueNumber: {
        gte: queueData,
      },
    },
    data: {
      queueNumber: {
        increment: 1,
      },
    },
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
    orderBy: {
      queueNumber: "asc",
    },
  });
};

export const getVIP = (id) => {
  return prisma.queue.findMany({
    where: {
      cukurId: id,
      ticketType: "VIP",
    },
    include: {
      santri: true,
    },
    orderBy: {
      queueNumber: "asc",
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
    orderBy: {
      queueNumber: "asc",
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
    orderBy: {
      queueNumber: "asc",
    },
  });
};

export const getOnProgressQueue = (id) => {
  return prisma.queue.findMany({
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

export const updateVipToWaitlist = (id, queueNum) => {
  return prisma.queue.update({
    where: {
      id,
    },
    data: {
      status: "WAITING",
      queueNumber: queueNum,
    },
  });
};
