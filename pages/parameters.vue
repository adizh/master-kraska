<template>
  <section>
    <h1 class="margin-bottom-40">
      {{ $t("selectByParameters") }}
    </h1>
    <div
      v-for="(item, index) in firstBlock"
      :key="item?.id"
      class="params-first blocks"
    >
      <div class="params-header">
        <span>{{ index + 1 }}</span>
        <p>{{ $t("whichTypeOfWork") }}</p>
      </div>

      <div class="flex gap-4 first-button-block">
        <button
          v-for="btn in item?.subdirectory"
          :key="btn?.id"
          class="gray-buttons-border"
          :class="{ 'selected-btn': typeOfWork === btn.id }"
          @click="updateCheckboxState(item?.id, btn?.id, 'select-btn')"
        >
          {{ formatNameUpper(btn?.name) }}
          <img
            v-if="typeOfWork === btn.id"
            src="../assets/icons/carbon_checkmark-filled (1).svg"
            alt="carbon"
          >
        </button>
      </div>
    </div>

    <div class="params-first blocks second">
      <div class="params-header">
        <span>2</span>
        <p>{{ $t("whichTypeOfWork") }}</p>
      </div>

      <div v-for="item in secondBlock" :key="item?.id" class="mb-5">
        <h4 class="filters-block-header">
          {{ item?.name }}
        </h4>

        <div v-if="item?.subdirectory?.length" class="all-inputs">
          <p
            v-for="(sub, index) in getSlicedSubdirectories(item)"
            :key="index"
            class="each-sub-item"
          >
            <label class="black-checkbox">
              <input
                :id="`${item.id}-${index}`"
                type="checkbox"
                :value="sub.id"
                :checked="isChecked(item.id, sub.id)"
                @change="updateCheckboxState(item.id, sub.id, $event)"
              >
              <span class="black-checkbox-span">{{ sub?.name }}</span>
            </label>
          </p>
        </div>
        <p
          v-if="getRemainingItemCount(item) > 0"
          class="open-block"
          @click="setOpenBlock(item?.id)"
        >
          {{ opensIncludes(item.id) ? $t("closeBlock") : $t("more") }}
          <span v-if="!opensIncludes(item.id)">{{
            getRemainingItemCount(item)
          }}</span>
          <img
            class="arrow"
            :class="{ rotated: opensIncludes(item.id) }"
            src="/static/icons/arrow-down-blue.svg"
          >
        </p>
      </div>
    </div>

    <div class="params-first blocks third">
      <div class="params-header">
        <span>3</span>

        <p>{{ $t("whichTypeCoating") }}</p>
      </div>

      <div v-for="item in thirdBlock" :key="item?.id" class="mb-5">
        <h4 class="filters-block-header">
          {{ item?.name }}
        </h4>
        <div v-if="item?.subdirectory?.length" class="all-inputs">
          <p
            v-for="(sub, index) in getSlicedSubdirectories(item)"
            :key="index"
            class="each-sub-item"
          >
            <label class="black-checkbox">
              <input
                :id="`${item.id}-${index}`"
                type="checkbox"
                :value="sub.id"
                :checked="isChecked(item.id, sub.id)"
                @change="updateCheckboxState(item.id, sub.id, $event)"
              >
              <span class="black-checkbox-span">{{ sub?.name }}</span>
            </label>
          </p>
        </div>

        <p
          v-if="getRemainingItemCount(item) > 0"
          class="open-block"
          @click="setOpenBlock(item?.id)"
        >
          {{ opensIncludes(item.id) ? $t("closeBlock") : $t("more") }}
          <span v-if="!opensIncludes(item.id)">{{
            getRemainingItemCount(item)
          }}</span>
          <img
            class="arrow"
            :class="{ rotated: opensIncludes(item.id) }"
            src="/static/icons/arrow-down-blue.svg"
          >
        </p>
      </div>
    </div>

    <div class="params-first blocks fourth">
      <div class="params-header">
        <span>4</span>
        <p>{{ $t("rateBudget") }}</p>
      </div>

      <div class="buttons-price">
        <input
          v-model="minPrice"
          type="text"
          :placeholder="$t('from')"
          class="basic-input"
        >
        <input
          v-model="maxPrice"
          type="text"
          :placeholder="$t('to')"
          class="basic-input"
        >
      </div>
      <button class="bg-white-btn" @click="filterProductParams">
        {{ $t("applyFilter") }}
      </button>
    </div>

    <div v-if="showResults" class="params-results">
      <h3>
        {{ $t("yourSearchResults") }}
      </h3>
      <div v-if="productsStore.getLoadingState" class="text-center">
        <ProgressSpinner />
      </div>
      <div
        v-else-if="
          productsStore.getFilteredProducts?.length > 0 &&
            !productsStore.getLoadingState
        "
        class="params-result-prod"
      >
        <ProductsProductItem
          v-for="product in productsStore.getFilteredProducts"
          :key="product?.id"
          :product="product"
        />
      </div>

      <!-- <div v-else-if="!productsStore.getLoadingState && !productsStore.getFilteredProducts?.length">{{
                $t('noData') }}</div> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { AllCatalog, CatalogCheckbox } from "~/types/Catalog";
