<template>
    <div class="similar-prod-item">
        <h5 class='each-section-header'>{{ $t('alsoBuy') }}</h5>
        <div class="similar-prod-item-list">

            <ProductsProductItem v-for="item in similarItems" :key="item?.id" :product="item" />

        </div>
    </div>
</template>

<script setup lang="ts">

import { Product } from '~/types/Product';


const props = defineProps<{
    similarItems: PropType<Product[]>

}>()
</script>

<style scoped lang="scss">
.similar-prod-item {
    &-list {
        @include flex(row, start, center)
    }
}
</style>