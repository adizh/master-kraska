<template>
  <NuxtLayout name="admin">
    <div class="flex gap-2">
      <button
        class="bordered-white-btn"
        @click="isCreateBrandOpen = !isCreateBrandOpen"
      >
        Создать бренд
      </button>
      <button
        class="bordered-white-btn"
        @click="isDeleteBrandOpen = !isDeleteBrandOpen"
      >
        Удалить бренд
      </button>

      <button
        class="bordered-white-btn"
        @click="isUpdateBrandOpen = !isUpdateBrandOpen"
      >
        Обновить бренд
      </button>
    </div>
    <AdminCreateBrand
      :is-open="isCreateBrandOpen"
      @close-modal="isCreateBrandOpen = false"
    />
    <AdminUpdateBrand
      :is-open="isUpdateBrandOpen"
      @close-modal="isUpdateBrandOpen = false"
    />

    <AdminDeleteBrand
      :is-open="isDeleteBrandOpen"
      @close-modal="isDeleteBrandOpen = false"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
const authStore=useAuthStore()
if(authStore.getRole!=='SuperAdmin'){
   navigateTo('/admin')
   setTimeout(()=>{
window.location.reload()
   },200)
}
const isCreateBrandOpen = ref(false);
const isDeleteBrandOpen = ref(false);
const isUpdateBrandOpen = ref(false);
</script>

<style scoped></style>