const showResults = ref(false);
const catalogStore = useCatalogStore();
const productsStore = useProductsSstore();
const authStore = useAuthStore();
const minPrice = ref(0);
const maxPrice = ref(0);
const typeOfWork = ref("");
const isProdReceived = ref(false);

const items = [
  {
    id: "d12f4dfb-6f54-4a37-9cd3-1d6d5423e084",
    name: "ТИП РАБОТ"
  },
  {
    id: "c8409cbf-4b89-492d-bbb6-fce1813815d3",
    name: "ТИП ЛКМ"
  },
  {
    id: "5ff5e6eb-884b-4e64-ae7b-d99bede77b9b",
    name: "МАТЕРИАЛ РАБОЧЕЙ ПОВЕРХНОСТИ"
  },
  {
    id: "d637e138-5784-4d3d-bb91-77a7a185469e",
    name: "ТИП ОБЪЕКТА"
  },
  {
    id: "4b5d79cb-b7fd-4646-8dc2-6fafd0d3fd3e",
    name: "РАЗБАВИТЕЛЬ"
  }
];

const filteredCatalogs = computed(() => {
  return catalogStore.getAllCatalogs.filter((item: AllCatalog) => {
    return items.filter((obj) => obj.name === item?.name.toUpperCase());
  });
});

const firstBlock = computed(() => {
  return filteredCatalogs.value?.filter((item: AllCatalog) => {
    return item?.nameRu.toLowerCase() === "ТИП РАБОТ".toLocaleLowerCase();
  });
});

console.log("filteredCatalogs", filteredCatalogs);
const secondOptions = [
  "МАТЕРИАЛ РАБОЧЕЙ ПОВЕРХНОСТИ",
  "ТИП ОБЪЕКТА",
  "РАЗБАВИТЕЛЬ"
];
const secondBlock = computed(() => {
  return filteredCatalogs.value.filter((item) => {
    return secondOptions?.includes(item?.nameRu?.toUpperCase());
  });
});
console.log("secondBlock", secondBlock);
const thirdBlock = computed(() => {
  return filteredCatalogs.value.filter(
    (item) =>
      item?.nameRu?.toLocaleLowerCase() === "ТИП ЛКМ".toLocaleLowerCase()
  );
});

const setOpenBlock = (id: string) => {
  if (openedBlockFilters.value?.includes(id)) {
    openedBlockFilters.value = openedBlockFilters.value.filter(
      (itemId: string) => itemId !== id
    );
  } else {
    openedBlockFilters.value.push(id);
  }
};
const isChecked = (itemId: string, subId: string) => {
  return (
    checkboxStates?.value[itemId]?.values?.find(
      (val: { id: string }) => val.id === subId
    )?.value || false
  );
};
const initializeCheckboxStates = () => {
  catalogStore.getAllCatalogs.map((item) => {
    checkboxStates.value[item.id] = {
      name: item.name,
      id: item.id,
      values: item.subdirectory.map((sub) => ({
        id: sub.id,
        value: false,
        name: sub?.name
      }))
    };
    return checkboxStates;
  });

  //  console.log('checkboxStates in function', checkboxStates)
};

onMounted(async () => {
  await catalogStore.fetchAllCatalogs();
  await initializeCheckboxStates();
});
watch(
  () => authStore.getSelectedLang,
  async () => {
    await catalogStore.fetchAllCatalogs();
    initializeCheckboxStates();
  }
);

const openedBlockFilters = ref<string[]>([]);

const updateCheckboxState = (itemId: string, subId: string, event: any) => {
  const subIndex = checkboxStates?.value[itemId]?.values?.findIndex(
    (val: { id: string }) => val.id === subId
  );
  if (event === "select-btn" && subIndex !== -1) {
    if (checkboxStates.value[itemId]?.values) {
      checkboxStates.value[itemId].values[subIndex].value = true;
      checkboxStates.value[itemId].values.forEach(
        (val: { id: string; value: boolean }) => {
          if (val.id !== subId) {
            val.value = false;
          }
        }
      );
      typeOfWork.value = subId;
    }
  } else {
    const checked = event.target.checked;

    if (checkboxStates.value[itemId]?.values) {
      checkboxStates.value[itemId].values[subIndex].value = checked;
    }
  }

  // console.log('checkboxStates', checkboxStates)
  const valuesArray = Object.values(checkboxStates.value);

  const filteredValues = valuesArray.flatMap((item) =>
    item.values?.filter((sub: { value: boolean }) => sub.value === true)
  );
  if (!filteredValues?.length) {
    productsStore.setSubDirectories(null);
  }

  productsStore.setSubDirectories(filteredValues);

  // console.log('filteredValues', filteredValues)
};
const opensIncludes = (id: string) => {
  return openedBlockFilters?.value?.includes(id);
};

