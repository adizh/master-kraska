<template>
    <section v-if="getProduct && getProduct != undefined && Object.entries(getProduct)?.length > 0">
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
import { Product } from '~/types/Product';
const route = useRoute();
const authStore = useAuthStore()
const id = route.params.id
const product = ref<{ product: Product, similarProducts: Product[] }>({} as { product: Product, similarProducts: Product[] })
const productsStore = useProductsSstore()
const { getProduct } = storeToRefs(productsStore);

onMounted(async () => {
    await productsStore.fetchProductById(id as string)
})
watch(() => id, () => {
    productsStore.fetchProductById(id as string)
});

console.log('getProduct ID', getProduct)




</script>

<style scoped></style>