<template>
  <NuxtLayout name="admin">
    <div class="flex gap-2">
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
  </NuxtLayout>
</template>

<script setup lang="ts">
import {
  isCreateCategoryOpen,
  isDeleteCategoryOpen,
  isUpdateCateforyOpen,
} from "@/helpers/admin/category";
</script>

<style scoped></style>
