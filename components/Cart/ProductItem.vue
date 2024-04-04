<template>
    <div class="cart-main-info-prod">
        <div class="cart-main-info-prod-items">
            <div class="cart-main-info-prod-img">
    

                <img src="../../assets/images/test-kraska.png" alt="">
            </div>
            <div class="cart-main-info-middle">
                <h3>{{ item?.name }}</h3>
                
                <div class="item-block-info">
                    <div class="each-block-info-col">
                        <span class="text">Расход: </span>
                        <span class="text-data">{{ item?.expenditure }}</span>
                    </div>
                    <div class="each-block-info-col"> <span class="text">Фасовка: </span>
                        <span class="text-data">{{ item?.packing }}</span>
                    </div>
                    <div class="each-block-info-col"> <span class="text">Бренд: </span>
                        <span class="text-data">{{ item?.brandName }}</span>
                    </div>
                </div>
            </div>
        </div>


        <div class="cart-main-info-count">

            <slot name="count-buttons"></slot>
            <!-- <button class="prod-count-buttons">
                <span>-</span>
                <span>12</span>
                <span>+</span>
            </button> -->

            <!-- <img src="../assets/icons/icon=trash.svg" alt=""> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ExtendedProduct } from '~/types/Product';

const props = defineProps<{
    item: ExtendedProduct
}>()
</script>

<style scoped></style>