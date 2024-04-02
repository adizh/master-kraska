<template>
    <section>
        <ProductPageHeader :product="data" />
        <ProductPageInfo :item="data" />
        <ProductPageSImilarItems />
        <ProductPageReviews :item='data' />
    </section>
</template>

<script setup lang="ts">
import { Product } from '~/types/Product';

const route = useRoute()
const id = route.params.id

const { data, error, status, pending } = useApi<Product>(`/api/v1/Product/get-product-by-id/${id}`) as any;
console.log('data fetch single Product', data)




</script>

<style scoped></style>