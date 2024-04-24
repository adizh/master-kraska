<template>
    <div class="popular-products">
        <h5 class='each-section-header'>{{ $t('popularProducts') }}</h5>
        <div class="products-list" v-if="popularItems?.length > 0">
            <Swiper :slides-per-view="slidesPerView" :navigation="true" id="mySlider" :modules="[SwiperNavigation]"
                :style='{ "--swiper-navigation-size": "15px", "padding": "20px 0" }'>
                <SwiperSlide v-for="product in popularItems" :key="product.id">
                    <ProductsProductItem :product="product" />

                </SwiperSlide>

            </Swiper>
        </div>

        <div v-else>
            <ProgressSpinner />
        </div>

    </div>
</template>

<script setup lang="ts">
import { Product } from '~/types/Product';
const slidesPerView = ref(4)

const handleResize = () => {
    if (window.innerWidth <= 576) {
        slidesPerView.value = 1;
    } else if (window.innerWidth <= 992) {
        slidesPerView.value = 2;
    } else if (window.innerWidth <= 1280) {
        slidesPerView.value = 3;
    } else {
        slidesPerView.value = 4;
    }
};
const store = useProductsSstore();
onMounted(() => {
    store.fetchAllProducts();
    handleResize(); // Call onMounted to set initial value
    window.addEventListener('resize', handleResize);
})

console.log('store.getAllProducsts', store.getAllProducsts);

const popularItems = computed(() => {
    return store.getAllProducsts.filter((item: Product) => item.isPopular)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
console.log('popularItems', popularItems);
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