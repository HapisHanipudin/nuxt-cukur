<template>
  <div class="flex container flex-col gap-4 mx-8 my-5">
    <h2 class="text-3xl font-extrabold text-white">On Progress</h2>
    <div class="flex max-lg:flex-col gap-3 justify-center">
      <UIQueueProgress v-motion-slide-bottom data="auk" />
      <div class="flex gap-3 grow lg:flex-col">
        <button v-motion-slide-right class="w-full rounded-3xl text-2xl font-bold bg-green-500 grow text-white py-5">Selesai</button>
        <button v-motion-slide-right class="w-full rounded-3xl text-2xl font-bold bg-white text-black grow py-5">Riwayat</button>
      </div>
    </div>
    <div class="flex max-lg:flex-col gap-3 justify-center">
      <UIQueueCard name="Antrian">
        <UIQueueItem
          v-motion="{
            initial: { opacity: 0, x: 100 + '%' },
            enter: {
              transition: {
                delay: index * 100,
                duration: 400,
              },
              opacity: 1,
              x: 0,
            },
          }"
          v-for="(au, index) in auah"
          :antrian="au"
        ></UIQueueItem>
      </UIQueueCard>
      <UIQueueCard name="VVIP">
        <UIQueueItem
          v-motion="{
            initial: { opacity: 0, x: 100 + '%' },
            enter: {
              transition: {
                delay: index * 100,
                duration: 400,
              },
              opacity: 1,
              x: 0,
            },
          }"
          v-for="(au, index) in auah"
          :antrian="au"
        ></UIQueueItem>
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
