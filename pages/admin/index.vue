<template>
  <NuxtLayout class="mt-5"  name="admin">



  

  <section>
    <AdminProducts />
  </section>
</NuxtLayout>
</template>

<script setup lang="ts">

const authStore = useAuthStore();
const visible = ref(true);
const openNews = ref(false);
const openBrand = ref(false);
const router = useRouter();
const openCreateCategoryModal = ref(false);

const openModal = () => {
  openCreateCategoryModal.value = true;
  visible.value = false;
};

const openNewsModal = () => {
  openNews.value = true;
  visible.value = false;
};

const openBrandModal = () => {
  openBrand.value = true;
  visible.value = false;
};
onMounted(() => {
  if(authStore?.getRole!=='Admin'){
      router.push('/')
  }
});
</script>

<style scoped lang="scss">

</style>
