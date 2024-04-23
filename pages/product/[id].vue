<template>
    <section v-if="getProduct && getProduct != undefined && Object.entries(getProduct)?.length > 0">
        <ProductPageHeader :productId="id" />
        <!-- <ProductPageInfo :item="data?.product" />
        <ProductPageSImilarItems :similarItems="data?.similarProducts" />
        <ProductPageReviews :item='data?.product' /> -->
    </section>

    <section v-else>loading...</section>
</template>

<script setup lang="ts">
import { Product } from '~/types/Product';
const route = useRoute();
const authStore = useAuthStore()
const id = route.params.id
const product = ref<{ product: Product, similarProducts: Product[] }>({} as { product: Product, similarProducts: Product[] })
const productsStore = useProductsSstore()
const { getProduct } = storeToRefs(productsStore)
onMounted(async () => {
    await productsStore.fetchProductById(id as string)


})





</script>

<style scoped></style>