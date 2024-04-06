<template>
  <div class="border-gold-700 border rounded-3xl bg-zinc-800 pr-4 overflow-hidden">
    <select @change="$emit('update:modelValue', $event.target.value)" class="bg-inherit rounded-xl block w-full px-5 py-3 ring-gold-500 border-gold-500 text-gold-300 placeholder:text-gray-400" :placeholder="$props.placeholder">
      <option v-if="$props.placeholder" disabled selected value="">
        {{ $props.placeholder }}
      </option>
      <option v-for="option in $props.options" :key="option" :value="option">
        {{ option.replace(/_/g, " ") }}
      </option>
    </select>
  </div>
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
