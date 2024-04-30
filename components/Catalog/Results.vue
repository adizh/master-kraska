<template>
    <div class="items" v-if="productStore?.getFilteredProducts?.length > 0 && !productStore.getLoadingState">
        <div class="results" :class="{ 'horizontal': visibleMethod === 'horizontal' }">
            <CatalogProductItem v-memo="[productStore.getFilteredProducts]" v-for="item in productStore.getFilteredProducts" :key="item?.id"
                :visibleMethod="visibleMethod" :product="item" />

        </div>
        <div>
            <UIPagination :total="productStore.getProdTotal?.totalPages"
                :currentActive="productStore.filters.currentPage" @changePage="changePage" />
        </div>


    </div>


    <div v-else-if="!productStore.getLoadingState && !productStore?.getFilteredProducts?.length">
        {{ $t('noData') }}
    </div>
    <div v-else class="text-center">
        <ProgressSpinner />
    </div>
</template>

<script setup lang="ts">

const productStore = useProductsSstore()
const changePage = (page: number) => {
    productStore.filters.currentPage = page;


    productStore.filterProducts();

}
const props = defineProps<{
    visibleMethod: string
}>()



</script>


<style scoped lang="scss">
.items {
    @include flex(column, start, start, 2rem);
}

.results {
    @include flex(row, start, center);
    flex-wrap: wrap;
}

.horizontal {
    @include flex(column, start, center);
}

@media (max-width:768px){
    .results{
        justify-content: space-evenly;
    }
}
</style>