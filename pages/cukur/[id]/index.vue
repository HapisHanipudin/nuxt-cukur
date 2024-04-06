<template>
  <div v-if="!isLoading" class="flex container flex-col gap-4 mx-8 my-5">
    <h2 class="text-3xl font-extrabold text-white">On Progress</h2>
    <div class="flex max-lg:flex-col gap-3 justify-center">
      <UIQueueProgress v-motion-slide-bottom :data="cukurData.onProgress" />
      <div class="flex gap-3 grow lg:flex-col">
        <NuxtLink :to="`/cukur/${cukurData.id}/tiket`" v-motion-slide-right class="w-full flex justify-center items-center gap-2 rounded-3xl text-2xl font-bold bg-green-500 grow text-white py-5"
          ><CreditCardIcon class="w-8 h-8 inline" /> Beli Tiket</NuxtLink
        >
        <NuxtLink :to="`/cukur/${cukurData.id}/history`" v-motion-slide-right :delay="300" class="w-full flex justify-center items-center gap-2 rounded-3xl text-2xl font-bold bg-white text-black grow py-5"
          ><ClockIcon class="w-8 h-8 inline" /> Riwayat</NuxtLink
        >
      </div>
    </div>
    <div class="flex max-lg:flex-col gap-3 justify-center">
      <UIQueueCard name="Antrian">
        <UIQueueItem
          v-if="cukurData.queue.length > 0"
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
          v-for="(queue, index) in cukurData.queue"
          :antrian="queue"
        ></UIQueueItem>
      </UIQueueCard>
      <UIQueueCard name="VVIP">
        <UIQueueItem
          v-if="cukurData.vip.length > 0"
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
          v-for="(queue, index) in cukurData.vip"
          :antrian="queue"
        ></UIQueueItem>
      </UIQueueCard>
    </div>
  </div>
</template>

<script setup>
import { ClockIcon, CreditCardIcon } from "@heroicons/vue/24/outline";
const isLoading = ref(true);

const $route = useRoute();

const cukurData = ref({});

onMounted(async () => {
  isLoading.value = true;
  try {
    const res = await $fetch(`/api/cukur/${$route.params.id}`);
    console.log(res);
    cukurData.value = res;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});
</script>
