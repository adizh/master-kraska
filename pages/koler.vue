<template>
  <section v-if="allTingings?.length > 0">
    <h1 class="main-header-h1">
      {{ $t("tinting") }}
    </h1>
    <div class="koler-section">
      <h1 class="main-header-h1">
        {{ $t("colorsMap") }}
      </h1>
      <div class="grid koler-section-select">
        <div class="col-2 koler-section-select-line">
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

        <div class="col-9 second-block">
          <input
            id="searcg"
            v-model="tintingSearch"
            type="text"
            name="search"
            :placeholder="$t('colorCode')"
            class="basic-input"
            @input="handleSearch"
          >
          <div class="danger-text">
            {{ $t("kolerWarning") }}
          </div>

          <div class="koler-part">
            <div class="koler-colors">
              <div v-if="activeBrand?.length" class="bottom">
                <div
                  v-for="item in activeBrand"
                  :key="item.id"
                  class="bottom-item"
                  :style="{ background: '#' + item.rgb }"
                  :class="{ 'selected-color': item?.id === selectedColor?.id }"
                  @click="selectColor(item)"
                >
                  <p class="flex flex-row align-items-center gap-1">
                    <span>{{ item.code }}</span>
                    <img
                      v-show="item?.id === selectedColor?.id"
                      src="../assets/icons/carbon_checkmark-filled (1).svg"
                      alt="carbon"
                      class="carbon"
                    >
                  </p>
                </div>
              </div>

              <UIPagination
                :total="totalPages"
                :current-active="currentPage"
                @change-page="changePage"
              />
            </div>

            <div class="koler-change">
              <img id="img" src="/koler.png" format="webp">
              <div
                id="bg"
                :style="{ background: '#' + selectedColor?.rgb || 'white' }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section v-else class="text-center">
    <ProgressSpinner />
  </section>
</template>

<script setup lang="ts">
import { Brands } from "~/types/Brands";
import { Tinting } from "@/types/Tinting";

const currentBrandsColors = ref<Tinting[]>([]);
const allTingings = ref<Tinting[]>([]);
const activeBrand = ref<Tinting[]>([]);

const tintingSearch = ref("");
const currentPage = ref(1);
const pageSize = ref(27);
const totalPages = ref(10);
const changePage = (page: number) => {
  currentPage.value = page;
  fetchTintingsByBrand(selectedBrand.value);
};

const selectedBrand = ref<Brands>({} as Brands);

const selectColor = (item: Tinting) => {
  selectedColor.value = item;
};

onMounted(async () => {
  await fetchAllTintings();
  currentBrandsColors.value = allTingings.value?.filter(
    (item: Tinting) => item?.brandId === selectedBrand?.value.id
  );
});

const handleSearch = () => {
  currentPage.value = 1;
  fetchTintingsByBrand(selectedBrand?.value);
};

const selectedColor = ref({} as Tinting);
const filteredBrands = ref<Brands[]>([]);

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
    "8b9f00af-1ff0-400e-be67-3f4753c89970"
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
    "Dulux"
  ];
  filteredBrands.value = desiredOrder.map((name) =>
    filteredOnes.find((obj) => obj.name === name)
  );
  selectedBrand.value = filteredBrands.value[0];
  currentBrandsColors.value = allTingings.value?.filter(
    (item: Tinting) => item?.brandId === selectedBrand?.value.id
  );
  fetchTintingsByBrand(selectedBrand.value);
  return [];
};

