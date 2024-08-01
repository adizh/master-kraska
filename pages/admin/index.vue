<template>
  <section>
    <NuxtLayout name="admin">
      <AdminProducts />
    </NuxtLayout>
  </section>
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
.footer-section {
  display: none;
}
</style>
