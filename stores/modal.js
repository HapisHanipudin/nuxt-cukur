export const useModalStore = defineStore({
  id: "ModalStore",
  state: () => ({
    show: false,
    type: null,
  }),
  actions: {
    closeModal() {
      this.show = false;
      this.type = null;
    },
    openModal(type) {
      if (type) {
        this.type = type;
      }
      this.show = true;
    },
  },
});
