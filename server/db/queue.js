import { prisma } from ".";

export const getCukurWithQueueById = (id) => {
  return prisma.cukur.findUnique({
    where: {
      id,
    },
    include: {
      queue: {
        orderBy: {
          queueNumber: "asc",
        },
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

export const updateQueueWhereValueMoreThan = (id, num, queueData) => {
  return prisma.queue.updateMany({
    where: {
      cukurId: id,
      status: "WAITING",
      queueNumber: {
        gte: num,
      },
    },
    data: {
      ...queueData,
    },
  });
};

export const updateQueueBetween = (id, num1, num2, queueData) => {
  return prisma.queue.updateMany({
    where: {
      status: "WAITING",
      queueNumber: {
        gt: num1,
        lt: num2,
      },
    },
    data: {
      ...queueData,
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

export const getREG = (id) => {
  return prisma.queue.findMany({
    where: {
      cukurId: id,
      ticketType: "REGULER",
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
