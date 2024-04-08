export const useToastStore = defineStore({
  id: "ToastStore",
  state: () => ({
    show: false,
    type: null,
    message: null,
    list: [],
  }),
  actions: {
    showToast(type, message) {
      this.list.push({ type, message });
      setTimeout(() => {
        this.list.shift();
      }, 3000);
    },
  },
});
