<template>
  <div class="layout-container">
    <div class="admin-links">
      <a href="/admin" target="_blank">Главная</a>
      <a href="/admin/add-product" target="_blank">Добавить продукт</a>
      <a href="/admin/orders" target="_blank">Заказы</a>
      <a href="/admin/sellers" target="_blank">Продавцы</a>
      <a href="/admin/banners" target="_blank">Баннеры</a>
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
    <div class="slot-sidebar">
      <slot />
    </div>
    <AdminCreateCategory
      :open-create-category-modal="openCreateCategoryModal"
      @close-modal="openCreateCategoryModal = false"
    />
    <AdminCreateNews :is-open="openNews" @close-modal="openNews = false" />
    <AdminCreateBrand :is-open="openBrand" @close-modal="openBrand = false" />
  </div>
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
</script>

<style scoped lang="scss">
.layout-container {
  display: flex;
  flex-direction: row;
}

.admin-links {
  width: 190px;
  left: 0;
  top: 100px;
  bottom: 0;
  background: white;

  @include flex(column, start, start);
  a {
    border: 1px solid #ddd;
    padding: 20px;
    display: block;
    width: 190px;
  }
}

.slot-sidebar {
  padding: 20px;
  flex: 1;
}
</style>
