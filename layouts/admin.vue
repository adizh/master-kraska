<template>
  <section>
    <div class="admin-links">
      <a href="/admin/add-product" target="_blank">Добавить продукт</a>
      <a href="/admin/orders" target="_blank">Заказы</a>
      <a
        href="#"
        target="_blank"
        @click.prevent="openModal"
      >Создать категорию</a>
      <a
        href="#"
        target="_blank"
        @click.prevent="openNewsModal"
      >Создать новость</a>
      <a
        href="#"
        target="_blank"
        @click.prevent="openBrandModal"
      >Создать бренд</a>

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
  </section>
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
.admin-links {
  position: absolute;
  top: 100px;
  background: white;
  left: 0;
  margin-right: 40px;
  z-index: 1;

  @include flex(column, start, start);
  a {
    border: 1px solid #ddd;
    padding: 20px;
    display: block;

    width: 100%;
  }
}

.slot-sidebar {
  margin-left: 190px;
  max-height: calc(100vh - 100px); 
  overflow-y: auto; ;
}

</style>
