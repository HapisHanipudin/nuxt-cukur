<template>
  <div class="flex flex-row bg-zinc-900">
    <div>
      <Sidebar />
    </div>
    <div class="w-full min-h-screen flex justify-center items-center text-white">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { useSessionStore } from "./stores/session";

const session = useSessionStore();

onBeforeMount(async () => {
  await session.initAuth();
});
</script>
