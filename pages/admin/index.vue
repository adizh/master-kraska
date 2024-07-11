<template>
  <section>
    <Sidebar v-model:visible="visible" :style="{ paddingTop: '20px' }">
      <div class="mt-5">
        <div class="admin-links">
          <a href="/admin/add-product" target="_blank">Добавить продукт</a>
          <a href="/admin/orders" target="_blank">Заказы</a>
          <a href="#" target="_blank" @click.prevent="openModal"
            >Создать категорию</a
          >
          <a href="#" target="_blank" @click.prevent="openNewsModal"
            >Создать новость</a
          >
          <a href="#" target="_blank" @click.prevent="openBrandModal"
            >Создать бренд</a
          >
          <a href="/admin/delete" target="_blank">Удаление</a>
          <a href="/admin/update" target="_blank">Обновление</a>
        </div>
      </div>
    </Sidebar>
    <Button
      icon="pi pi-trash"
      label="Ссылки"
      class="mb-4 p-2 flex flex-row justify-content-end"
      @click="visible = true"
    />
    <AdminProducts />

    <AdminCreateCategory
      :open-create-category-modal="openCreateCategoryModal"
      @close-modal="openCreateCategoryModal = false"
    />

    <AdminCreateNews :is-open="openNews" @close-modal="openNews = false" />
    <AdminCreateBrand :is-open="openBrand" @close-modal="openBrand = false" />
  </section>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const visible = ref(false);
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
  // if(authStore?.getRole!=='Admin'){
  //     router.push('/')
  // }
});
</script>

<style scoped lang="scss">
.admin-links {
  @include flex(column, start, start);
  a {
    border: 1px solid #ddd;
    padding: 20px;
    display: block;
    width: 100%;
  }
}
</style>
