<template>
  <button
    class="px-4 py-2 rounded-3xl bg-gold-700 hover:bg-gold-800 duration-200 text-gray-950"
    :class="{
      'w-full': props.liquid,
      'w-min': !props.liquid,
      'font-semibold': props.font === 'semibold',
      'font-bold': props.font === 'bold',
      'font-normal': props.font === 'normal',
      'font-light': props.font === 'light',
      'font-medium': props.font === 'medium',
      'font-semibold': props.font === 'semibold',
      'font-extrabold': props.font === 'extrabold',
      'font-black': props.font === 'black',
      'text-center': props.liquid,
    }"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  liquid: {
    type: Boolean,
    default: false,
  },
  font: {
    type: String,
    default: "normal",
  },
});
</script>
