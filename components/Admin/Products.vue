<template>
  <div>
 <div class='flex justify-content-between align-items-center'>
  <h1>Редактировать товары </h1>
  <input type="text" placeholder="Поиск по имени" class="basic-input w-25" @input="handleSeach"/>
 </div>
    <div v-if="productsStore?.getFilteredProducts?.length > 0">
      <div class="all-prods">
        <ProductsProductItem
          v-for="item in productsStore.getFilteredProducts"
          :key="item?.id"
          :product="item"
        >
          <template #edit-items>
            <div class="admin-icons">
              <div
                @click.stop="
                  navigateTo(`/admin/edit-product/${item.id}`, {
                    external: true,
                    open: {
                      target: '_blank',
                    },
                  })
                "
              >
                <img src="../../assets/icons/tdesign_edit.svg" alt="edit" />
              </div>

              <div @click.stop="openDelete(item)">
                <img src="../../assets/icons/icon=trash.svg" alt="trash" />
              </div>
            </div>
          </template>
        </ProductsProductItem>
      </div>
      <UIPagination
        :total="productsStore.getProdTotal?.totalPages"
        :currentActive="productsStore.filters.currentPage"
        @changePage="changePage"
      />
    </div>

    <div v-else class="text-center">
      <ProgressSpinner />
    </div>

    <Dialog
      v-model:visible="isDeleteOpen"
      modal
      :style="{ padding: '20px 40px 50px 20px' }"
      header=" "
    >
      <ConfirmPay
        @cancel="isDeleteOpen = false"
        @confirm="confirmedItemDelete"
        title="Вы действительно хотите удалить этот продукт"
      />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { Product } from "~/types/Product";

const productsStore = useProductsSstore();
const isDeleteOpen = ref(false);

const currentProduct = ref({} as Product);
const confirmedItemDelete = () => {
  productsStore.deleteProduct(currentProduct?.value);
  isDeleteOpen.value = false;
};

const openDelete = (item: Product) => {
  isDeleteOpen.value = true;
  currentProduct.value = item;
};
const changePage = (page: number) => {
  productsStore.filters.currentPage = page;
  productsStore.filterProducts();
};

const handleSeach =(event:Event)=>{
  const target = event.target as HTMLInputElement;
  productsStore.setFilterSearch(target.value)
}

onMounted(() => {
  productsStore.filterProducts();
});
</script>

<style scoped lang="scss">
.all-prods {
  margin-top: 40px;
  @include flex(row, center, center, 20px);
  flex-wrap: wrap;
}

@media (max-width: 1100px) {
  .item-block {
    width: 33%;
  }
}

@media (max-width: 800px) {
  .item-block {
    width: 45%;
  }
}

@media (max-width: 620px) {
  .item-block {
    width: 65%;
  }
}
@media (max-width: 480px) {
  .item-block {
    width: 85%;
  }
}
@media (max-width: 360px) {
  .item-block {
    width: 100%;
  }
}
</style>
