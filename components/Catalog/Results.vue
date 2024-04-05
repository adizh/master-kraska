<template>
    <div class="results" :class="{ 'horizontal': visibleMethod === 'horizontal' }">
        <CatalogProductItem :visibleMethod="visibleMethod" />
        <CatalogProductItem :visibleMethod="visibleMethod" />
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

.horizontal {
    @include flex(column, start, center);
}
</style>