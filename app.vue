<template>
  <div class="flex flex-row bg-zinc-900">
    <div>
      <Sidebar />
    </div>
    <div class="w-full text-white">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { useSessionStore } from "./stores/session";

const session = useSessionStore();
</script>
