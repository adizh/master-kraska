<template>
    <div class="main-page-header">
        <Swiper :modules="[SwiperNavigation, SwiperPagination]" :slides-per-view="1"
            :pagination="{ enabled: true, clickable: true, }" :navigation="true" class="swiper"
            :style='{ "--swiper-navigation-size": "15px", "padding": "20px 0" }'>


            <SwiperSlide v-for="slide in 3" :key="slide">
                <div class="left">
                    <h1>Мастер Краска</h1>
                    <div class="sub-header">Официальный представитель мировых брендов лакокрасочной продукции
                    </div>
                    <button>
                        Пободбрать по параметрам</button>
                </div>
                <div class="right">
                    <NuxtImg src='/main-page.png' />
                </div>
            </SwiperSlide>
        </Swiper>


    </div>




</template>

<script lang="ts" setup>




</script>


<style scoped lang="scss">
.main-page-header {
    background: $main-white;
    border-radius: 10px;
    padding: 4.5rem 0 4.5rem 4rem;
    @include flex(row, space-around, center);
    margin-top: 8rem;
}

.right {
    width: 33%;

    img {
        width: 100%;
    }
}

.left {
    @include flex(column, center, start, 1px)
}

h1 {
    color: $main-pink;
    line-height: 92px;
    font-weight: 600;
    font-size: 74px;
}

.sub-header {
    color: $main-black;
    font-size: 28px;
    font-weight: 500;
    max-width: 500px;
}

button {
    @extend %button-shared;
    display: block;
    margin-top: 2.6rem;
    font-size: 20px;
}



:deep(.swiper-button-next) {
    top: 97% !important;
    position: absolute;
    color: #000;
    right: 5.9rem !important;
}

:deep(.swiper-button-prev) {
    top: 97% !important;
    position: absolute;
    left: 83.8%;

    color: #000;
}

:deep(.swiper-pagination, .swiper-pagination-custom, .swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal) {
    display: flex !important;
    width: 90% !important;
    justify-content: flex-end !important
}

:deep(.swiper-slide) {
    @include flex(row, space-between, center !important)
}
</style>