const getRemainingItemCount = (item: AllCatalog) => {
  return item?.subdirectory ? Math.max(item.subdirectory.length - 5, 0) : 0;
};
const getSlicedSubdirectories = (item: AllCatalog) => {
  if (item?.subdirectory && opensIncludes(item?.id)) {
    return item.subdirectory;
  } else {
    return item.subdirectory.slice(0, 5);
  }
  // return item?.subdirectory ? item.subdirectory.slice(0, 5) : [];
};
const checkboxStates = ref<{ [key: string]: CatalogCheckbox }>({});

const filterProductParams = () => {
  isProdReceived.value = false;
  if (minPrice?.value >= 0 && maxPrice.value > 0) {
    productsStore.setPrices(minPrice.value, maxPrice.value);
  }

  showResults.value = true;
  setTimeout(() => {
    productsStore.filterProducts();
    if (!productsStore?.getFilteredProducts) {
      isProdReceived.value = true;
    }
  }, 500);
};
</script>

<style scoped lang="scss">
.black-checkbox input[type="checkbox"] {
  display: none;
}

.black-checkbox-span {
  position: relative;
  display: inline-block;
}

.black-checkbox-span::before {
  content: "";
  position: absolute;
  width: 100%;
  max-width: 18px;
  height: 18px;
  border: 1px solid black;
  left: -30px;
}

.black-checkbox input[type="checkbox"]:checked + .black-checkbox-span::before {
  display: flex;
  align-items: center;
  justify-content: center;
  content: url("../assets/icons/check-icon-vector.svg");
  width: 18px;
  height: 18px;
  background: black;
}

.item-block {
  width: 25%;
}

.params-result-prod {
  @include flex(flex, start, start);
  flex-wrap: wrap;
}

.params-results {
  h3 {
    margin-bottom: 40px;
  }
}

.first-button-block {
  flex-direction: row;
}

.buttons-price {
  @include flex(flex, start, start, 60px);
}

.blocks {
  margin-bottom: 90px;
}

.all-inputs {
  padding: 10px 2rem;
  margin-top: 34px;
  @include flex(row, start, start, 20px);
  flex-wrap: wrap;

  .each-sub-item {
    margin: 7px 15px;
    width: 15%;
  }
}

.params {
  &-header {
    @include flex(row, start, baseline, 20px);

    span {
      @include textFormat(54px, 73px, 600, $main-pink);
    }

    p {
      @include textFormat(28px, 28px, 700, $main-black);
      margin-bottom: 41px;
    }
  }
}

.params-subinfo {
  @include textFormat(20px, 20px, 600, $main-black);
}

.open-block {
  @include textFormat(16px, 20px, 500, $blue-color);
  @include flex(row, start, center, 4px);
  margin-top: 12px;
}

.bg-white-btn {
  box-shadow: 0px 0px 0px 0.5px #0000000d;
  box-shadow: 0px 0.5px 2.5px 0px #0000004d;
  margin-top: 40px;
}

@media (max-width: 768px) {
  h1 {
    font-size: 28px !important;
    line-height: 28px;
  }

  .params-header p {
    font-size: 24px;
    line-height: 24px;
  }

  .params-header span {
    font-size: 48px;
    line-height: 28px;
  }

  .filters-block-header {
    font-size: 20px;
    line-height: 20px;
  }

  .all-inputs {
    gap: 3rem;
  }

  .buttons-price {
    gap: 20p;
  }

  .item-block {
    width: 40%;
  }
}

@media (max-width: 480px) {
  .buttons-price {
    flex-direction: column;
  }

  .first-button-block {
    flex-direction: column;
  }

  .all-inputs {
    gap: 6rem !important;
  }

  h1 {
    font-size: 24px !important;
    line-height: 32px;
  }

  .params-header p {
    font-size: 20px;
    line-height: 28px;
  }

  .params-header span {
    font-size: 48px;
    line-height: 28px;
  }

  .filters-block-header {
    font-size: 14px;
    line-height: 24px;
  }

  .item-block {
    width: 100% !important;
  }
}
</style>
