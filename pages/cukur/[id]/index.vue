<template>
  <div v-if="!isLoading" class="flex container flex-col gap-4 mx-8 my-5">
    <h1 class="text-gold-700 font-black font-sans text-4xl">Cukur</h1>
    <h2 v-if="session.isAuthenticated" class="text-3xl font-extrabold text-white">Input Here</h2>
    <div v-if="session.isAuthenticated" class="flex max-lg:flex-col gap-3 justify-center">
      <div v-if="inputLoading" class="w-full flex items-center justify-center gap-3 p-3 text-xl font-semibold">
        <div class="animate-spin rounded-full h-8 w-8 border-2 border-x-gold-700 border-y-gold-950"></div>
        Loading...
      </div>
      <UIQueueInput v-else @inputEnter="queueInput" v-motion-slide-bottom :vip="cukurData.vip" :on-progress="cukurData.onProgress" :queue="cukurData.queue" />
    </div>
    <h2 class="text-3xl font-extrabold text-white">On Progress</h2>
    <div class="flex max-lg:flex-col gap-3 justify-center">
      <UIQueueProgress v-motion-slide-bottom v-if="cukurData?.onProgress?.length > 0" v-for="progress in cukurData.onProgress" :data="progress" />
      <UIQueueProgress v-motion-slide-bottom v-else :data="null" v-for="i in cukurData.tukangCukur" />
      <div v-if="session.isAdmin" class="flex gap-3 grow lg:flex-col lg:w-2/5">
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
  <div v-else class="flex container w-full h-screen justify-center items-center gap-2">
    <div class="animate-spin rounded-full h-16 w-16 border-4 border-x-gold-700 border-y-gold-950"></div>
    <span class="text-3xl font-extrabold text-white"> Loading...</span>
  </div>
</template>

<script setup>
import { ClockIcon, CreditCardIcon } from "@heroicons/vue/24/outline";
const isLoading = ref(true);
const toast = useToastStore();
const inputLoading = ref(false);
const $route = useRoute();
const cukurData = ref({});
const session = useSessionStore();

const queueInput = async (event) => {
  if (event === "") return;

  inputLoading.value = true;

  try {
    const res = await $fetch(`/api/cukur/${$route.params.id}/${event}`, {
      method: "POST",
    });
    console.log(res);
  } catch (error) {
    toast.showToast("error", error.message);
  } finally {
    inputLoading.value = false;
    toast.showToast(res.type, res.message);
    await getSantris();
  }
};

const getSantris = async () => {
  try {
    const res = await $fetch(`/api/cukur/${$route.params.id}`);
    cukurData.value = res;
  } catch (error) {
    console.log(error);
  } finally {
  }
};

onBeforeMount(async () => {
  isLoading.value = true;
  await getSantris();
  isLoading.value = false;
});
</script>