const fetchTintingsByBrand = async (brand: Brands) => {
  try {
    const response = await http(
      `/api/v1/Tinting/get-all-tintings-pagination?page=${currentPage.value}&pageSize=${pageSize?.value}&brandId=${brand?.id}&code=${tintingSearch?.value}`
    );
    console.log("response fetchTintingsByBrand", response);
    if (response.status === 200) {
      activeBrand.value = response.data.items;

      totalPages.value = response.data.totalPages;
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchAllTintings = async () => {
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
  }
};

const chooseBrand = (value: Brands) => {
  selectedBrand.value = value;
  currentBrandsColors.value = allTingings.value?.filter(
    (item: Tinting) => item?.brandId === selectedBrand?.value.id
  );
  tintingSearch.value = "";
  fetchTintingsByBrand(selectedBrand.value);
};
</script>

<style scoped lang="scss">
:deep(.swiper-button-next, .swiper-button-prev),
:deep(.swiper-button-prev) {
  color: black !important;
  border: 1px solid $slider-border-color !important;
  padding: 10px;
  border-radius: 100%;
  width: 36px;
  height: 36px;
}

:deep(#mySlider) {
  width: 500px !important;
}

.koler-part {
  @include flex(row, start, start);
}

.selected-color {
  border: 1px solid $main-black !important;
}

.koler-colors {
  width: 70%;

  .first-slide {
    @include flex(row, start, start, 2px);
    flex-wrap: wrap;
    width: 100%;
  }

  &-item {
    box-sizing: border-box;
    width: 39px;
    height: 40px;
    display: block;
    margin: 2px;

    &:hover {
      border: 1px solid $main-black;
      cursor: pointer;
    }
  }

  .each-row {
    display: flex;
  }

  .bottom {
    @include flex(row, start, center);
    margin-top: 20px;
    flex-wrap: wrap;
    margin-bottom: 42px;

    &-item {
      background: #ac5e97;
      padding: 15px 17px;
      margin: 2px;
      border-radius: 4px;
      width: 30%;
      border: 1px solid transparent;

      &:hover {
        border: 1px solid $main-black;
        cursor: pointer;
      }
    }
  }
}

.koler-section {
  border: 1px solid $slider-border-color;
  border-radius: 10px;
  padding: 40px;
  margin-top: 40px;

  input {
    border-color: $input-border-color;
    width: 100%;

    &::placeholder {
      color: $main-dark-grey;
    }
  }

  .danger-text {
    @include textFormat(16px, 20px, 500, #eb5757);
    margin: 20px 0 40px 0;
  }

  &-select {
    margin-top: 40px;

    &-names {
      @include textFormat(20px, 32px, 500, $main-black);

      &:hover {
        color: $main-blue;
        cursor: pointer;
      }

      &.active {
        color: $main-blue;
      }
    }

    &-line {
      @include flex(column, start, space-between, 20px);
      border-right: 1px solid $slider-border-color;
      padding-right: 20px;
      margin-right: 60px;
    }
  }
}

body {
  overflow: hidden;
}

#img {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 540px;
}

.koler-change {
  position: relative;
  width: 45%;
}

#bg {
  position: absolute;
  height: 95% !important;
  width: 100%;
  top: 0;
  mix-blend-mode: hue;
  transform: translate3d(0, 0, 0);
  height: 540px;
  z-index: 1;
}

@media (max-width: 1000px) {
  .img {
    height: 440px !important;
  }

  .koler-section {
    padding: 0;
    border: none;
  }

  .koler-section-select-line {
    margin-right: 15px;
    word-wrap: break-word;
  }

  .col-9 {
    width: 80% !important;
  }

  .koler-colors .bottom-item {
    width: 45%;
    padding: 10px 20px;
  }
}

@media (max-width: 1200px) {
  .koler-change {
    width: 66%;
  }
}
@media (max-width: 900px) {
  .koler-part {
    flex-direction: column;
  }

  .koler-change {
    width: 65%;
    margin-top: 30px;
  }

  .koler-colors {
    width: 100%;
  }

  .koler-colors .bottom-item {
    width: 30%;
  }

  .koler-section-select {
    flex-direction: column;
  }

  .koler-section-select-line {
    flex-direction: row;
    width: 100% !important;
    flex-wrap: wrap;
  }
}

@media (max-width: 756px) {
  .koler-change {
    width: 80%;
  }
}

@media (max-width: 620px) {
  .second-block,
  .koler-change {
    width: 100% !important;
  }

  .koler-colors .bottom-item {
    width: 45%;
  }
}
</style>
