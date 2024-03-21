<template>
    <div class="item-block">
        <NuxtImg src="/test-kraska.png"></NuxtImg>
        <span class="item-block-name">Финниколор Оазис краска для потолков</span>
        <div class="item-block-info">
            <div class="each-block-info-col">
                <span class="text">Расход: </span>
                <span class="text-data">7-12 кв.м/л</span>
            </div>
            <div class="each-block-info-col"> <span class="text">Фасовка: </span>
                <span class="text-data"> 2.7/2.5/5/9</span>


            </div>
            <div class="each-block-info-col"> <span class="text">Бренд: </span>
                <span class="text-data">TIKKURILA</span>
            </div>
        </div>
        <button class="item-block-buy">200 сом</button>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.item-block {
    transition: .3s ease all;
    border-radius: 10px;
    @include flex(column, space-between, center)
}

.item-block {
    width: 90%;
    padding: 20px 32px;

    &-name {
        max-width: $product-item-width;
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        color: $main-black;
        line-height: 20px;

    }

    &-info {
        color: $main-dark-grey;
        font-size: 14px;
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
    margin: 10px 0;
}

.item-block:hover {
    cursor: pointer;
    box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.12);
    transition: .3s ease all;
}
</style>