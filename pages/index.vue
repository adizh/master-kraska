<template>
  <section>
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
        <div class="btn-block">
          <button>Найти</button>
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
    <IndexMain />
    <Products />
    <Actions />
    <Advantages />
  </section>
</template>

<script setup lang="ts">
const productStore = useProductsSstore();
const isSearchOpen = ref(false);
const handleSearch = (event: any) => {
  isSearchOpen.value = event.target.value.trim().length > 0;
  productStore.filterProducts();
};

watch(isSearchOpen, (value) => {
  if (value) {
    disableBodyScroll();
  } else {
    enableBodyScroll();
  }
});
const disableBodyScroll = () => {
  document.body.style.overflow = "hidden";
};
const enableBodyScroll = () => {
  document.body.style.overflow = "auto";
};
onUnmounted(() => {
  document.body.style.overflow = "auto";
});
</script>

<style scoped lang="scss">
.search-place {
  position: relative;
  width: 100%;
  margin-bottom: 40px;

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
