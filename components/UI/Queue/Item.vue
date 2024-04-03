<template>
  <div class="w-full px-3 py-2 flex justify-between text-white items-center border-b-[0.2px] border-white/20">
    <span
      class="text-xl font-semibold"
      :class="{
        'text-white': props.antrian.status === 'waiting',
      }"
      >{{ props.antrian.name }}</span
    >
    <div class="flex gap-3">
      <span class="px-3 py-1 bg-white rounded-xl font-bold text-black">{{ props.antrian.number }}</span>
      <span class="px-3 py-1 bg-white rounded-xl font-bold text-black">{{ props.antrian.type }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  antrian: {
    type: Object,
    required: true,
  },
});
</script>
