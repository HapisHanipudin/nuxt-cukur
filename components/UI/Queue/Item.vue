<template>
  <div class="w-full px-3 py-3 flex justify-between text-white items-center border-b-[0.2px] last:border-0 border-white/20">
    <span
      class="text-xl font-semibold"
      :class="{
        'text-white': props.antrian.status === 'WAITING',
      }"
      >{{ props.antrian.santri.name }}</span
    >
    <div class="flex gap-3">
      <span
        :class="{
          'bg-teal-500 text-white': props.antrian.ticket === 'REGULER',
          'bg-gold-500': props.antrian.ticket === 'VIP',
        }"
        class="px-3 py-1 rounded-xl font-bold text-black transition-all duration-200 ease-in-out"
        >{{ props.antrian.queueNumber }}</span
      >
      <span
        :class="{
          'bg-teal-500 text-white': props.antrian.ticket === 'REGULER',
          'bg-gold-500': props.antrian.ticket === 'VIP',
        }"
        class="px-3 py-1 rounded-xl font-bold text-black transition-all duration-200 ease-in-out"
        >{{ props.antrian.ticket }}</span
      >
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
