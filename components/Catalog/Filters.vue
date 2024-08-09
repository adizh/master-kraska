<template>
  <div class="filters">
    <div class="subcategories" v-if="route?.query?.category">
      <div
        v-for="subCategory in catalogStore?.getCategory[0]?.subcategories"
        :key="subCategory?.id"
      >
        <label class="black-checkbox">
          <input
            type="checkbox"
            :id="`${subCategory.id}`"
            :value="subCategory.id"
            class="subcategoryCheckboxes"
            @input="handleSubCategories(subCategory, $event)"
            :checked="
              subCategory?.id ===
              (route?.query?.subCategory as unknown as string)
            "
          />
          <span
            class="black-checkbox-span"
            :class="{
              'black-checkbox-span open': opensIncludes(subCategory?.id),
            }"
          >
            <p
              :class="{
                'black-checkbox-span-name': opensIncludes(subCategory?.id),
              }"
            >
              {{ formatNameUpper(subCategory?.name) }}
            </p>
          </span>
        </label>
      </div>
    </div>

    <div class="price">
      <label for="price" class="filters-help">
        {{ $t("price") }}
      </label>
      <div>
        <input
          type="text"
          :placeholder="$t('from')"
          class="basic-input"
          v-model="productsStore.filters.minPrice"
          @input="handlePrices"
        />
        <input
          type="text"
          :placeholder="$t('to')"
          class="basic-input"
          v-model="productsStore.filters.maxPrice"
          @input="handlePrices"
        />
      </div>
    </div>

    <div
      class="brands"
      :class="{ 'each-filter-block open': isBrandOpen }"
      v-if="brandsStore.getAllBrands?.length > 0"
    >
      <label for="price" class="filters-help">
        {{ $t("brands") }}
      </label>
      <div class="brands-list">
        <p
          v-for="(brand, index) in computedBrands"
          :key="brand?.id"
          class="each-sub-item"
        >
          <label class="black-checkbox">
            <input
              type="checkbox"
              :id="`${brand?.id}`"
              :value="brand.id"
              @input="(event) => updateBrandsInputs(brand, event)"
              :checked="brand?.id === brandIdQuery"
              class="brandsCheckboxes"
            />
            <span
              class="black-checkbox-span"
              :class="{ 'black-checkbox-span open': opensIncludes('brands') }"
            >
              <p
                :class="{ 'black-checkbox-span-name': opensIncludes('brands') }"
              >
                {{ brand?.name }}
              </p>
            </span>
          </label>
        </p>
        <p
          class="open-block"
          v-if="brandsStore.getAllBrands?.length > 0 && getRemainingBrands"
        >
          <span @click="openBrands" v-if="!isBrandOpen">
            {{ $t("more") }} {{ getRemainingBrands }}
          </span>
          <span @click="isBrandOpen = false" v-else>
            {{ $t("closeBlock") }}
          </span>
          <img
            class="arrow"
            :class="{ rotated: isBrandOpen }"
            src="../../assets/icons/arrow-down-blue.svg"
          />
        </p>
      </div>
    </div>
    <div class="filters-block">
      <div
        v-for="item in filteredCatalog"
        :key="item?.id"
        class="each-filter-block"
        :class="{ 'each-filter-block open': opensIncludes(item.id) }"
      >
        <h4 class="filters-block-header">{{ item?.name }}</h4>
        <div class="main-block" v-if="item?.subdirectory?.length">
          <p
            v-for="(sub, index) in getSlicedSubdirectories(item)"
            :key="index"
            class="each-sub-item"
          >
            <label class="black-checkbox">
              <input
                type="checkbox"
                :id="`${item.id}-${index}`"
                :value="sub.id"
                :checked="isChecked(item.id, sub.id)"
                @change="updateCheckboxState(item.id, sub.id, $event)"
                class="filtersCheckboxes"
              />
              <span
                class="black-checkbox-span"
                :class="{ 'black-checkbox-span open': opensIncludes(item?.id) }"
              >
                <p
                  :class="{
                    'black-checkbox-span-name': opensIncludes(item?.id),
                  }"
                >
                  {{ formatNameUpper(sub?.name) }}
                </p>
              </span>
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
          />
        </p>
      </div>
    </div>
    <button class="bg-white-btn reset-filters" @click="resetFilters">
      {{ $t("reset") }}
    </button>

    <div class="apply-filters">
      <button class="pink-button" @click="() => emit('applyFilter')">
        {{ $t("applyFilter") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AllCatalog, CatalogCheckbox } from "@/types/Catalog";
import { Brands } from "~/types/Brands";
import { CategorySys } from "~/types/Category";

const route = useRoute();
const router = useRouter();
const productsStore = useProductsSstore();
const catalogStore = useCatalogStore();
const authStore = useAuthStore();
const checkboxStates = ref<{ [key: string]: CatalogCheckbox }>({});

const openedBlockFilters = ref<string[]>([]);
const brandsStore = useBrandsStore();
const brandIdQuery = ref("");

const isBrandOpen = ref(false);
const emit = defineEmits(["applyFilter"]);
const getRemainingBrands = computed(() => {
  return brandsStore.getAllBrands?.length - 5;
});

const handleSubCategories = (item: CategorySys, event: any) => {
  const subCategoryIndex = productsStore.filters.categoryId.indexOf(item?.id);

  if (event.target.checked === true) {
    if (subCategoryIndex === -1) {
      productsStore.filters.categoryId.push(item?.id);
    }
  } else {
    if (subCategoryIndex !== -1) {
      productsStore.filters.categoryId.splice(subCategoryIndex, 1);
    }
  }

  productsStore.filterProducts();
};
const resetFilters = () => {
  let allBrandsInputs = Array.from(
    document.querySelectorAll(".brandsCheckboxes"),
  ) as HTMLInputElement[];
  let filtersCheckboxes = Array.from(
    document.querySelectorAll(".filtersCheckboxes"),
  ) as HTMLInputElement[];
  let subcategoryCheckboxes = Array.from(
    document.querySelectorAll(".subcategoryCheckboxes"),
  ) as HTMLInputElement[];

  for (let brand of allBrandsInputs) {
    if (brand?.value) {
      brand.value = "";
      brand.checked = false;
    }
  }

  for (let brand of filtersCheckboxes) {
    if (brand?.value) {
      brand.value = "";
      brand.checked = false;
    }
  }

  for (let brand of subcategoryCheckboxes) {
    if (brand?.value) {
      brand.value = "";
      brand.checked = false;
    }
  }

  productsStore.filters.search = "";
  productsStore.filters.categoryId = [];
  productsStore.filters.subdirectoryIds = [];
  productsStore.filters.minPrice = 0;
  productsStore.filters.maxPrice = 0;
  productsStore.filters.brandId = [];
  productsStore.filters.currentPage = 1;
  productsStore.filters.pageSize = 10;
  productsStore.filterProducts();
};

const openBrands = () => {
  isBrandOpen.value = true;
};

const computedBrands = computed(() => {
  return !isBrandOpen.value
    ? brandsStore.getAllBrands.slice(0, 5)
    : brandsStore.getAllBrands;
});

const filteredCatalog = computed(() => {

  return catalogStore.getAllCatalogs?.filter(
    (item) => item?.subdirectory?.length > 0,
  );
  
});

const initializeCheckboxStates = async () => {
  await catalogStore.getAllCatalogs.map((item) => {
    checkboxStates.value[item.id] = {
      name: item.name,
      id: item.id,
      values: item.subdirectory.map((sub) => ({
        id: sub.id,
        value: false,
        name: sub?.name,
      })),
    };
  });
  // console.log('initializeCheckboxStates checkboxStates', checkboxStates)
};

const handlePrices = () => {
  if (
    productsStore?.filters.minPrice > 0 &&
    productsStore?.filters?.maxPrice > 0
  )
    setTimeout(() => {
      productsStore.filterProducts();
    }, 600);
};

const isChecked = (itemId: string, subId: string) => {
  return (
    checkboxStates?.value[itemId]?.values?.find(
      (val: { id: string }) => val.id === subId,
    )?.value || false
  );
};

const updateBrandsInputs = async (brand: Brands, event: any) => {
  if (brand?.id === brandIdQuery.value) {
    route.query.brandId = "";
  }

  const brandIndex = productsStore.filters.brandId.indexOf(brand?.id);
  if (event.target.checked === true) {
    if (brandIndex === -1) {
      productsStore.filters.brandId.push(brand?.id);
    }
  } else {
    if (brandIndex !== -1) {
      productsStore.filters.brandId.splice(brandIndex, 1);
    }
  }

  await productsStore.filterProducts();
};

const updateCheckboxState = (itemId: string, subId: string, event: any) => {
  const checked = event.target.checked;
  const subIndex = checkboxStates?.value[itemId]?.values?.findIndex(
    (val: { id: string }) => val.id === subId,
  );
  if (checkboxStates.value[itemId]?.values) {
    checkboxStates.value[itemId].values[subIndex].value = checked;
  }

  const valuesArray = Object.values(checkboxStates.value);

  const filteredValues = valuesArray.flatMap((item) =>
    item.values?.filter((sub: { value: boolean }) => sub.value === true),
  );
  if (!filteredValues?.length) {
    productsStore.setSubDirectories(null);
  }

  productsStore.setSubDirectories(filteredValues);

  productsStore.filterProducts();
};

const opensIncludes = (id: string) => {
  return openedBlockFilters.value.includes(id);
};

const setOpenBlock = (id: string) => {
  if (openedBlockFilters.value.includes(id)) {
    openedBlockFilters.value = openedBlockFilters.value.filter(
      (itemId: string) => itemId !== id,
    );
  } else {
    openedBlockFilters.value.push(id);
  }
};

const getSlicedSubdirectories = (item: AllCatalog) => {
  if (item?.subdirectory && opensIncludes(item?.id)) {
    return item.subdirectory;
  } else {
    return item.subdirectory.slice(0, 5);
  }
};

const getRemainingItemCount = (item: AllCatalog) => {
  return item?.subdirectory ? Math.max(item.subdirectory.length - 5, 0) : 0;
};

onMounted(async () => {
  await catalogStore.fetchAllCatalogs();
  await initializeCheckboxStates();
  brandsStore.fetchAllBrands();

  if (route?.query?.category) {
    await catalogStore.fetchCategoryById(route?.query?.category as string);
    await productsStore.filterProducts();
  }

  if (route?.query?.brandId) {
    brandIdQuery.value = route?.query?.brandId as string;
    isBrandOpen.value = true;
    productsStore?.filters.brandId.push(route?.query?.brandId as string);
    await productsStore.filterProducts();
  }
  if (route?.query?.subCategory) {
    productsStore.filters.categoryId.push(
      route.query.subCategory as unknown as string,
    );
    await productsStore.filterProducts();
  }
  await productsStore.filterProducts();
});

onUnmounted(() => {
  productsStore.filters.brandId = [];
  productsStore.filters.categoryId = [];
  productsStore.filters.search = "";
});
</script>

<style lang="scss" scoped>
.open-block {
  @include textFormat(16px, 20px, 500, $blue-color);
  @include flex(row, start, center, 4px);
  margin-top: 12px;
}

.black-checkbox-span-name {
  margin-left: 30px;
}

.each-sub-item {
  margin: 7px 0;
}

.reset-filters {
  box-shadow: 0px 0px 0px 0.5px #0000000d;
  box-shadow: 0px 0.5px 2.5px 0px #0000004d;
  font-size: 18px !important;
}

.apply-filters {
  display: none;
  button {
    font-size: 18px !important;
  }
}

.each-filter-block.open {
  border: 1px solid $slider-border-color;
  padding: 12px 10px;
  max-height: 217px;
  height: 100%;
  scrollbar-gutter: stable;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #222;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #d9d9d9;
    border-radius: 10px;
  }
}

