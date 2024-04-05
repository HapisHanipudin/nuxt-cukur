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

export const searchSantriByName = (name) => {
  return prisma.santri.findMany({
    where: {
      name: {
        mode: "insensitive",
        contains: name,
      },
    },
  });
};

export const getSantriByIdOrCardNumber = (idOrCardNumber) => {
  return prisma.santri.findFirst({
    where: {
      OR: [{ id: { equals: idOrCardNumber } }, { cardNumber: { equals: idOrCardNumber } }],
    },
  });
};
