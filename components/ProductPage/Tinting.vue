<template>
  <div>
    <h2>{{ $t("colorsMap") }}</h2>

    <div class="tinting-section grid" v-if="!loading">
      <div class="left col-3">
        <p
          v-for="item in filteredBrands"
          :key="item?.id"
          class="koler-section-select-names"
          :class="{ active: item?.name === selectedBrand?.name }"
          @click="chooseBrand(item)"
        >
          {{ item?.name }}
        </p>
      </div>
      <div class="right col-9">
        <input
          id="searcg"
          v-model="tintingSearch"
          type="text"
          name="search"
          :placeholder="$t('colorCode')"
          class="basic-input w-full"
          @input="handleSearch"
        />
        <p class="danger-text">
          {{ $t("kolerWarning") }}
        </p>

        <div class="tinting-block">
          <div
            class="tinting-block-item"
            v-for="item in tingintByBrands"
            :key="item?.id"
            :style="{ background: '#' + item.rgb }"
            @click="selectColor(item?.code)"
            :class="{ 'selected-color': item?.code === selectedColor }"
          >
            <p
              class="flex flex-row align-items-center justify-content-center gap-1"
            >
              <span>{{ item.code }}</span>
              <img
                v-show="item?.code === selectedColor"
                src="../../assets/icons/carbon_checkmark-filled (1).svg"
                alt="carbon"
                class="carbon"
              />
            </p>
          </div>
        </div>
        <div class="flex gap-3">
          <button
            class="pink-button"
            @click="$emit('closeTinting', selectedColor)"
          >
            {{ $t("selectColor") }}
          </button>
          <button
            class="pink-button no-tinting"
            @click="$emit('closeTinting', ' ')"
          >
            {{ $t("noTinting") }}
          </button>
        </div>

        <div class="flex justify-content-between">
          <UIPagination
            :total="totalPages"
            :current-active="currentPage"
            @change-page="changePage"
          />
        </div>
      </div>
    </div>

    <div v-else class="text-center">
      <ProgressSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Brands } from "~/types/Brands";
import {
  currentPage,
  totalPages,
  tingintByBrands,
  tintingSearch,
  selectedColor,
  selectColor,
  allTingings,
  filteredBrands,
  selectedBrand,
  currentBrandsColors,
} from "@/helpers/product/tinting";
import { Tinting } from "~/types/Tinting";
const props = defineProps<{
  productBrand: Brands;
}>();
const chooseBrand = (value: Brands) => {
  selectedBrand.value = value;

  console.log("selectedBrand", selectedBrand.value);
  console.log("value", value);
  currentBrandsColors.value = allTingings.value?.filter(
    (item: Tinting) => item?.brandId === selectedBrand?.value.id,
  );
  tintingSearch.value = "";
  fetchTintingsByBrand(selectedBrand.value);
};
const handleSearch = () => {
  currentPage.value = 1;
  fetchTintingsByBrand(selectedBrand.value);
};

const emit = defineEmits<{
  closeTinting: [selectedColor: string];
}>();

const changePage = (page: number) => {
  currentPage.value = page;
  fetchTintingsByBrand(selectedBrand?.value);
};

const fetchTintingsByBrand = async (brand: Brands) => {
  try {
    const response = await http(
      `/api/v1/Tinting/get-all-tintings-pagination?page=${currentPage.value}&pageSize=${10}&brandId=${brand?.id}&code=${tintingSearch?.value}`,
    );
    console.log("response fetchTintingsByBrand", response);
    if (response.status === 200) {
      tingintByBrands.value = response.data.items;

      totalPages.value = response.data.totalPages;
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchBrandsId = async (id: string) => {
  try {
    const response = await http(`/api/v1/Brand/get-brand/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchAllData = async (ids: string[]) => {
  const idsNull = [
    "902dea30-e9a6-4d6c-accf-97d4590d9852",
    "8b9f00af-1ff0-400e-be67-3f4753c89970",
  ];
  const filtered = ids.filter((item) => !idsNull.includes(item));
  const results = [];
  for (const id of filtered) {
    const data = await fetchBrandsId(id);
    if (data !== null) {
      results.push(data);
    }
  }

  const filteredOnes = results.filter((item: Brands) => Boolean(item));
  const desiredOrder = [
    "Tikkurila",
    "Teknos",
    "Sirca",
    "Ярославские",
    "Marshall",
    "Dulux",
  ];
  filteredBrands.value = desiredOrder.map((name) =>
    filteredOnes.find((obj) => obj.name === name),
  );
  selectedBrand.value = filteredBrands.value[0];
  currentBrandsColors.value = allTingings.value?.filter(
    (item: Tinting) => item?.brandId === selectedBrand?.value.id,
  );
  fetchTintingsByBrand(selectedBrand.value);
  return [];
};
const loading = ref(false);
const fetchAllTintings = async () => {
  loading.value = true;
  try {
    const response = await http("/api/v1/Tinting/get-all-tintings");
    if (response.status === 200) {
      allTingings.value = response.data;

      console.log("response data fetchAllTintings", response.data);
      const uniqueIds = response.data.reduce((ids: any, obj: Tinting) => {
        if (!ids.includes(obj?.brandId)) {
          ids.push(obj?.brandId);
        }
        return ids;
      }, []);

      await fetchAllData(uniqueIds);
    }
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchAllTintings();
  currentBrandsColors.value = allTingings.value?.filter(
    (item: Tinting) => item?.brandId === selectedBrand?.value.id,
  );
});
</script>

<style scoped lang="scss">
.danger-text {
  @include textFormat(16px, 20px, 500, #eb5757);
  margin: 27px 0 40px 0;
}
.pink-button {
  margin: 20px 0 40px 0;
  &.no-tinting{
    background: transparent;
    color: #222;
    border: 1px solid black;
  }
}
.tinting-block {
  @include flex(row, start, start, 4px);
  flex-wrap: wrap;
  &-item {
    color: #222222;
    width: 168px;
    padding: 8px;
    text-align: center;
    border-radius: 4px;
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    &:hover {
      cursor: pointer;
    }
  }
}
h2 {
  margin-bottom: 48px;
}

.right {
  padding-left: 40px;
  border-left: 1px solid #dddddd;
}

.tinting-section {
  .left p.active {
    color: $main-blue;
  }
  .left {
    p {
      margin-bottom: 20px;
      color: #222;
      font-size: 20px;
      line-height: 32px;
      font-weight: 500;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
.selected-color {
  border: 1px solid $main-black !important;
}

@media (max-width: 945px) {
  .tinting-section {
    flex-direction: column;
  }
  .left {
    @include flex(row, start, start);
    flex-wrap: wrap;
    width: 100% !important;
  }
  .tinting-block {
    &-item {
      width: 144px;
    }
  }
  .right {
    width: 100% !important;
  }
}
</style>
