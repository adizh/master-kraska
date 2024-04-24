<template>
    <div v-for="seller in allBrands" :key="seller?.id" class="all-sellers-each">
        <img :src="seller?.image" alt="seller" class="seller-pic">
        <h3 class='text-center'>{{ seller?.name }}</h3>
        <span class="sub-info-seller">{{ seller?.sellerInfo }}</span>

    </div>
</template>

<script setup lang="ts">
const brandsStore = useBrandsStore();

const props = defineProps({
    items: {
        type: Number,
        default: 0
    }
})

onMounted(() => {
    brandsStore.fetchAllSellers()
})

const allBrands = computed(() => {
    return props?.items ? brandsStore.getAllSellers?.slice(0, 4) : brandsStore.getAllSellers
})
</script>

<style scoped lang="scss">
.sub-info-seller {
    @extend %sub-info;
    color: #000 !important;
    max-width: 200px;
    text-align: center;
}

.seller-pic {
    width: 140px;
}

%sub-info {
    @include textFormat(16px, 24px, 400, #000);
}



.all-sellers-each {
    @include flex(column, center, center);
    margin-top: 50px;
    width: 22%;
}

.all-sellers-info {
    margin: 20px 0 0px 0;
    max-width: 680px;
    @extend %sub-info;
}

@media (max-width:1000px) {
    .all-sellers-each {
        width: 30%;
    }
}

@media (max-width:756px) {
    .all-sellers-each {
        width: 35%;
    }
}

@media (max-width:480px) {
    .all-sellers-each {
        width: 100%;

        h3 {
            font-size: 16px !important
        }

        .sub-info-seller {
            font-size: 14px !important
        }
    }
}
</style>