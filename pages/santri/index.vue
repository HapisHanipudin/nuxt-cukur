<template>
  <div class="flex flex-col w-full container mx-10 my-16 gap-3 items-center">
    <div class="flex justify-between w-full items-center">
      <h1 class="text-gold-700 font-black font-sans text-3xl">List Santri</h1>
      <UIButton v-if="session.authUser?.type === 'ADMIN'" @click="modal.openModal('addSantri')" class="flex gap-2" font="bold"><AddIcon class="w-6 h-6" /> Tambahkan</UIButton>
    </div>
    <div class="border overflow-hidden w-full rounded-3xl bg-neutral-800/20">
      <table>
        <thead>
          <tr class="border-b">
            <th class="w-16">No</th>
            <th>Nama</th>
            <th class="w-96 max-md:hidden">Card Number</th>
            <th class="w-24 max-md:hidden">Kelas</th>
            <th class="w-32">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading" v-for="i in 10" class="border-b font-semibold">
            <td class="p-3 text-center"><div class="h-8 bg-gray-400/45 rounded-full animate-pulse"></div></td>
            <td class="font-bold"><div class="h-8 bg-gray-400/45 rounded-full animate-pulse"></div></td>
            <td class="text-center max-md:hidden"><div class="h-8 bg-gray-400/45 rounded-full animate-pulse"></div></td>
            <td class="text-center max-md:hidden"><div class="h-8 bg-gray-400/45 rounded-full animate-pulse"></div></td>
            <td class="flex gap-2 text-center">
              <div class="flex gap-2">
                <UIButton class="flex gap-2 hover:scale-105" font="bold"><PencilSquareIcon class="w-6 h-6" /> <span class="max-lg:hidden">Ubah</span> </UIButton>
                <UIButton class="flex gap-2 hover:scale-105" font="bold"><TrashIcon class="w-6 h-6" /> <span class="max-lg:hidden">Hapus</span></UIButton>
                <UIButton class="flex gap-2 hover:scale-105" font="bold"><ClockIcon class="w-6 h-6" /> <span class="max-lg:hidden">Riwayat</span></UIButton>
              </div>
            </td>
          </tr>
          <tr
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
            :class="{ 'bg-neutral-800/70': index % 2 === 0 }"
            class="border-b font-semibold"
            v-for="(santri, index) in santris"
            v-else-if="santris.length > 0"
            :key="santri.id"
          >
            <td class="p-3 text-center">{{ index + 1 }}</td>
            <td class="font-bold text-lg">
              <NuxtLink :to="`/santri/${santri.id}`" :data="santri">{{ santri.name }}</NuxtLink>
            </td>
            <td class="text-center max-md:hidden">{{ santri.cardNumber }}</td>
            <td class="text-center max-md:hidden">{{ santri.kelas.replace(/_/g, " ") }}</td>
            <td class="text-center">
              <div class="flex gap-2">
                <NuxtLink :to="`/santri/${santri.id}/edit`">
                  <UIButton class="flex gap-2 hover:scale-105" font="bold"><PencilSquareIcon class="w-6 h-6" /> <span class="max-lg:hidden">Ubah</span> </UIButton>
                </NuxtLink>
                <UIButton @click="deleteSantri(santri.id)" class="flex gap-2 hover:scale-105" font="bold"><TrashIcon class="w-6 h-6" /> <span class="max-lg:hidden">Hapus</span></UIButton>
                <NuxtLink :to="`/santri/${santri.id}/history`">
                  <UIButton class="flex gap-2 hover:scale-105" font="bold"><ClockIcon class="w-6 h-6" /> <span class="max-lg:hidden">Riwayat</span></UIButton>
                </NuxtLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { PlusCircleIcon as AddIcon, PencilSquareIcon, TrashIcon, ClockIcon } from "@heroicons/vue/24/outline";
import { useModalStore } from "~/stores/modal";
import { useSessionStore } from "~/stores/session";
import { useEmitter } from "~/composables/useEmitter";

const session = useSessionStore();

const modal = useModalStore();
const isLoading = ref(true);
const santris = ref([]);
const toast = useToastStore();

const $emitter = useEmitter();

$emitter.$on("addSantri", (value) => {
  santris.value.unshift(value);
});

const getSantris = async () => {
  isLoading.value = true;
  try {
    const { data } = await useFetch("/api/santri");
    santris.value = data.value;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const deleteSantri = async (id) => {
  try {
    const { data } = await useFetch(`/api/santri/${id}`, {
      method: "DELETE",
    });
    if (data.value) {
      getSantris();
    }
  } catch (error) {
    console.log(error);
  }
};

onBeforeMount(async () => {
  const isAdmin = session.isAdmin;
  if (!isAdmin) {
    toast.showToast("error", "Anda bukan admin");
    return navigateTo(`/`);
  }
  await getSantris();
});
</script>

<style scoped>
table {
  width: 100%;
}

th,
td {
  @apply p-3;
}

th {
  @apply text-center;
}

tbody tr:last-child {
  border-b: none;
}
</style>
