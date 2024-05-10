<template>
  <section>
    <div class="header-help">
      <h1>
        {{
          authStore.getSelectedLang === "ru"
            ? category?.nameRu
            : category?.nameKg
        }}
      </h1>
      <div class="header-help-icons">
        <input
          v-model="productName"
          type="text"
          :placeholder="$t('searchPaint')"
          class="main-header-input"
          @input="handleSearch"
        >
        <div class="block-style-select">
          <img
            src="../../assets/icons/ep_menu.svg"
            alt="ep menu"
            @click="visibleMethod = 'vertical'"
          >
          <img
            src="../../assets/icons/f7_menu.svg"
            alt="menu"
            @click="visibleMethod = 'horizontal'"
          >
        </div>
      </div>
    </div>
    <div class="grid align-items-start main-filters">
      <div class="small-screen-filter">
        <span>{{ $t("filters") }}</span>
        <p
          v-if="!isFilterOpen"
          class="closed-filters"
          @click="isFilterOpen = true"
        >
          <span />
          <span />
          <span />
        </p>
        <p v-else class="open-filters" @click="isFilterOpen = false">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.9938 5L11.8529 10.1397L6.71322 5L5 6.71322L10.1397 11.8529L5 16.9926L6.71322 18.7058L11.8529 13.5661L16.9938 18.7058L18.707 16.9926L13.5673 11.8529L18.707 6.71322L16.9938 5Z"
              fill="#33587D"
            />
          </svg>
        </p>
      </div>
      <CatalogFilters
        class="col-3"
        :class="{ 'close-filters': !isFilterOpen, 'col-12': isFilterOpen }"
        @apply-filter="applyFilter"
      />

      <CatalogResults
        class="col-12 md:col-12 sm:col-12 lg:col-9 all-catalog-results"
        :visible-method="visibleMethod"
        :class="{ close: isFilterOpen }"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
type VisibleMethod = 'vertical' | 'horizontal';
const visibleMethod = ref<VisibleMethod>('vertical');

const route = useRoute();
const id = route.params.id;
const authStore = useAuthStore();
const { data: category } = useApi(
  `/api/v1/Category/get-category/${id}`,
  {}
) as any;
const isFilterOpen = ref(false);

const applyFilter = () => {
  isFilterOpen.value = false;
};

const productStore = useProductsSstore();

const productName = defineModel<string>();
const handleSearch = (event: any) => {
  productStore.filterProducts(event.target.value);
};
onMounted(() => {
  productStore.setCategoryId(id as string);
  productStore.filterProducts();
});
</script>

<style scoped lang="scss">
.header-help {
  margin-bottom: 40px;
  @include flex(row, space-between, baseline, 20px);

  &-icons {
    @include flex(row, space-between, center);
    width: 35%;

    img:first-child {
      margin-right: 10px;
    }
  }
}

.small-screen-filter {
  display: none;
  @include textFormat(18px, 20px, 600, $main-blue);
  border: 1px solid $main-blue;
  border-radius: 2px;
  margin-bottom: 40px;
  padding: 8px 6px;

  &:hover {
    cursor: pointer;
  }

  .open-filters {
    @include flex(column, start, start, 3px);
  }

  .closed-filters {
    @include flex(column, start, start, 3px);

    span {
      display: inline-block;
      background: $main-blue;
      width: 24px;
      height: 2px;

      &:nth-child(2) {
        width: 21px !important;
      }

      &:nth-child(3) {
        width: 19px !important;
      }
    }
  }
}

.block-style-select {
  @include flex(row, start, center);
}

@media (max-width: 1000px) {
  .main-filters {
    flex-direction: column;
  }

  h1 {
    font-size: 28px !important;
    line-height: 28px !important;
  }

  .filters.close-filters {
    display: none;
  }

  .small-screen-filter {
    @include flex(row, start, center);
  }

  .all-catalog-results.close {
    display: none;
  }
}

@media (max-width: 768px) {
}

@media (max-width: 576px) {
  .header-help {
    flex-direction: column;
  }

  .header-help-icons {
    width: 100%;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 24px !important;
    line-height: 28px !important;
  }
}
</style>
