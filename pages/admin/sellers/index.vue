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
        :current-sellers="currentSellers"
        @open-edit="openEdit"
        @delete-seller="deleteSeller"
      />
    </div>
  </NuxtLayout>
  <UIModal
    :show-modal="isCreateModalOpen"
    title="Добавить продавца"
    @close-modal="isCreateModalOpen = false"
  >
    <AdminSellersCreate />
  </UIModal>

  <UIModal
    :show-modal="isDeleteSellerOpen"
    title="Удалить продавца"
    @close-modal="isDeleteSellerOpen = false"
  >
    <ConfirmPay
      title="Вы действительно хотите удалить этого продавца"
      @cancel="isDeleteSellerOpen = false"
      @confirm="confirmDeleteSeller"
    />
  </UIModal>
</template>

<script setup lang="ts">
import { isCreateModalOpen, isDeleteSellerOpen } from "@/helpers/admin/sellers";

import { Seller } from "~/types/Brands";
const brandsStore = useBrandsStore();
const currentSellers = ref([] as Seller[]);

const openEdit = (currentSeller: Seller) => {
  currentSellers.value.push(currentSeller);
};

const currentSeller = ref({} as Seller);
const deleteSeller = (seller: Seller) => {
  isDeleteSellerOpen.value = !isDeleteSellerOpen.value;
  currentSeller.value = seller;
};

const confirmDeleteSeller = async () => {
  try {
    const response = await http.delete(
      `/api/v1/Seller/delete-seller-by-id/${currentSeller.value?.id}`
    );
    if (response.status === 200) {
      useNotif("success", "Продавец удален", "Успешно");

      brandsStore.fetchAllSellers();
      isDeleteSellerOpen.value = false;
    }
  } catch (err) {
    console.log(err);
    useNotif("error", "Произошла ошибка", "Ошибка");
  }
};

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
