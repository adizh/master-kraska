<template>
    <div class="similar-prod-item">
        <h5 class='each-section-header'>Совместно покупают</h5>
        <div class="similar-prod-item-list">
            <ProductsProductItem />
            <ProductsProductItem />
            <ProductsProductItem />
            <ProductsProductItem />
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.similar-prod-item {
  &-list {
      @include flex(row, center, center)
  }
}
</style>