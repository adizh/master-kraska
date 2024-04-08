<template>
    <div class="popular-products">
        <h5 class='each-section-header'>Выгодные товары</h5>
        <div class="products-list">
            <Swiper :slides-per-view="2" :navigation="true" id="mySlider" :modules="[SwiperNavigation]"
                :style='{ "--swiper-navigation-size": "15px", "padding": "20px 0" }'>
                <SwiperSlide>
                    <ProductsProductItem v-for="product in beneficialItems" :key="product.id" :product="product" />
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

const beneficialItems = computed(() => {
    return store.getAllProducsts.filter((item: Product) => item.isBeneficial)
})
</script>

<style scoped lang='scss'>
.popular-products {
    margin-top: 40px;
}

.item-block {
    width: 65%
}

.products-list {
    padding-left: 20px;
}

:deep(.swiper-slide) {
    @include flex(row, start, start);
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