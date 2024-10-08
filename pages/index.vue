<template>
  <section class="home-section">
    <IndexMain />
    <div class="search-place">
      <div class="flex flex-row gap-4 search">
        <div class="input-block">
          <input
            v-model="productStore.filters.search"
            type="text"
            class="main-header-input"
            :placeholder="$t('whichProSearch')"
            @input="handleSearch"
          >
          <img
            src="../assets/icons/icon=search.svg"
            alt="search"
            class="search-icon"
          >
        </div>
        <div class="btn-block" @click.stop="router.push(`/catalog`)">
          <button>{{ $t("find") }}</button>
        </div>
      </div>
      <SearchOptions
        :is-search-open="isSearchOpen"
        @close-search="isSearchOpen = false"
      />
      <div
        v-show="isSearchOpen"
        class="overlay-header-options"
        :class="{ open: isSearchOpen }"
      />
    </div>
    <Products />
    <Actions />
    <Advantages />
  </section>
</template>

<script setup lang="ts">
import { Category } from "~/types/Category";

const productStore = useProductsSstore();
const catalogStore = useCatalogStore();
const isSearchOpen = ref(false);
const firstCategoryItem = ref({} as Category);
const router = useRouter();
const handleSearch = (event: any) => {
  setTimeout(() => {
    isSearchOpen.value = event.target?.value?.trim().length > 0;
    productStore.filters.search = event.target?.value;
    productStore.filterProducts(event.target?.value);
  }, 2000);
};

function adjustSearchPlaceMargin () {
  const sliderImg = document.querySelector(".slider-img") as HTMLElement;
  const searchPlace = document.querySelector(".search-place") as HTMLElement;

  if (sliderImg && searchPlace) {
    const sliderHeight = sliderImg.offsetHeight + 40;
    searchPlace.style.marginTop = `${sliderHeight}px`;
  }
}

onMounted(async () => {
  await catalogStore.fetchAllCategories();
  firstCategoryItem.value = catalogStore?.getAllCategories[0];
  adjustSearchPlaceMargin();
  window.addEventListener("resize", adjustSearchPlaceMargin);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", adjustSearchPlaceMargin);
});
</script>

<style scoped lang="scss">
section {
  margin-top: -2.6rem;
}

.search-place {
  width: 100%;
  margin-bottom: 40px;
  position: relative;
  button {
    box-shadow: 0px 0px 0px 0.5px #0000000d;
    box-shadow: 0px 0.5px 2.5px 0px #0000004d;
    padding: 16px 20px;
    border-radius: 8px;
    @include textFormat(16px, 20px, 500, $main-blue);
    outline: none;
    border: none;
    background: white;
    width: 100%;
    transition: 0.3s;
    &:hover {
      @extend %blue-bnt-hover;
      transition: 0.3s;
      cursor: pointer;
    }
  }

  .input-block {
    width: 75%;
    position: relative;

    .search-icon {
      position: absolute;
      top: 27%;
      left: 5px;
    }
  }

  .btn-block {
    width: 25%;
  }

  input {
    padding: 16px 20px;
    border-radius: 8px;
    padding-left: 40px;
  }
}

@media (max-width: 768px) {
  .search {
    flex-direction: column !important;
    align-items: center;
    .input-block {
      width: 100%;
    }
    .btn-block {
      width: 40%;
    }
  }
}
</style>
