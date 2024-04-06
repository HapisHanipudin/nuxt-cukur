import { prisma } from ".";

export const getAllCukurs = () => {
  return prisma.cukur.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getCukurById = (id) => {
  return prisma.cukur.findUnique({
    where: {
      id,
    },
  });
};

export const createCukur = (cukurData) => {
  return prisma.cukur.create({
    data: {
      ...cukurData,
    },
  });
};

export const updateCukur = (id, cukurData) => {
  return prisma.cukur.update({
    where: {
      id,
    },
    data: {
      ...cukurData,
    },
  });
};

export const deleteCukur = (id) => {
  return prisma.cukur.delete({
    where: {
      id,
    },
  });
};