.subcategories {
  padding-left: 30px;
  margin-bottom: 40px;
  @include flex(column, start, start, 7px);
}

.custom-radio input[type="radio"] {
  display: none;
}

.custom-radio label {
  position: relative;
  cursor: pointer;
  padding-left: 25px;
  margin-right: 15px;
  font-size: 16px;
}

.custom-radio .radio-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;

  border: 2px solid #000;
}

.custom-radio input[type="radio"]:checked + label .radio-icon::after {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.filters {
  .basic-input {
    padding: 9px;
  }

  &-help {
    @include textFormat(20px, 20px, 600, #000);
    margin-bottom: 10px;
    max-width: 250px;
    width: 100%;
    display: block;
  }

  .each-filter-block {
    margin-top: 40px;
  }

  &-block {
    margin-top: 40px;

    &-header {
      @include textFormat(20px, 20px, 600, #000);
      margin: 0 0 22px 0;
    }
  }
}

.brands {
  margin-top: 40px;

  .each-sub-item {
    padding-left: 30px;
  }

  .filters-help {
    margin-bottom: 22px;
  }
}

.price {
  @include flex(column, center, start, 5px);

  input {
    width: 35%;

    &:first-child {
      margin-right: 10px;
    }
  }
}

.black-checkbox input[type="checkbox"] {
  display: none;
}

.black-checkbox-span {
  position: relative;
  display: inline-block;
}

.black-checkbox-span.open::before {
  left: 0;
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
  content: url("../../assets/icons/check-icon-vector.svg");
  width: 18px;
  height: 18px;
  background: black;
}

.main-block {
  padding-left: 30px;
}

@media (max-width: 1000px) {
  .apply-filters {
    @include flex(column, start, center);
  }

  .brands-list {
    @include flex(row, start, center, 2rem);
    flex-wrap: wrap;
  }

  .each-sub-item {
    margin: 0 3rem 0 0;
  }

  .filters-help {
    margin-bottom: 20px;
    font-size: 18px;
    line-height: 20px;
  }

  .filters-block-header {
    font-size: 18px;
    line-height: 20px;
  }

  .basic-input {
    padding: 8px !important;
  }
}
</style>
