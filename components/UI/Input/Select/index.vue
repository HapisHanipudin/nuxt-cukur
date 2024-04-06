<template>
  <select @change="$emit('update:modelValue', $event.target.value)" class="bg-zinc-900 rounded-xl block w-full px-4 py-3 ring-gold-500 border-gold-500 text-gold-300 placeholder:text-gray-400" :placeholder="$props.placeholder">
    <option v-if="$props.placeholder" disabled selected value="">
      {{ $props.placeholder }}
    </option>
    <option v-for="option in $props.options" :key="option" :value="option">
      {{ option.replace(/_/g, " ") }}
    </option>
  </select>
</template>

<script setup>
const $emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: null,
  },
});
</script>
