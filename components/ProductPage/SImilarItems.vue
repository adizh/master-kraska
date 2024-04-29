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


const props = defineProps({
    similarItems: {
        type: Array as PropType<Product[]>
    }
})
const slicedSimilarItems = computed(() => props.similarItems?.slice(0, 3))



</script>

<style scoped lang="scss">
.similar-prod-item {
    margin-top: 80px;
    &-list {
        @include flex(row, start, center);

    }

    .item-block {
        width: 24%;
    }

}


@media (max-width:1000px) {
    .similar-prod-item .item-block {
        width: 30% !important;


    }
}

@media (max-width:820px) {
    .similar-prod-item .item-block {
        width: 35% !important;

        &-name {
            margin-bottom: 15px;
        }


    }

    .similar-prod-item-list {
        flex-wrap: wrap;
    }
}

@media (max-width:780px) {
    .similar-prod-item-list {


        .item-block {
            width: 48% !important;


        }
    }


}

@media (max-width:576px) {
    .similar-prod-item-list {
        .item-block {
            width: 100% !important;
        }
    }

}
</style>