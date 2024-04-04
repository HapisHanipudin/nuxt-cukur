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
            <th class="w-32">Card Number</th>
            <th class="w-24">Kelas</th>
            <th class="w-32">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b font-semibold">
            <td class="p-3 text-center">1</td>
            <td class="font-bold">Wildan Hanif</td>
            <td class="text-center">081028319312</td>
            <td class="text-center">XII RPL 1</td>
            <td class="flex gap-2 text-center">
              <UIButton class="flex gap-2" font="bold"><PencilSquareIcon class="w-6 h-6" /> Ubah </UIButton>
              <UIButton class="flex gap-2" font="bold"><TrashIcon class="w-6 h-6" /> Hapus</UIButton>
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
