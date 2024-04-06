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

export const vipToWaitlist = (id, queueNum) => {
  prisma.queue.updateMany({
    where: {
      queueNumber: {
        gte: queueNum,
      },
    },
    data: {
      queueNumber: {
        increment: 1,
      },
    },
  });

  return prisma.queue.updateMany({
    where: {
      id,
    },
    data: {
      status: "WAITING",
      queueNumber: queueNum,
    },
  });
};
