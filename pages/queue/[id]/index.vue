<template>
  <div class="flex flex-col gap-4 px-8 py-5">
    <h2 class="text-3xl font-extrabold text-white">On Progress</h2>
    <div class="flex max-lg:flex-col gap-3 justify-center">
      <UIQueueProgress data="auk" />
      <div class="flex gap-3 grow lg:flex-col">
        <button class="w-full rounded-3xl text-2xl font-bold bg-green-500 grow text-white py-5">Selesai</button>
        <button class="w-full rounded-3xl text-2xl font-bold bg-white text-black grow py-5">Riwayat</button>
      </div>
    </div>
    <div class="flex max-lg:flex-col gap-3 justify-center">
      <UIQueueCard name="Antrian">
        <UIQueueItem v-for="au in auah" :antrian="au"></UIQueueItem>
      </UIQueueCard>
      <UIQueueCard name="VVIP">
        <UIQueueItem v-for="au in auah" :antrian="au"></UIQueueItem>
      </UIQueueCard>
    </div>
  </div>
</template>

<script setup>
const $route = useRoute();
const auah = ref([
  { name: "Wildan Hanif", number: 29, type: "REG", status: "on progress" },
  { name: "Wildan Hanif", number: 29, type: "REG", status: "on progress" },
  { name: "Wildan Hanif", number: 29, type: "REG", status: "on progress" },
]);

const auk = ref({ name: "Wildan Hanif", number: 29, type: "REG", status: "on progress" });
</script>
