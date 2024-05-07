<template>
    <div>
        <h1>Редактировать товары</h1>
<div v-if="productsStore?.getFilteredProducts?.length > 0">
    <div class="all-prods">
        <ProductsProductItem v-for="item in productsStore.getFilteredProducts" :key="item?.id" :product="item">
            <template #edit-items>
                <div @click.stop="navigateTo(`/admin/edit-product/${item.id}`)">Edit item</div>
            </template>
        </ProductsProductItem>
    </div>
    <UIPagination :total="productsStore.getProdTotal?.totalPages"
    :currentActive="productsStore.filters.currentPage" @changePage="changePage" />
</div>
      
        <div v-else class='text-center'>
            <ProgressSpinner />
        </div>

    </div>
</template>

<script setup lang="ts">
const productsStore = useProductsSstore()
const changePage = (page: number) => {
    productsStore.filters.currentPage = page;
    productsStore.filterProducts();
}
onMounted(() => {
    productsStore.filterProducts()
})

</script>

<style scoped lang="scss">
.all-prods {
    margin-top: 40px;
    @include flex(row, center, center, 20px);
    flex-wrap: wrap;
}
</style>