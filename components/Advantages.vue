<template>
    <div class='each-section'>

        <h5 class='each-section-header'>{{ $t('outAdvantages') }}</h5>
        <div class="advan-block">
            <div class="left">
                <div class="left-item" v-for="item in advantagesOptions" :key="item.number">
                    <span class="left-item-number">{{ item.number }}</span>
                    <div>
                        <div class="left-item-text">{{ item.header }}</div>
                        <p class="left-item-subtext">{{ $t(item.text) }}</p>
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
    margin: 80px 0;


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

@media (min-width:320px) and (max-width:768px) {
    .advan-block {
        align-items: end;
        padding: 20px 20px 18rem 10px;
        position: relative;

    }

    .right {
        position: absolute;
        bottom: 0;
        width: 60%;
        right: 0;
    }

    .left {
        flex-direction: column;
        align-items: start;
        margin: 20px 0;
        width: 100%;

        &-item {
            width: 100%;
            &-text{
                font-size: 16px;
                line-height: 24px;
            }
            &-subtext{
                font-size: 14px;
                line-height: 20px;
            }
        }
    }

    .left-item-number {
        font-size: 48px;
        line-height: 65px;
    }
}
</style>