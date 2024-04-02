<template>
    <div class="popular-products">
        <h5 class='each-section-header'>Популярные товары</h5>
        <div class="products-list">
            <Swiper :slides-per-view="3" :navigation="true" id="mySlider" :modules="[SwiperNavigation]"
                :style='{ "--swiper-navigation-size": "15px", "padding": "20px 0" }'>
                <SwiperSlide v-for="product in store.getAllProducsts" :key="product.id">
                    <ProductsProductItem :product="product" />
                </SwiperSlide>
            </Swiper>
        </div>

    </div>
</template>

<script setup lang="ts">
const store = useProductsSstore();
onMounted(() => {
    store.fetchAllProducts();

})
</script>

<style scoped lang='scss'>
.popular-products {
    margin-top: 40px;
}


.products-list {
    @include flex(row, space-around, center);
    flex-wrap: wrap;
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