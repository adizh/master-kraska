<template>
    <section v-if="getProduct && getProduct != undefined && Object.entries(getProduct)?.length > 0 && !isLoading">
        <ProductPageHeader :productId="id" />
        <ProductPageInfo :item="getProduct?.product" />
        <ProductPageSImilarItems :similarItems="getProduct?.similarProducts" />
        <ProductPageReviews :item='getProduct?.product' />
    </section>

    <section v-else class='flex flex-row justify-content-center'>
        <ProgressSpinner />
    </section>
</template>

<script setup lang="ts">
const route = useRoute();

const id = ref(route.params.id)
const productsStore = useProductsSstore()
const { getProduct } = storeToRefs(productsStore);
const isLoading = ref(false)
onMounted(async () => {
    isLoading.value = true
    await productsStore.fetchProductById(id.value as string);
    setTimeout(() => {
        isLoading.value = false
    }, 1000)
})


watch(() => id, () => {
    productsStore.fetchProductById(id.value as string)
});

console.log('getProduct ID', getProduct)




</script>

<style scoped></style>