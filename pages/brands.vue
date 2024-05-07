<template>
    <section>
        <div class="main-header-h1">{{ $t('brands') }}</div>
        <div class="brands-list">
            <div v-for="item in brandsStore.getAllBrands" :key=item?.id>

                <img :src="item?.logo" alt="brand logo"
                    @click="router.push({ path: `/catalog/${firstCategoryItem?.category?.id}`, query: { brandId: item?.id } })">

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const brandsStore = useBrandsStore();
const catalogStore = useCatalogStore()
onMounted(async () => {
    await brandsStore.fetchAllBrands();
    await catalogStore.fetchAllCategories()
})
const router=useRouter()

const firstCategoryItem = catalogStore.getAllCategories[0];

</script>

<style scoped lang="scss">
.brands-list {
    margin: 40px;
    @include flex(row, space-between, center);
    flex-wrap: wrap;

    div {
        width: 20%;
        margin-bottom: 40px;
    }

    img {
        width: 100%
    }

}

@media (max-width:768px) {
    .brands-list {
        margin: 40px 0 40px 0;

        gap: 25px;

        div {
            width: 30%;
        }

    }
}


@media (max-width:480px) {
    .brands-list {


        div {
            width: 45%;
        }

    }
}
</style>