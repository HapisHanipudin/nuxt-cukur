<template>
  <div class="w-full text-gold-600 gap-4 flex justify-center items-center flex-col">
    <h2 class="font-bold text-2xl">Tambahkan Data Santri</h2>
    <form @submit.prevent="submitSantri" class="flex flex-col w-full gap-3">
      <UIInput class="w-full text-lg" type="text" placeholder="Nama Santri " v-model="data.name" />
      <UIInput class="w-full text-lg" type="text" placeholder="Nomor Kartu Santri " v-model="data.cardNumber" />
      <UIInputSelect class="w-full text-lg" placeholder="Pilih Kelas" v-model="data.kelas" :options="['Kelas_1', 'Kelas_2', 'Kelas_3', 'Kelas_4', 'Kelas_5', 'Kelas_6']" />
      <UIButton liquid font="bold">Submit</UIButton>
    </form>
  </div>
</template>
<script setup>
import { useModalStore } from "~/stores/modal";
import { useToastStore } from "~/stores/toast";
const toast = useToastStore();
const modal = useModalStore();

const data = ref({
  name: "",
  cardNumber: "",
  kelas: "",
});

const { $emit } = useEmitter();

const submitSantri = async () => {
  const santri = await $fetch("/api/santri", {
    method: "POST",
    body: data.value,
  });
  if (santri) {
    $emit("addSantri", santri);
    modal.closeModal();
    toast.showToast("success", "Santri Ditambahkan");
  }
};
</script>
