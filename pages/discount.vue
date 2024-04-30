<template>
    <section>
        <div class="main-header-h1">{{ $t('discountPageHeader') }}</div>
        <div class="actions-block">
            <DiscountItem />
        </div>
    </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@media (max-width:1900px) {

    .actions-block {
        margin-top: 40px;
        flex-wrap: wrap;
        gap: 20px;

        div {
            width: 30% !important;
        }
    }
}

@media (max-width:768px) {
    .actions-block {

        div {
            width: 45% !important;
        }
    }
}
</style>