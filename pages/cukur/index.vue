<template>
  <div class="flex flex-col w-full container mx-10 my-16 gap-3 items-center">
    <div class="flex justify-between w-full items-center">
      <h1 class="text-gold-700 font-black font-sans text-3xl">List Cukur</h1>
      <UIButton v-if="session.authUser?.type === 'ADMIN'" @click="modal.openModal('addCukur')" class="flex gap-2" font="bold"><AddIcon class="w-6 h-6" /> Tambahkan</UIButton>
    </div>
    <div class="border overflow-hidden w-full rounded-3xl bg-neutral-800/20">
      <table>
        <thead>
          <tr class="border-b">
            <th class="w-16">No</th>
            <th>Nama/Tanggal</th>
            <th class="w-36 max-md:hidden">Waktu</th>
            <th class="w-32">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr v-if="isLoading" v-for="i in 10" class="border-b font-semibold">
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
          </tr> -->
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
            v-for="(cukur, index) in cukurs"
            v-if="cukurs.length > 0 && !isLoading"
            :key="cukur.id"
          >
            <td class="p-3 text-center">{{ index + 1 }}</td>
            <td class="font-bold text-xl">
              <NuxtLink class="hover:underline" :to="`/cukur/${cukur.id}`" :data="cukur">{{ cukur.name }}</NuxtLink>
            </td>
            <td class="text-center max-md:hidden">{{ cukur.waktu }}</td>
            <td class="text-center">
              <div class="flex items-center gap-2">
                <NuxtLink :to="`/cukur/${cukur.id}/tiket`">
                  <UIButton class="flex gap-2 items-center hover:scale-105" font="bold"><PencilSquareIcon class="w-6 h-6" /> <span class="max-lg:hidden">Beli</span> </UIButton>
                </NuxtLink>
                <NuxtLink :to="`/cukur/${cukur.id}/history`">
                  <UIButton class="flex gap-2 hover:scale-105" font="bold"><ClockIcon class="w-6 h-6" /> <span class="max-lg:hidden">Riwayat</span></UIButton>
                </NuxtLink>
                <UIButton @click="deleteCukur(cukur.id)" class="flex gap-2 hover:scale-105" font="bold"><TrashIcon class="w-6 h-6" /> <span class="max-lg:hidden">Hapus</span></UIButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { PlusCircleIcon as AddIcon, CreditCardIcon as PencilSquareIcon, TrashIcon, ClockIcon } from "@heroicons/vue/24/outline";
import { useModalStore } from "~/stores/modal";
import { useSessionStore } from "~/stores/session";
import { useEmitter } from "~/composables/useEmitter";

const session = useSessionStore();

const modal = useModalStore();
const isLoading = ref(true);
const cukurs = ref([]);

const $emitter = useEmitter();

$emitter.$on("addCukur", (value) => {
  cukurs.value.unshift(value);
});

const getCukurs = async () => {
  isLoading.value = true;
  try {
    const { data } = await useFetch("/api/cukur", {
      method: "GET",
    });
    cukurs.value = data.value;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const deleteCukur = async (id) => {
  try {
    const { data } = await useFetch(`/api/cukur/${id}`, {
      method: "DELETE",
    });
    if (data.value) {
      getCukurs();
    }
  } catch (error) {
    console.log(error);
  }
};

onBeforeMount(async () => {
  await getCukurs();
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
