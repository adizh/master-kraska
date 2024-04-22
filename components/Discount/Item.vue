<template>
    <div class="actions-block-item">
        <div class="actions-block-item-header">{{ $t('discountHeader') }}</div>
        <p class="actions-block-item-info">
            {{ $t('discoutText') }}
        </p>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.actions-block {
    &-item {
        background: $main-white;
        padding: 20px 10px 25px 10px;
        border-radius: 10px;
        text-align: center;

        &-header {
            font-size: 20px;
            font-weight: 600;
        }

        &-info {
            color: $main-dark-grey;
            font-size: 16px;
        }
    }
}
</style>