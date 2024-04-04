<template>
    <div class="results">
        <ProductsProductItem />
        <ProductsProductItem />
        <ProductsProductItem />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    visibleMethod: string

}>()

</script>


<style scoped lang="scss">
.results {
    @include flex(row, start, center);
    flex-wrap: wrap;
}

.item-block {
    width: 40%;
}
</style>