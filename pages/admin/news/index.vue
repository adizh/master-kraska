<template>
  <NuxtLayout name="admin">
    <div class="flex gap-2">
      <button
        class="bordered-white-btn"
        @click="isCreateNewsOpen = !isCreateNewsOpen"
      >
        Создать новость
      </button>
      <button
        class="bordered-white-btn"
        @click="isDeleteNewsOpen = !isDeleteNewsOpen"
      >
        Удалить новость
      </button>

      <button
        class="bordered-white-btn"
        @click="isUpdateNewsOpen = !isUpdateNewsOpen"
      >
        Обновить новость
      </button>
    </div>
    <AdminCreateNews
      :is-open="isCreateNewsOpen"
      @close-modal="isCreateNewsOpen = false"
    />

    <AdminDeleteNews
      :is-open="isDeleteNewsOpen"
      @close-modal="isDeleteNewsOpen = false"
    />

    <AdminUpdateNews
      :is-open="isUpdateNewsOpen"
      @close-modal="isUpdateNewsOpen = false"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
const isCreateNewsOpen = ref(false);
const isDeleteNewsOpen = ref(false);
const isUpdateNewsOpen = ref(false);
</script>

<style scoped></style>
