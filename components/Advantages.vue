<template>
    <div class='each-section'>

        <h5 class='each-section-header'>Наши преимущества</h5>
        <div class="advan-block">
            <div class="left">
                <div class="left-item" v-for="item in advantagesOptions" :key="item.number">
                    <span class="left-item-number">{{ item.number }}</span>
                    <div>
                        <div class="left-item-text">{{ item.header }}</div>
                        <p class="left-item-subtext">{{ item.text }}</p>
                    </div>
                </div>
            </div>
            <div class="right">
                <img src="../assets/images/advantage-img 1.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { advantagesOptions } from '@/assets/js/advantages'
</script>

<style scoped lang="scss">
.advan-block {
    background: $advan-bg;
    width: 100%;
    color: white;
    padding: 4.3rem 0 0 2rem;
    border-radius: 20px;
    @include flex(row, space-between, center);

}

.right {
    width: 35%;



    img {
        width: 100%;

    }
}

.left {
    @include flex(row, space-between, center);
    flex-wrap: wrap;
    width: 70%;

    &-item {
        width: 45%;
        @include flex(row, auto, center);

        &-number {
            color: $advan-text-color;
            font-size: 80px;
            font-weight: 800;
        }

        &-text {
            font-size: 24px;
            font-weight: 700;
        }

        &-subtext {
            font-size: 16px;
            font-weight: 400;
        }
    }
}
</style>