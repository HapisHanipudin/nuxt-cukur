export const useToastStore = defineStore({
  id: "ToastStore",
  state: () => ({
    show: false,
    type: null,
    message: null,
  }),
  actions: {
    showToast(type, message) {
      this.show = true;
      this.type = type;
      this.message = message;
      setTimeout(() => {
        this.show = false;
        this.type = null;
        this.message = null;
      }, 3000);
    },
  },
});
