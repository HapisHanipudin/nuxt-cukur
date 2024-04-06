<template>
  <AuthLoginPage />
</template>

<script setup>
const session = useSessionStore();

onBeforeMount(async () => {
  if (!!session.authUser) {
    navigateTo("/");
  }
});
</script>
