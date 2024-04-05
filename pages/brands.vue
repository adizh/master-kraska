<template>
    <section>
        <div class="main-header-h1">Бренды</div>


        <div class="brands-list">
            <div v-for="item in brandsStore.getAllBrands" :key=item?.id>
                <img :src="item?.logo" alt="brand logo">
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const brandsStore = useBrandsStore()
onMounted(() => {
    brandsStore.fetchAllBrands()
})

</script>

<style scoped lang="scss">
.brands-list {
    margin: 40px;
    @include flex(row, space-between, center);
    flex-wrap: wrap;

    div {
        width: 20%;
    }

    img {
        width: 100%
    }

}
</style>