<template>
  <div class="w-full h-screen flex flex-col gap-3 justify-center items-center">
    <h1 class="text-gold-700 font-black font-sans text-3xl">Sign In</h1>
    <form class="flex flex-col gap-3">
      <UIInput type="text" placeholder="Username" v-model="data.username">
        <template #icon>
          <UserIcon />
        </template>
      </UIInput>
      <UIInput type="password" placeholder="Password" v-model="data.password">
        <template #icon> <KeyIcon /> </template>
      </UIInput>
      <UIButton liquid font="bold"> Login </UIButton>
    </form>
  </div>
</template>

<script setup>
import { KeyIcon, UserIcon } from "@heroicons/vue/24/solid";
const data = ref({
  username: "",
  password: "",
});
</script>
