<template>
  <div class="relative w-full">
    <Combobox v-model="selectedSantri" @update:modelValue="$emits('update:modelValue', $event)">
      <ComboboxInput
        focus
        placeholder="Cari Santri"
        class="flex items-center rounded-3xl gap-2 border-2 px-6 py-3 border-gold-950 text-gold-700 bg-inherit w-full focus:ring-gold-600 focus:border-gold-600 focus:border"
        @input="input = $event.target.value"
        @keyup.enter="$emits('inputEnter', $event.target.value)"
        @keyup="$emits('update:modelValue', $event.target.value)"
        @change="$emits('update:modelValue', $event.target.value)"
      />

      <ComboboxOptions class="absolute z-10 w-full">
        <ComboboxOption class="first:rounded-t-xl last:rounded-b-xl overflow-hidden" v-for="santri in searchSantri" :key="santri.id" :value="santri.id">
          <UIQueueItem class="bg-slate-500 hover:bg-slate-600 duration-150" :antrian="santri"></UIQueueItem>
        </ComboboxOption>
      </ComboboxOptions>
    </Combobox>
  </div>
  <slot></slot>
</template>

<script setup>
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from "@headlessui/vue";
const $emits = defineEmits(["update:modelValue", "inputEnter"]);
const $props = defineProps({
  queue: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: null,
  },
  vip: {
    type: Array,
    default: () => [],
  },
  onProgress: {
    type: Array,
    default: () => [],
  },
});

const input = ref($props.modelValue);
const selectedSantri = ref($props.modelValue);

const searchSantri = computed(() => {
  const santris = [...$props.vip, ...$props.queue, ...$props.onProgress];

  return santris.filter((queue) => {
    const santri = queue.santri;
    const searchTerm = input.value.toLowerCase();

    return santri.name.toLowerCase().includes(searchTerm) || santri.cardNumber.toString().includes(searchTerm);
  });
});
</script>
