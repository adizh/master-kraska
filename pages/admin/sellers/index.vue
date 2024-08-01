<template>
  <NuxtLayout name="admin">
    <div
      class="flex w-full mb-2"
      @click="isCreateModalOpen = !isCreateModalOpen"
    >
      <button class="pink-button">
        Создать продавца
      </button>
    </div>

    <div class="all-sellers">
      <AdminSellersItem
        v-for="seller in brandsStore.getAllSellers"
        :key="seller?.id"
        :seller="seller"
        @open-edit="openEdit"
      />
    </div>

    <UIModal
      :show-modal="isCreateModalOpen"
      title="Добавить продавца"
      @close-modal="isCreateModalOpen = false"
    >
      <AdminSellersCreate />
    </UIModal>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { isCreateModalOpen } from "@/helpers/admin/sellers";

import { Seller } from "~/types/Brands";
const brandsStore = useBrandsStore();

const openEdit = (currentSeller: Seller) => {};

onMounted(() => {
  brandsStore.fetchAllSellers();
});
</script>

<style scoped lang="scss">
.all-sellers {
  @include flex(row, start, center);
  gap: 20px;
  flex-wrap: wrap;
}
</style>
