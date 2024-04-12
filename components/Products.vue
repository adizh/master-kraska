<template>
    <div class="each-section">
        <ProductsPopular />
        <ProductsUseful />
        <ProductsRecommended />


        <div class="koler">
            <h5 class="koler-header">Колеровка</h5>
            <p class="koler-text">Вы можете выбрать любой понравившийся цвет среди заданных фирм и посмотреть, как будет
                выглядеть тот или
                иной оттенок на поверхности</p>
            <button class="bg-white-btn" @click="navigateTo('/koler')">Начать процедуру</button>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.koler {
    background-image: url('/static/sofa.png');
    background-repeat: no-repeat;
    background-size: cover;
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

}

@media (min-width:768px) and (max-width:992px) {
    .koler {
        padding-bottom: .1rem;

        &-header {
            font-size: 48px;
            line-height: 65px;
        }

        &-text {
            max-width: 100%;
        }
    }
}
</style>