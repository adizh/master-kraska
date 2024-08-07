<template>
  <NuxtLayout name="admin">
    <section>
      <h1>Категория</h1>
      <div class="flex gap-2 mt-1">
        <button
          class="bordered-white-btn"
          @click="isCreateCategoryOpen = !isCreateCategoryOpen"
        >
          Создать категорию
        </button>
        <button
          class="bordered-white-btn"
          @click="isDeleteCategoryOpen = !isDeleteCategoryOpen"
        >
          Удалить категорию
        </button>

        <button
          class="bordered-white-btn"
          @click="isUpdateCateforyOpen = !isUpdateCateforyOpen"
        >
          Обновить категорию
        </button>
      </div>

      <h2 class="mt-5">
        Подкатегория
      </h2>
      <div class="flex gap-2 mt-1">
        <button
          class="bordered-white-btn"
          @click="isCreateSubCategoryOpen = !isCreateSubCategoryOpen"
        >
          Создать подкатегорию
        </button>
      </div>

      <AdminCreateCategory
        :open-create-category-modal="isCreateCategoryOpen"
        @close-modal="isCreateCategoryOpen = false"
      />
      <AdminDeleteCategory
        :is-open="isDeleteCategoryOpen"
        @close-modal="isDeleteCategoryOpen = false"
      />

      <AdminUpdateCategory
        :is-open="isUpdateCateforyOpen"
        @close-modal="isUpdateCateforyOpen = false"
      />

      <AdminSubcategoryCreate
        :is-open="isCreateSubCategoryOpen"
        @close-modal="isCreateSubCategoryOpen = false"
      />
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {
  isCreateCategoryOpen,
  isDeleteCategoryOpen,
  isUpdateCateforyOpen
} from "@/helpers/admin/category";

const isCreateSubCategoryOpen = ref(false);
const isDeleteSubCategoryOpen = ref(false);
</script>

<style scoped></style>
