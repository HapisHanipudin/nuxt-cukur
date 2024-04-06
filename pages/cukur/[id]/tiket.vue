<template>
  <div class="max-w-3xl w-full text-gold-600 gap-4 flex mx-10 flex-col">
    <h2 class="font-bold text-2xl">Pembelian Tiket</h2>
    <div class="flex flex-col w-full gap-3">
      <form @submit.prevent="submitTiket" class="flex flex-col w-full gap-3">
        <div class="relative w-full">
          <Combobox v-model="data.santriId">
            <ComboboxInput
              placeholder="Cari Santri"
              class="flex items-center rounded-3xl gap-2 border-2 px-6 py-3 border-gold-950 text-gold-700 bg-inherit w-full focus:ring-gold-600 focus:border-gold-600 focus:border"
              @change="input = $event.target.value"
            />
            <ComboboxOptions class="absolute z-10 w-full bg-zinc-800 rounded-xl overflow-hidden">
              <ComboboxOption class="first:rounded-t-xl last:rounded-b-xl overflow-hidden" v-for="santri in searchSantri" :key="santri.id" :value="santri.id">
                <div class="flex bg-zinc-800 flex-col gap-1 p-2 hover:bg-black/10 duration-300">
                  <span class="text-lg"
                    >{{ santri.name }} <span class="text-gray-500">{{ santri.kelas.replace(/_/g, " ") }}</span> <span class="text-gray-500 text-xs">({{ santri.id }})</span>
                  </span>
                  <span class="text-gray-500">{{ santri.cardNumber }}</span>
                </div>
              </ComboboxOption>
            </ComboboxOptions>
          </Combobox>
        </div>
        <UIInputSelect class="w-full text-lg" placeholder="Pilih Tiket" v-model="data.ticketType" :options="['VIP', 'REGULER']" />
        <UIInputSelect class="w-full text-lg" placeholder="Pilih Pembayaran" v-model="data.payment" :options="['CASH', 'SALDO']" />
        <UIButton class="px-16py-2" font="bold">Submit</UIButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from "@headlessui/vue";

const toast = useToastStore();
const dataSantri = ref([]);
const $route = useRoute();

onBeforeMount(async () => {
  await getSantris();
});

const searchSantri = computed(() => {
  return dataSantri.value.filter((santri) => {
    return santri.name.toLowerCase().includes(input.value.toLowerCase()) || santri.cardNumber.toString().includes(input.value);
  });
});

const transformSantri = (santri) => {
  return {
    name: santri.name,
    cardNumber: santri.cardNumber,
  };
};

const getSantris = async () => {
  const santris = await $fetch("/api/santri");
  dataSantri.value = santris;
};

const submitTiket = async () => {
  try {
    await $fetch(`/api/cukur/${$route.params.id}`, {
      method: "POST",
      body: data.value,
    });
    toast.showToast("success", "Berhasil Beli Tiket");
  } catch (error) {
    toast.showToast("error", "Terjadi Kesalahan");
  }
};

const input = ref("");

const data = ref({
  santriId: "",
  ticketType: "",
  payment: "",
});
</script>

<style scoped>
::v-deep(.p-autocomplete-panel) {
  width: 100%;
}

::v-deep(.p-autocomplete-item) {
  @apply p-2;
}

::v-deep(.p-autocomplete-item:hover) {
  @apply bg-gold-700;
}
</style>
