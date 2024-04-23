<template>
    <div class="results" :class="{ 'horizontal': visibleMethod === 'horizontal' }">
        <CatalogProductItem v-for="item in productStore.getFilteredProducts" :key="item?.id"
            :visibleMethod="visibleMethod" :product="item" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    visibleMethod: string
}>()


const productStore = useProductsSstore()


</script>


<style scoped lang="scss">
.results {
    @include flex(row, start, center);
    flex-wrap: wrap;
}

.horizontal {
    @include flex(column, start, center);
}
</style>