<template>
    <div class="each-section">
        <ProductsPopular />
        <!-- <ProductsUseful />
        <ProductsRecommended /> -->

        <div class="koler">
            <h5 class="koler-header">Колеровка</h5>
            <p class="koler-text">Вы можете выбрать любой понравившийся цвет среди заданных фирм и посмотреть, как будет
                выглядеть тот или
                иной оттенок на поверхности</p>
            <button class="koler-btn">Начать процедуру</button>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.koler {
    background: url('@/assets/images/sofa-img 1.png');
    background-repeat: no-repeat;
    background-size: contain;
    height: 100vh;
    background-position: center center;

    width: 100%;

    @include flex(column, center, start);
    padding-left: 3rem;

    &-header {
        color: $main-blue;
        line-height: 92px;
        font-size: 58px;
    }

    &-text {
        color: white;
        max-width: 42%;
        width: 60%;
        font-size: 16px;
        font-weight: 500;
    }

    &-btn {
        @extend %button-shared;
        color: $main-blue;
        box-shadow: 0px 0px 0px 0.5px rgba(0, 0, 0, 0.05) 0px 0.5px 2.5px 0px rgba(0, 0, 0, 0.3);
        background: white;
        font-weight: 500;
        margin-top: 20px;
        font-size: 20px;
    }
}
</style>