<template>
    <div class="similar-prod-item">
        <h5 class='each-section-header'>{{ $t('alsoBuy') }}</h5>
        <div class="similar-prod-item-list" v-if="similarItems?.length">

            <ProductsProductItem v-for="(item, index) in similarItems.slice(0, 3)" :key="index" :product="item" />

        </div>

        <div v-else>{{ $t('noData') }}</div>
    </div>
</template>

<script setup lang="ts">

import { Product } from '~/types/Product';


const props = defineProps<{
    similarItems: PropType<Product[]>

}>()


console.log('similarItems', props?.similarItems)
</script>

<style scoped lang="scss">
.similar-prod-item {
    &-list {
        @include flex(row, start, center);
        flex-wrap: wrap;
    }
}
</style>