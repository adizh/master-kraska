<template>
  <div>
    <h2>{{ $t("colorsMap") }}</h2>

    <div class="tinting-section grid">
      <div class="left col-2">
        <p>{{ productBrand?.name }}</p>
      </div>
      <div class="right col-10">
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
          <p class="flex flex-row align-items-center justify-content-center gap-1">
            <span>{{ item.code }}</span>
            <img
              v-show="item?.code === selectedColor"
              src="../../assets/icons/carbon_checkmark-filled (1).svg"
              alt="carbon"
              class="carbon"
            >
          </p>
          </div>
        </div>


        <button class="pink-button" @click="$emit('closeTinting',selectedColor)">{{ $t('selectColor') }}</button>
     <div class='flex justify-content-between'>
        <UIPagination
        :total="totalPages"
        :current-active="currentPage"
        @change-page="changePage"
      />
     </div>
      </div>
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
  selectColor
} from "@/helpers/product/tinting";
const props = defineProps<{
  productBrand: Brands;
}>();

const handleSearch = () => {
    currentPage.value=1
  fetchTintingsByBrand();
};

const emit=defineEmits<{
    closeTinting:[selectedColor:string]
}>()






const changePage =(page:number)=>{
    currentPage.value=page
    fetchTintingsByBrand()
}

const fetchTintingsByBrand = async () => {
  try {
    const response = await http(
      `/api/v1/Tinting/get-all-tintings-pagination?page=${currentPage.value}&pageSize=${10}&brandId=${props.productBrand?.id}&code=${tintingSearch?.value}`,
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

onMounted(() => {
  fetchTintingsByBrand();
});
</script>

<style scoped lang="scss">
.danger-text {
  @include textFormat(16px, 20px, 500, #eb5757);
  margin: 27px 0 40px 0;
}
.pink-button{
    margin:20px 0 40px 0;
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
  .left p {
    color: #33587d;
    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
  }
}
.selected-color {
    border: 1px solid $main-black !important;
  }
</style>
