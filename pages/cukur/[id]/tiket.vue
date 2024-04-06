<template>
  <div class="w-full text-gold-600 gap-4 flex justify-center mx-10 items-center flex-col">
    <h2 class="font-bold text-2xl">Pembelian Tiket</h2>
    <div class="flex flex-col w-full gap-3">
      <form @submit.prevent="submitTiket" class="flex flex-col w-full gap-3">
        <UIInput class="w-full text-lg" type="text" placeholder="ID Santri" v-model="data.santriId" />
        <UIInputSelect class="w-full text-lg" placeholder="Pilih Tiket" v-model="data.ticketType" :options="['VIP', 'REGULER']" />
        <UIButton liquid font="bold">Submit</UIButton>
      </form>
    </div>
  </div>
</template>

<script setup>
const data = ref({
  santriId: "",
  ticketType: "",
  payment: "",
});
</script>
