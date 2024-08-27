<template>
  <div>
    <div class="sub-header-section">
      <h5 class="each-section-header">{{ $t("discounts") }}</h5>

      <button class="look-all-btn" @click="navigateTo('/discount')">
        <span>{{ $t("lookAll") }}</span>
        <img src="../assets/icons/icon=components-more.svg" alt="more" />
      </button>
    </div>
    <div class="actions-block">
      <DiscountItem />
    </div>

    <div class="brands-info">
      <h5 class="each-section-header brands">{{ $t("brands") }}</h5>
      <p class="brands-text">{{ $t("brandsInfo") }}</p>
      <button class="look-all-btn" @click="navigateTo('/brands')">
        <span>{{ $t("lookAll") }}</span>
        <img src="../assets/icons/icon=components-more.svg" alt="more" />
      </button>
    </div>

    <div class="brands-pictures">
      <div class="inner">
        <div class="wrapper">
          <section
            v-for="(section, index) in sections"
            :key="index"
            :style="{ '--speed': '65000ms' }"
          >
            <div
              class="brand-logo"
              v-for="(item, index) in brandsStore.getAllBrands"
              :key="item.id"
            >
              <img
                :src="item.logo"
                :alt="`image-${index}`"
                @click="
                  navigateTo({
                    path: `/catalog`,
                    query: { brandId: item?.id },
                  })
                "
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Category } from "~/types/Category";

const brandsStore = useBrandsStore();
const catalogStore = useCatalogStore();

const firstCategoryItem = ref({} as Category);
onMounted(async () => {
  await catalogStore.fetchAllCategories();
  await brandsStore.fetchAllBrands();

  if (catalogStore.getAllCategories?.length > 0) {
    firstCategoryItem.value = catalogStore.getAllCategories[0];
  }
});
const sections = ref([0, 1, 2]);
</script>

<style scoped lang="scss">
.brands {
  text-align: center;
}

.sub-header-section {
  @include flex(row, space-between, center);
}

.brands-info {
  margin-top: 2.3rem;
  @include flex(column, center, center);
}

.brands-text {
  max-width: 50%;
  text-align: center;
}

.brands-pictures {
  margin-bottom: 120px;
  padding: 20px;
  margin-top: 20px;
  border-top: 1px solid $slider-border-color;
  height: max-content;
  img {
    width: 250px;
    max-height: 200px;
    height: 140px;
    object-fit: contain !important;
    margin: 40px 10px 0 0;
  }
}

:deep(.brand-logo) {
  margin: 0 15px;
}

@media (max-width: 768px) {
  .actions-block {
    flex-direction: column;
    align-items: center;
  }
}

@media (min-width: 320px) and (max-width: 768px) {
  .brands-text {
    max-width: 100%;
  }
}
.inner {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 11rem;
}

.wrapper {
  position: absolute;
  display: flex;
}

section {
  display: flex;
  animation: swipe var(--speed) linear infinite;
}

.image img {
  max-width: 150px;
  height: 5rem;
  padding: 0 15px;
  object-fit: cover;
}

@keyframes swipe {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
