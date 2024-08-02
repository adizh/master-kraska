<template>
  <NuxtLayout name="admin">
    <div>
      <h1>Баннеры</h1>

      <button
        class="pink-button"
        @click="isCreateBannerOpen = !isCreateBannerOpen"
      >
        Создать баннер
      </button>
    </div>

    <UIModal
      :show-modal="isCreateBannerOpen"
      title="Создать баннер"
      @close-modal="isCreateBannerOpen = false"
    >
      <AdminBannersCreate @close-create-modal="isCreateBannerOpen = false" />
    </UIModal>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { isCreateBannerOpen } from "@/helpers/admin/banners";
</script>

<style scoped></style>
