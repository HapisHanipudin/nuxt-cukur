<template>
  <div class="flex flex-col w-full container mx-10 gap-3 items-center">
    <div class="flex justify-between w-full items-center">
      <h1 class="text-gold-700 font-black font-sans text-3xl">List Santri</h1>
      <UIButton class="flex gap-2" font="bold"><AddIcon class="w-6 h-6" /> Tambahkan</UIButton>
    </div>
    <div class="border overflow-hidden w-full rounded-3xl bg-neutral-800/20">
      <table>
        <thead>
          <tr class="border-b">
            <th class="w-16">No</th>
            <th>Nama</th>
            <th class="w-36">Card Number</th>
            <th class="w-24">Kelas</th>
            <th class="w-32">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading" v-for="i in 10" class="border-b font-semibold">
            <td class="p-3 text-center"><div class="h-8 bg-gray-400/45 rounded-full animate-pulse"></div></td>
            <td class="font-bold"><div class="h-8 bg-gray-400/45 rounded-full animate-pulse"></div></td>
            <td class="text-center"><div class="h-8 bg-gray-400/45 rounded-full animate-pulse"></div></td>
            <td class="text-center"><div class="h-8 bg-gray-400/45 rounded-full animate-pulse"></div></td>
            <td class="flex gap-2 text-center">
              <UIButton class="flex gap-2" font="bold"><div class="h-8 flex grow bg-gray-200/50 rounded-full animate-pulse"></div></UIButton>
              <UIButton class="flex gap-2" font="bold"><div class="h-8 flex grow bg-gray-200/50 rounded-full animate-pulse"></div></UIButton>
              <UIButton class="flex gap-2" font="bold"><div class="h-8 flex grow bg-gray-200/50 rounded-full animate-pulse"></div></UIButton>
            </td>
          </tr>
          <tr v-for="(santri, index) in santris" v-else-if="santris.length > 0" class="border-b font-semibold">
            <td class="p-3 text-center">{{ index + 1 }}</td>
            <td class="font-bold">{{ santri.name }}</td>
            <td class="text-center">{{ santri.cardNumber }}</td>
            <td class="text-center">{{ santri.kelas.replace(/_/g, " ") }}</td>
            <td class="flex gap-2 text-center">
              <UIButton class="flex gap-2" font="bold"><PencilSquareIcon class="w-6 h-6" /> Ubah </UIButton>
              <UIButton @click="deleteSantri(santri.id)" class="flex gap-2" font="bold"><TrashIcon class="w-6 h-6" /> Hapus</UIButton>
              <UIButton class="flex gap-2" font="bold"><ClockIcon class="w-6 h-6" /> Riwayat</UIButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { PlusCircleIcon as AddIcon, PencilSquareIcon, TrashIcon, ClockIcon } from "@heroicons/vue/24/outline";

const isLoading = ref(true);
const santris = ref([]);

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
