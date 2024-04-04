<template>
  <div class="px-3 py-5 lg:sticky lg:top-0 lg:h-screen flex lg:flex-col fixed bottom-0 left-0 max-lg:w-full items-center justify-center gap-5 bg-zinc-800 bg">
    <div class="p-1 w-12 bg-gray-200 rounded-2xl">
      <img src="~/assets/img/logo.png" alt="" />
    </div>
    <div class="lg:mt-4 flex lg:flex-col gap-6 items-center justify-center text-white">
      <NuxtLink class="hover:scale-110 duration-300 transition-all ease-in-out" to="/"><HomeIcon class="w-8 h-8" /></NuxtLink>
      <NuxtLink class="hover:scale-110 duration-300 transition-all ease-in-out" to="/queue"><QueueListIcon class="w-8 h-8" /></NuxtLink>
      <NuxtLink class="hover:scale-110 duration-300 transition-all ease-in-out" to="/santri"><UsersIcon class="w-8 h-8" /></NuxtLink>
      <NuxtLink class="hover:scale-110 duration-300 transition-all ease-in-out" to="/setting"><Cog6ToothIcon class="w-8 h-8" /></NuxtLink>
      <NuxtLink class="hover:scale-110 duration-300 transition-all ease-in-out" v-if="!session.authUser" to="/login"><ArrowLeftEndOnRectangleIcon class="w-8 h-8" /></NuxtLink>
      <button class="hover:scale-110 duration-300 transition-all ease-in-out" v-else @click="session.logout()"><ArrowLeftStartOnRectangleIcon class="w-8 h-8" /></button>
    </div>
  </div>
</template>

<script setup>
const session = useSessionStore();

import { HomeIcon, UsersIcon, QueueListIcon, Cog6ToothIcon, ArrowLeftEndOnRectangleIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/vue/24/solid";
</script>
