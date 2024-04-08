<template>
    <div class="item-block" @click="navigateTo(`/product/${product?.id}`)" v-if="visibleMethod === 'vertical'">
        <div v-if="type === 'bookmark'" class="bookmark-icon-heart "
            @click.stop="emit('addItemToBookmarks', product?.id as string)">
            <img src="../../assets/icons/icon=heart fill.svg" alt="heart icon">
        </div>
        <slot name="edit-items"></slot>
        <img :src="product?.images[0]" alt="">
        <span class="item-block-name">{{ productName(product?.name) }}</span>

        <div class="item-block-info">
            <div class="each-block-info-col">
                <span class="text">Расход: </span>
                <span class="text-data">4343434</span>
            </div>
            <div class="each-block-info-col"> <span class="text">Фасовка: </span>
                <span class="text-data"> 43434</span>
            </div>
            <div class="each-block-info-col"> <span class="text">Бренд: </span>
                <span class="text-data">feererere</span>
            </div>
        </div>
        <button class="item-block-buy">323 сом</button>
    </div>





    <div class="item-block horizontal" @click="navigateTo(`/product/${product?.id}`)" v-else>
        <div class='first-col'>
            <img src="../../assets/images/test-kraska.png" alt="">
            <div class="first-sub-col"> <span class="item-block-name">Полуматовая универсальная эмаль на водной основе
                    MARSHALL EXPORT
                    AQUA</span>
                <div class="item-block-info">
                    <div class="each-block-info-col">
                        <span class="text">Расход: </span>
                        <span class="text-data">4343434</span>
                    </div>
                    <div class="each-block-info-col"> <span class="text">Фасовка: </span>
                        <span class="text-data"> 43434</span>
                    </div>
                    <div class="each-block-info-col"> <span class="text">Бренд: </span>
                        <span class="text-data">feererere</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="last-col">
            <button class="item-block-buy">323 сом</button>
            <UIBookmarks :product="product" />
        </div>


        <!-- <img src="../../assets/images/test-kraska.png" alt="">


        <span class="item-block-name">{{ productName('Полуматовая универсальн') }}</span>

        <div class="item-block-info">
            <div class="each-block-info-col">
                <span class="text">Расход: </span>
                <span class="text-data">4343434</span>
            </div>
            <div class="each-block-info-col"> <span class="text">Фасовка: </span>
                <span class="text-data"> 43434</span>
            </div>
            <div class="each-block-info-col"> <span class="text">Бренд: </span>
                <span class="text-data">feererere</span>
            </div>
        </div>
        <button class="item-block-buy">323 сом</button> -->
    </div>
</template>

<script setup lang="ts">
import { Product } from '@/types/Product'
const props = defineProps<{
    type?: string,
    product: Product,
    visibleMethod: string

}>()




const emit = defineEmits<{
    addItemToBookmarks: [string]

}>()

const productName = (name: string) => {
    return name && name?.length > 54 ? name.slice(0, 54) + '...' : name
}
</script>

<style scoped lang="scss">
.item-block {
    transition: .3s ease all;
    border-radius: 10px;

    @include flex(column, space-between, center);


}

.item-block {
    width: 35%;
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

        height: 60px;




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
    box-shadow: 0px 6px 18px 0px #0000001F;
    transition: .3s ease all;
}

.item-block.horizontal {
    width: 100%;
    @include flex(row, space-between, start);

    img {
        width: 35%;
    }

    .first-col {
        max-width: 65%;
        @include flex(row, space-between, start);
    }

    .first-sub-col {
        max-width: 80%;
    }

    .last-col {
        @include flex(column, start, start, 20px);
    }



    .item-block-info {
        margin-top: 16px;
    }

    .item-block-buy {
        width: 100%;
        button: 100%;
    }
}

.each-block-info-col {
    justify-content: start;
}
</style>