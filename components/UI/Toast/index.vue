<template>
  <div class="fixed top-10 right-10 flex flex-col gap-3 z-50">
    <div v-if="toast.list.length > 0" v-for="(notif, index) in toast.list" class="animate-toast overflow-hidden items-center justify-center rounded-lg py-4 px-8 flex gap-5 bg-neutral-50">
      <span
        :class="{
          'text-green-500': notif.type === 'success',
          'text-red-500': notif.type === 'error',
          'text-blue-500': notif.type === 'info',
          'text-yellow-500': notif.type === 'warning',
        }"
        class="text-3xl"
      >
        <CheckCircleIcon v-if="notif.type === 'success'" class="w-10 h-10" />
        <InformationCircleIcon v-else-if="notif.type === 'info'" class="w-10 h-10" />
        <XCircleIcon v-else-if="notif.type === 'error'" class="w-10 h-10" />
        <ExclamationTriangleIcon v-else-if="notif.type === 'warning'" class="w-10 h-10" />
      </span>
      <span class="text-2xl capitalize font-semibold">{{ notif.message }}</span>
      <div
        :class="{
          'bg-green-500': notif.type === 'success',
          'bg-red-500': notif.type === 'error',
          'bg-blue-500': notif.type === 'info',
          'bg-yellow-500': notif.type === 'warning',
        }"
        class="absolute animate-loadingbar bottom-0 right-0 w-[110%] h-1 rounded-full"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from "~/stores/toast";
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from "@heroicons/vue/24/outline";

const toast = useToastStore();
</script>
