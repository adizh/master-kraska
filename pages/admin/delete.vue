<template>
  <NuxtLayout name="admin">
    <section>
      <button class="btn-white-bg mt-0 mb-4" @click="navigateToAdmin">
        Назад
      </button>
      <div class="admin-delete">
        <button class="pink-button" @click="isBrandOpen = true">
          Удалить бренд
        </button>
        <button class="pink-button" @click="isCategoryOpen = true">
          Удалить категорию
        </button>
        <button class="pink-button" @click="isNewsOpen = true">
          Удалить новость
        </button>
      </div>

      <AdminDeleteBrand
        :is-open="isBrandOpen"
        @close-modal="isBrandOpen = false"
      />
      <AdminDeleteCategory
        :is-open="isCategoryOpen"
        @close-modal="isCategoryOpen = false"
      />
      <AdminDeleteNews
        :is-open="isNewsOpen"
        @close-modal="isNewsOpen = false"
      />
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
const isBrandOpen = ref(false);
const isCategoryOpen = ref(false);
const isNewsOpen = ref(false);
</script>

<style  lang="scss">
.admin-delete {
  @include flex(row, start, center);
}

</style>
