<template>
  <div class="search-options" :class="{ open: isSearchOpen }">
    <div v-if="productStore?.getLoadingState" class="text-center">
      <ProgressSpinner />
    </div>

    <ul
      class="search-res-header"
      v-else-if="
        productStore?.getFilteredProducts?.length > 0 &&
        !productStore?.getLoadingState
      "
    >
      <li
        v-for="item in productStore.getFilteredProducts.slice(0, 3)"
        :key="item?.id"
        @click="goToProd(item?.id)"
      >
        <img :src="item?.images[0]" alt="img-product" class="prod-image" />
        <span class="prod-search-name">{{ item?.name }}</span>
      </li>
    </ul>
    <p v-else>
      {{ $t("noData") }}
    </p>

    <button
      class="look-all-btn"
      v-if="
        productStore?.getFilteredProducts?.length > 0 &&
        !productStore?.getLoadingState
      "
      @click.stop="router.push('/catalog')"
    >
      <span>{{ $t("lookAll") }}</span>
      <img src="../assets/icons/icon=components-more.svg" alt="more" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Category } from "~/types/Category";
const props = defineProps<{
  isSearchOpen: boolean;
}>();

const catalogStore = useCatalogStore();
const router = useRouter();
const emit = defineEmits(["closeSearch"]);
const goToProd = (id: string) => {
  navigateTo(`/product/${id}`);
  emit("closeSearch");
};
const firstCategoryItem = ref({} as Category);
const productStore = useProductsSstore();

console.log(
  "productStore.getFilteredProducts in Searchoptions",
  productStore.getFilteredProducts,
);
onMounted(async () => {
  await catalogStore.fetchAllCategories();
  firstCategoryItem.value = catalogStore?.getAllCategories[0];
});
</script>

<style scoped lang="scss">
.search-options {
  @include openedOptionsHeader(100%, 20px, 3.3rem);
  border: 1px solid $slider-border-color;
  border-radius: 10px;
  z-index: 4 !important;
}

.open {
  opacity: 1;
  visibility: visible;
  transition: 0.3s ease all;
}

.search-res-header li {
  @include flex(row, space-between, center);
  margin: 5px 0;
}

.search-res-header {
  @include flex(column, space-between, start, 15px);
}

.look-all-btn {
  width: 100%;
  margin-top: 20px;
}

li:hover {
  cursor: pointer;
}
.prod-image {
  width: 50px;
}
</style>
