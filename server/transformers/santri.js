export const transformSantri = (santri) => {
  return {
    id: santri.id,
    name: santri.name,
    cardNumber: santri.cardNumber,
    kelas: santri.kelas,
  };
};
