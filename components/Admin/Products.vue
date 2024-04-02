<template>
    <div>
        <h1>Update products</h1>

        <div class="all-prods">
            <ProductsProductItem v-for="item in productsStore.getAllProducsts" :key="item?.id" :product="item">
                <template #edit-items>
                    <div @click.stop="navigateTo(`/admin/edit-product/${item.id}`)">Edit item</div>
                </template>
            </ProductsProductItem>
        </div>

    </div>
</template>

<script setup lang="ts">
const productsStore = useProductsSstore()

onMounted(() => {
    productsStore.fetchAllProducts()
})
</script>

<style scoped lang="scss">
.item-block {
    width: 25%;
}

.all-prods {
    margin-top: 40px;
    @include flex(row, center, center, 20px);
    flex-wrap: wrap;
}
</style>