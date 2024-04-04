<template>
    <section>
        <CatalogFilters />

    </section>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id;

const { data: catalog } = useApi(`/api/v1/Category/get-category/${id}`);
console.log('catalog', catalog)

</script>

<style scoped></style>