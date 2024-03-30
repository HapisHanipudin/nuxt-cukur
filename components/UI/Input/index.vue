<template>
  <div class="flex items-center rounded-3xl gap-2 border-2 px-4 py-2 border-gold-950 text-gold-700">
    <div class="w-6" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>
    <div>
      <input
        :class="borderDefault"
        @input="$emit('update:modelValue', $event.target.value)"
        :value="$props.modelValue"
        :type="type"
        :placeholder="$props.placeholder"
        class="bg-inherit block w-full px-2 py-1 ring-gold-500 border-gold-500"
      />
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
