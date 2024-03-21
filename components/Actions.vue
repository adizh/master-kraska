<template>
    <div class="each-section">
        <div class="sub-header-section">
            <h5 class='each-section-header'>Акции</h5>

            <button class="look-all-btn">
                <span>Смотреть все</span>
                <img src='../assets/icons/icon=components-more.svg' />


            </button>
        </div>
        <div class="actions-block">
            <div class="actions-block-item">
                <div class="actions-block-item-header">Скидки на краски "Tikkurila"</div>
                <p class="actions-block-item-info">
                    В каждом магазине "Мастер Краска" ежемесячно вас ждут скидки на продукцию компании "TIKKURILA"
                </p>
            </div>
            <div class="actions-block-item">

                <div class="actions-block-item-header">Скидки на краски "Tikkurila"</div>
                <p class="actions-block-item-info">
                    В каждом магазине "Мастер Краска" ежемесячно вас ждут скидки на продукцию компании "TIKKURILA"
                </p>
            </div>
            <div class="actions-block-item">

                <div class="actions-block-item-header">Скидки на краски "Tikkurila"</div>
                <p class="actions-block-item-info">
                    В каждом магазине "Мастер Краска" ежемесячно вас ждут скидки на продукцию компании "TIKKURILA"
                </p>
            </div>
        </div>


        <div class="brands-info">
            <h5 class='each-section-header brands'>Бренды</h5>
            <p class="brands-text">Компания "Мастер Краска" является официальным поставщиком лакокрасочных материалов
                следующих брендов:</p>
            <button class="look-all-btn">
                <span>Смотреть все</span>
                <img src='../assets/icons/icon=components-more.svg' />


            </button>
        </div>

        <div class="brands-pictures">
            <NuxtImg src="/brands/decor.png"></NuxtImg>
            <NuxtImg src="/brands/marshall.png"></NuxtImg>
            <NuxtImg src="/brands/Apollo.png"></NuxtImg>
            <NuxtImg src="/brands/arcobaleno.png"></NuxtImg>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.brands {
    text-align: center
}

.sub-header-section {
    @include flex(row, space-between, center);
}

.actions-block {
    @include flex(row, space-between, start);


    &-item {
        background: $main-white;
        padding: 20px 10px 25px 10px;
        border-radius: 10px;
        text-align: center;

        &-header {
            font-size: 20px;
            font-weight: 600;
        }

        &-info {
            color: $main-dark-grey;
            font-size: 16px;
        }
    }
}

.brands-info {
    margin-top: 3rem;
    @include flex(column, center, center);
}

.brands-text {
    max-width: 50%;
    text-align: center;
}

.brands-pictures {
    width: 100%;
    margin-top: 20px;
    border-top: 1px solid $slider-border-color;
    padding: 20px;
}

.brands-pictures {
    width: 100%;

    @include flex(row, space-around, center);

    img {
        width: 23%;
    }
}
</style>