<template>
    <section>
        <ProductPageHeader :product="data?.product" />
        <!-- <ProductPageInfo :item="data?.product" />
        <ProductPageSImilarItems :similarItems="data?.similarProducts" />
        <ProductPageReviews :item='data?.product' /> -->
    </section>
</template>

<script setup lang="ts">
import { Product } from '~/types/Product';
const route = useRoute()
const id = ref(route.params.id)
const { data, error, status, pending } = await useApi<Product>(`/api/v1/Product/get-product-by-id/${id.value}`, {
    watch: [id]

}) as any;
console.log('data fetch single Product', data)




</script>

<style scoped></style>