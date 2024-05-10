<template>
  <section>
    <section
      v-if="
        getProduct &&
          getProduct != undefined &&
          Object.entries(getProduct)?.length > 0 &&
          !isLoading
      "
    >
      <ProductPageHeader :product-id="id" />

      <ProductPageInfo :item="getProduct?.product" />

      <ProductPageSImilarItems :similar-items="getProduct?.similarProducts" />
      <ProductPageReviews :item="getProduct?.product" />
    </section>

    <section v-else class="flex flex-row justify-content-center">
      <ProgressSpinner />
    </section>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();

const id = route.params.id as string;

const productsStore = useProductsSstore();

const { getProduct } = storeToRefs(productsStore);

const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await productsStore.fetchProductById(id as string);
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

console.log('getProduct', getProduct);

watch(
  () => id,
  () => {
    productsStore.fetchProductById(id as string);
  }
);
</script>

<style scoped></style>
