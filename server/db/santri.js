import { prisma } from ".";

export const createSantri = (santriData) => {
  return prisma.santri.create({ data: santriData });
};

export const updateSantri = (id, santriData) => {
  return prisma.santri.update({ where: { id }, data: santriData });
};

export const deleteSantri = (id) => {
  return prisma.santri.delete({ where: { id } });
};

export const getAllSantri = () => {
  return prisma.santri.findMany();
};

export const getSantriById = (id) => {
  return prisma.santri.findUnique({ where: { id } });
};

export const getSantriByCardNumber = (cardNumber) => {
  return prisma.santri.findUnique({ where: { cardNumber } });
};

export const searchSantriByName = (name) => {
  return prisma.santri.findMany({
    where: {
      name: {
        search: name,
      },
    },
  });
};
