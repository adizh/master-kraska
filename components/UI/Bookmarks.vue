<template>
  <button @click.stop="toggleBoomark(product?.id)" v-if="!isProductBookmarked">
    {{ $t("toBookmarks") }}
    <img src="../../assets/icons/icon=heart.svg" alt="heart" />
  </button>
  <button @click.stop="toggleBoomark(product?.id)" v-else>
    {{ $t("remove") }}
    <img src="../../assets/icons/icon=heart fill.svg" alt="heart icon" />
  </button>
</template>

<script setup lang="ts">
import { Product } from "~/types/Product";
const productsStore = useProductsSstore();
const props = defineProps<{
  product: Product;
}>();
const isProductBookmarked = ref(false);
const toggleBoomark = (id: string) => {
  isProductBookmarked.value = !isProductBookmarked.value;
  productsStore.addToBookmarks(id);
};
onMounted(async () => {
  await productsStore.getBookmarks(props?.product?.id);
  isProductBookmarked.value = productsStore.getProductBookmarked;
  console.log("getProductBookmarked", productsStore.getProductBookmarked);
});
</script>

<style scoped lang="scss">
button {
  @include footerSpan(20px, 16px);
  font-weight: 400;
  color: $main-black;
  background: $light-blue;
  padding: 4px 8px;
  border: none;
  border-radius: 10px;
  @include flex(row, center, center, 5px);
}
</style>
