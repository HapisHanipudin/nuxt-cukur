<template>
  <div class="w-full lg:w-3/5 rounded-[2rem] relative py-16 bg-teal-500 border-4 border-white flex items-center justify-center">
    <div class="absolute top-4 left-4 flex gap-2">
      <span class="px-3 py-2 bg-white rounded-xl font-bold">REG</span>
      <span class="px-3 py-2 bg-white rounded-xl font-bold">29</span>
    </div>
    <span class="text-white text-4xl font-black text-center">Wildan Hanif</span>
    <div class="absolute bottom-3 right-4 text-xl text-white font-light">13 Menit</div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
