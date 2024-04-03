<template>
  <div class="lg:w-1/2 flex flex-col gap-3">
    <h2 class="text-3xl font-extrabold text-white">{{ props.name }}</h2>
    <div class="rounded-3xl border-2 border-gold-950 bg-neutral-950 p-3">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>
