<template>
  <div class="flex items-center relative rounded-3xl gap-2 border-2 px-4 py-2 border-gold-950 text-gold-700">
    <label class="absolute bg-inherit px-1 top-0 -translate-y-1/2" v-if="$props.label">{{ $props.label }}</label>
    <div class="w-6" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>
    <div class="w-full">
      <input
        :class="borderDefault"
        @input="$emit('update:modelValue', $event.target.value)"
        :value="$props.modelValue"
        :type="type"
        :placeholder="$props.placeholder"
        class="bg-inherit block w-full px-2 py-1 focus:ring-gold-600 focus:border-gold-600 focus:border"
      />
      <slot></slot>
    </div>
    <div @click="type === 'password' ? (type = 'text') : (type = 'password')" v-if="$props.type === 'password'">
      <EyeIcon class="w-6 h-6 cursor-pointer" />
    </div>
  </div>
</template>

<script setup>
import { EyeIcon } from "@heroicons/vue/24/outline";
const { borderDefault } = useTailwindConfig();
const $slots = useSlots();
const emit = defineEmits(["update:modelValue"]);
const $props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const type = ref($props.type);
</script>
