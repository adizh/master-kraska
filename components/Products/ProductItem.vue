<template>
    <div class="item-block" @click="navigateTo(`/product/${product?.id}`)">
        <div v-if="type === 'bookmark'" class="bookmark-icon-heart "
            @click.stop="emit('addItemToBookmarks', product?.id as string)">
            <img src="../../assets/icons/icon=heart fill.svg" alt="heart icon">
        </div>
        <slot name="edit-items"></slot>
        <NuxtImg src="/test-kraska.png"></NuxtImg>
        <span class="item-block-name">{{ productName }}</span>

        <div class="item-block-info">
            <div class="each-block-info-col">
                <span class="text">Расход: </span>
                <span class="text-data">{{ product?.expenditure }}</span>
            </div>
            <div class="each-block-info-col"> <span class="text">Фасовка: </span>
                <span class="text-data"> {{ product?.packing }}</span>
            </div>
            <div class="each-block-info-col"> <span class="text">Бренд: </span>
                <span class="text-data">{{ product?.brandName }}</span>
            </div>
        </div>
        <button class="item-block-buy">{{ product?.price }} сом</button>
    </div>
</template>

<script setup lang="ts">
import { Product } from '@/types/Product'
const props = defineProps<{
    type?: string,
    product?: Product,

}>()




const emit = defineEmits<{
    addItemToBookmarks: [string]

}>()

const productName = computed(() => {
    return props?.product?.name && props?.product?.name?.length > 65 ? props?.product?.name.slice(0, 65) + '...' : props?.product?.name
})
</script>

<style scoped lang="scss">
.item-block {
    transition: .3s ease all;
    border-radius: 10px;
    @include flex(column, space-between, center);


}

.item-block {
    width: 90%;
    padding: 20px 32px;
    overflow: hidden;


    img {
        width: 70%
    }

    &-name {
        max-width: $product-item-width;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        color: $main-black;
        width: 100%;
        display: block;
        text-align: left;





        line-height: 20px;

    }

    &-info {
        max-width: $product-item-width;
        width: $product-item-width;

    }

    &-buy {
        @extend %button-shared;
        font-weight: 600;
        font-size: 20px;
        width: $product-item-width
    }
}

.each-block-info-col {
    @include flex(row, space-between, center);
}

.item-block:hover {
    cursor: pointer;
    box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.12);
    transition: .3s ease all;
}
</style>