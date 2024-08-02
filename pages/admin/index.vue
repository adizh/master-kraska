<template>
  <NuxtLayout name="admin">
    <section>
      <AdminProducts />
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  if (authStore?.getRole !== "Admin") {
    // router.push("/");
  }
});
</script>

<style lang="scss">
section {
  padding: 20px;
  flex: 1;
}
</style>
