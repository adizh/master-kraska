<template>
    <div>
        <div class="sub-header-section">
            <h5 class='each-section-header'>{{ $t('discounts') }}</h5>

            <button class="look-all-btn" @click="navigateTo('/discount')">
                <span>{{ $t('lookAll') }}</span>
                <img src='../assets/icons/icon=components-more.svg'  alt="more"/>

            </button>
        </div>
        <div class="actions-block">
            <DiscountItem />
        </div>


        <div class="brands-info">
            <h5 class='each-section-header brands'>{{ $t('brands') }}</h5>
            <p class="brands-text">{{ $t('brandsInfo') }}</p>
            <button class="look-all-btn" @click="navigateTo('/brands')">
                <span>{{ $t('lookAll') }}</span>
                <img src='../assets/icons/icon=components-more.svg' alt="more" />
            </button>
        </div>

        <div class="brands-pictures">
            <Swiper :slides-per-view="4" :loop="true" :modules="[SwiperAutoplay, SwiperController, SwiperNavigation]"
                :autoplay="{
                delay: 2000,
                disableOnInteraction: true,
            }">
                <SwiperSlide v-for="item in brandsStore.getAllBrands" :key="item.id">
                    <img :src="item?.logo" alt="logo"
                        @click="navigateTo({ path: `/catalog/${firstCategoryItem?.category?.id}`, query: { brandId: item?.id } })" />
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Category } from '~/types/Category';

const brandsStore = useBrandsStore()
const catalogStore = useCatalogStore();

const firstCategoryItem = ref({} as Category)
onMounted(async () => {
    await catalogStore.fetchAllCategories()
    brandsStore.fetchAllBrands()

    if (catalogStore.getAllCategories?.length > 0) {
        firstCategoryItem.value = catalogStore.getAllCategories[0];
    }

})






</script>

<style scoped lang="scss">
.brands {
    text-align: center
}

.sub-header-section {
    @include flex(row, space-between, center);
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
    margin-top: 20px;
    padding: 20px;
    border-top: 1px solid $slider-border-color;

    img {
        width: 250px;
        max-height: 200px;
        height: 140px;
        object-fit: contain !important;
        margin: 0 10px;
    }

}

:deep(.slider) {
    width: 100%;
    @include flex(row, space-around, center);
}

:deep(.swiper-slide) {
    margin: 0 15px;
}




@media (max-width:1000px) {
    .brands-pictures img {
        width: 100% !important;
    }
}
@media (max-width:768px){
    .actions-block {
       flex-direction: column;
       align-items: center;
    } 
}

@media (min-width:320px) and (max-width:768px) {
    .brands-text {
        max-width: 100%;
    }
}
</style>