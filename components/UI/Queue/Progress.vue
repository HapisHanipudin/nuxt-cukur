<template>
  <div
    :class="{
      'bg-teal-500 border-white': props.data?.ticket === 'REGULER',
      'border-gold-800 bg-zinc-950': props.data?.ticket === 'VIP',
    }"
    class="w-full rounded-[2.5rem] relative py-16 border-4 flex items-center justify-center"
  >
    <div class="absolute top-4 left-4 flex gap-2">
      <span :class="{ 'text-teal-500 bg-white': props.data.ticket == 'REGULER', 'text-black bg-gold-700': props.data.ticket == 'VIP' }" v-if="!!props.data" class="xl:px-7 px-5 xl:py-2 py-1 text-2xl rounded-2xl font-bold">{{
        props.data?.ticket
      }}</span>
      <span :class="{ 'text-teal-500 bg-white': props.data.ticket == 'REGULER', 'text-black bg-gold-700': props.data.ticket == 'VIP' }" v-if="!!props.data" class="xl:px-7 px-5 xl:py-2 py-1 text-2xl rounded-2xl font-bold">{{
        props.data?.queueNumber
      }}</span>
    </div>
    <span :class="{ 'text-white': props.data?.ticket === 'REGULER', 'text-gold-500': props.data?.ticket === 'VIP' }" class="text-4xl font-black text-center">{{
      props.data?.santri?.name ? props.data?.santri.name : "Belum ada progress"
    }}</span>
    <div :class="{ 'text-white': props.data?.ticket === 'REGULER', 'text-gold-200': props.data?.ticket === 'VIP' }" v-if="!!props.data" class="absolute bottom-3 right-6 text-xl font-normal flex gap-1 items-center">
      <ClockIcon class="w-8 h-8 inline" /> {{ props.data?.updated }}
    </div>
  </div>
</template>

<script setup>
import { ClockIcon } from "@heroicons/vue/24/solid";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
