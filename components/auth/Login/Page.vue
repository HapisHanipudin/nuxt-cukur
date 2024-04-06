<template>
  <div class="w-full h-screen flex flex-col gap-3 justify-center items-center">
    <h1 class="text-gold-700 font-black font-sans text-3xl">Sign In</h1>
    <form @submit.prevent="handleLogin" class="flex w-96 flex-col gap-3">
      <UIInput class="text-lg" type="text" placeholder="Username" v-model="data.username">
        <template #icon>
          <UserIcon />
        </template>
      </UIInput>
      <UIInput class="text-lg" type="password" placeholder="Password" v-model="data.password">
        <template #icon> <KeyIcon /> </template>
      </UIInput>
      <UIButton liquid font="bold"> Login </UIButton>
    </form>
  </div>
</template>

<script setup>
const session = useSessionStore();
import { KeyIcon, UserIcon } from "@heroicons/vue/24/solid";
const data = ref({
  username: "",
  password: "",
});

const handleLogin = () => {
  session.login(data.value);
};
</script>
