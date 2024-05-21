<template>
  <div class="popular-products">
    <h5 class="each-section-header">{{ $t("popularProducts") }}</h5>
    <div class="products-list" v-if="store.getPopularProducts?.length > 0">
      <Swiper
        :slides-per-view="slidesPerView"
        :navigation="true"
        id="mySlider"
        :modules="[SwiperNavigation]"
        :style="{ '--swiper-navigation-size': '15px', padding: '20px 0' }"
      >
        <SwiperSlide
          v-for="product in store.getPopularProducts"
          :key="product.id"
        >
          <ProductsProductItem :product="product" :style="{ width: '100%' }" />
        </SwiperSlide>
      </Swiper>
    </div>

    <div v-else class="text-center">
      <ProgressSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
const slidesPerView = ref(4);

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
onMounted(async () => {
  handleResize();
  window.addEventListener("resize", handleResize);
  await store.fetchSpecialProd("popular");
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped lang="scss">
.popular-products {
  margin-top: 40px;
}

.item-block {
  width: 100% !important;
}

.products-list {
  padding-left: 20px;
}

:deep(.swiper-button-next, .swiper-button-prev),
:deep(.swiper-button-prev) {
  color: black !important;
  border: 1px solid $slider-border-color !important;
  padding: 10px;
  border-radius: 100%;
  width: 36px;
  height: 36px;
}
:deep(.swiper-button-prev) {
  margin-left: -10px;
}

:deep(.swiper-button-next) {
  margin-right: -10px;
}

:deep(.slider-wrapper) {
  display: flex;
}
</style>
