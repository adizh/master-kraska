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
<div class="sliders-section mt-4">
<AdminBannersItem v-for="seller in newsStore.getAllSliders" :key="seller?.id" :seller="seller"/>
</div>



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
const newsStore=useNewsStore()

onMounted(()=>{
  newsStore.fetchSliders()
})
</script>

<style scoped></style>
