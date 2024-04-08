<template>
  <div class="w-full text-gold-600 gap-4 flex justify-center items-center flex-col">
    <h2 class="font-bold text-2xl">Tambahkan Data Cukur</h2>
    <form class="flex flex-col w-full gap-3" @submit.prevent="submitSantri">
      <UIInput class="bg-neutral-800" label="Tanggal" type="date" v-model="tanggalFormatted" />
      <UIInput class="bg-neutral-800" label="Jumlah Tukang Cukur" type="number" v-model="tukangCukur" />
      <UIButton liquid font="bold">Submit</UIButton>
    </form>
  </div>
</template>

<script setup>
import { useModalStore } from "~/stores/modal";
import { useToastStore } from "~/stores/toast";
import { useEmitter } from "~/composables/useEmitter";

const { $emit } = useEmitter();
const toast = useToastStore();
const modal = useModalStore();

const tanggal = ref(new Date());
const tukangCukur = ref(1);
const tanggalFormatted = computed({
  get() {
    return tanggal.value.toISOString().split("T")[0];
  },
  set(value) {
    tanggal.value = new Date(value);
  },
});

const submitSantri = async () => {
  const data = {
    name:
      "Cukur pada " +
      tanggal.value.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Jakarta",
      }),
    tukangCukur: parseInt(tukangCukur.value),
    tanggal: tanggal.value,
  };
  console.log(data);
  const cukur = await $fetch("/api/cukur", {
    method: "POST",
    body: data,
  });
  if (cukur) {
    $emit("addCukur", cukur);
    modal.closeModal();
    toast.showToast("success", "Cukur Ditambahkan");
  }
};
</script>
