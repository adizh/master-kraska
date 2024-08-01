<template>
  <div class="prod-info-section">
    <div class="tabs-select">
      <div>
        <button
          class="tab-btns-prod"
          :class="{ 'active-tab-btn': activeTab === 1 }"
          @click="selectTab(1)"
        >
          {{ $t("desctiption") }}
        </button>
      </div>
    </div>

    <div class="desc-part" v-if="activeTab === 1">
      <div class="desc-part-info">
        <span>{{ item?.name }}</span>

        <p class="toggle-descr" v-if="prodDescr">
          {{ prodDescr }}
          <button
            class="read-all-btn"
            @click="toggleProdDesc"
            v-if="!isDescrOpen && isProdDesctLong"
          >
            {{ $t("more") }}
          </button>
          <button
            class="read-all-btn"
            @click="toggleProdDesc"
            v-else-if="isDescrOpen"
          >
            {{ $t("close") }}
          </button>
        </p>
        <p v-else>{{ $t("noData") }}</p>
      </div>
      <div class="desc-part-info">
        <span>{{ $t("layersNum") }}</span>

        <p>{{ $t("noData") }}</p>
      </div>
      <div class="desc-part-info">
        <span>{{ $t("surfacePrepare") }}</span>
        <p>{{ $t("noData") }}</p>
      </div>
    </div>
    <div class="certificate-part" v-else>{{ $t("certificates") }}</div>
  </div>
</template>

<script setup lang="ts">
import { ExtendedProduct } from "~/types/Product";

const props = defineProps<{
  item: ExtendedProduct;
}>();

const descriptionLen = ref(480);
const surfaceLen = ref(480);
const isDescrOpen = ref(false);
const isSurfaceOpen = ref(false);
const isProdDesctLong = computed(() => {
  return props?.item?.description?.length > descriptionLen.value;
});
// const isSurfaceLong = computed(() => {
//   return props?.item?.surfacePreparations?.length > surfaceLen.value;
// });

const prodDescr = computed(() => {
  return isProdDesctLong
    ? props?.item?.description?.slice(0, descriptionLen.value)
    : props?.item?.description;
});

// const prodSurface = computed(() => {
//   return isSurfaceLong
//     ? props?.item?.surfacePreparations?.slice(0, surfaceLen.value)
//     : props?.item?.surfacePreparations;
// });

const toggleProdDesc = () => {
  isDescrOpen.value = !isDescrOpen.value;
  if (isDescrOpen.value) {
    descriptionLen.value = props?.item?.description.length;
  } else {
    descriptionLen.value = 480;
  }
};

// const toggleProdSurface = () => {
//   isSurfaceOpen.value = !isSurfaceOpen.value;
//   if (isSurfaceOpen.value) {
//     surfaceLen.value = props?.item?.surfacePreparations?.length;
//   } else {
//     surfaceLen.value = 480;
//   }
// };
const activeTab = ref(1);
const selectTab = (tab: number) => {
  activeTab.value = tab;
};
</script>

<style scoped lang="scss">
.tabs-select {
  border-bottom: 1px solid $slider-border-color;
  padding-bottom: 24px;
  @include flex(row, center, center);

  div {
    width: 20%;
    @include flex(row, center, center);
  }
}

.tab-btns-prod {
  text-align: center;
  color: $main-black !important;
  @include footerSpan(20px, 20px);
  border: none;
  background: none;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    color: $main-pink !important;
  }
}

.prod-info-section {
  margin-top: 80px;
}

.active-tab-btn {
  color: $main-pink !important;
}

.desc-part {
  margin-top: 20px;
  @include flex(column, start, space-between, 40px);

  &-info {
    span {
      color: $main-black !important;
      @include footerSpan(20px, 20px);
      font-weight: 600;
      margin-bottom: 10px;
      display: block;
    }

    p {
      @extend %sm-span;
    }
  }
}

@media (max-width: 768px) {
  .tabs-select div:last-child {
    display: none;
  }

  .tabs-select div:first-child::after {
    background: none;
    display: none;
  }
}
</style>
