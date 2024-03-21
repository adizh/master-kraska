<template>
    <div class="popular-products">
        <h5 class='each-section-header'>Выгодные товары</h5>
        <div class="products-list">
            <Swiper :slides-per-view="4" :loop="true" :navigation="true" id="mySlider" :parallax="true"
                :modules="[SwiperNavigation]" :style='{ "--swiper-navigation-size": "15px", "padding": "20px 0" }'>
                <SwiperSlide v-for=" slide  in  10 " :key="slide">
                    <ProductsProductItem />
                </SwiperSlide>
                <!-- <button @click="nextSlide">Next</button> -->

            </Swiper>

        </div>

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang='scss'>
.popular-products {
    margin-top: 40px;
}

.products-list {
    @include flex(row, space-around, center);
    flex-wrap: wrap
}





:deep(.swiper-button-next,
    .swiper-button-prev),
:deep(.swiper-button-prev) {
    color: black !important;
    border: 1px solid $slider-border-color !important;
    padding: 10px;
    border-radius: 100%;
    width: 36px;
    height: 36px
}
</style>