<template>
  <div v-if="toast.show" class="fixed animate-toast overflow-hidden items-center justify-center top-10 right-10 rounded-lg py-4 px-8 flex gap-5 bg-neutral-50">
    <span
      :class="{
        'text-green-500': toast.type === 'success',
        'text-red-500': toast.type === 'error',
        'text-blue-500': toast.type === 'info',
        'text-yellow-500': toast.type === 'warning',
      }"
      class="text-3xl"
    >
      <CheckCircleIcon v-if="toast.type === 'success'" class="w-10 h-10" />
      <InformationCircleIcon v-else-if="toast.type === 'info'" class="w-10 h-10" />
      <ExclamationTriangleIcon v-else-if="toast.type === 'error' || toast.type === 'warning'" class="w-10 h-10" />
    </span>
    <span class="text-2xl capitalize font-semibold">{{ toast.message }}</span>
    <div
      :class="{
        'bg-green-500': toast.type === 'success',
        'bg-red-500': toast.type === 'error',
        'bg-blue-500': toast.type === 'info',
        'bg-yellow-500': toast.type === 'warning',
      }"
      class="absolute animate-loadingbar bottom-0 right-0 w-[110%] h-1 rounded-full"
    ></div>
  </div>
</template>

<script setup>
import { useToastStore } from "~/stores/toast";
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/vue/24/outline";

const toast = useToastStore();
</script>
