<template>
    <section class="all-sellers">
        <h1>{{ $t('sellers') }}</h1>
        <p class='all-sellers-info sub-info'>{{ $t('sellersInfo') }}</p>
        <div class="all-sellers-blocks">
            <div v-for="seller in brandsStore.getAllSellers" :key="seller?.id" class="all-sellers-each">
                <img :src="seller?.image" alt="seller" class="seller-pic">
                <h3 class='text-center'>{{ seller?.name }}</h3>
                <span class="sub-info-seller">{{ seller?.sellerInfo }}</span>
                <img :src="seller?.certificateImage" alt="certificate" class="certificate">
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const brandsStore = useBrandsStore();
onMounted(() => {
    brandsStore.fetchAllSellers()
})
</script>

<style scoped lang="scss">
%sub-info {
    @include textFormat(16px, 24px, 400, #000);

}

.sub-info-seller {
    @extend %sub-info;
    color: #000 !important;
    max-width: 200px;
    text-align: center;

}

.seller-pic {
    width: 140px;
}
</style>