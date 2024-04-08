<template>
    <div class="popular-products">
        <h5 class='each-section-header'>Популярные товары</h5>
        <div class="products-list">
            <Swiper :slides-per-view="4" :navigation="true" id="mySlider" :modules="[SwiperNavigation]"
                :style='{ "--swiper-navigation-size": "15px", "padding": "20px 0" }'>
                <SwiperSlide v-for="product in popularItems" :key="product.id">
                    <ProductsProductItem :product="product" />
                </SwiperSlide>
            </Swiper>
        </div>

    </div>
</template>

<script setup lang="ts">
import { Product } from '~/types/Product';

const store = useProductsSstore();
onMounted(() => {
    store.fetchAllProducts();
})

console.log('store.getAllProducsts', store.getAllProducsts);

const popularItems = computed(() => {
    return store.getAllProducsts.filter((item: Product) => item.isPopular)
})
</script>

<style scoped lang='scss'>
.popular-products {
    margin-top: 40px;
}

.item-block {
    width: 100%;
}

.products-list {
    padding-left: 20px;
}

:deep(.swiper-slide) {
    @include flex(row, start, start);
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