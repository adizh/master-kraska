<template>
  <NuxtLayout name="admin">
    <section>
      <div class="flex justify-content-end mb-3" @click="goToAdd">
        <button class="bordered-white-btn">
          Добавить продукт
        </button>
      </div>
      <AdminProducts />
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();

const goToAdd = () => {
  router.push("/admin/add-product");
  setTimeout(() => {
    window.location.reload();
  }, 700);
};
onMounted(() => {
  if (authStore?.getRole !== "Admin" && authStore?.getRole !== "SuperAdmin") {
    router.push("/");

    setTimeout(() => {
      window.location.reload()
    },600)
  }
});
</script>

<style lang="scss">
section {
  flex: 1;
}
</style>
