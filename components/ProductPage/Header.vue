<template>
  <div>
    <ClientOnly>
      <div class="item-page-header">
        <div class="left">
          <img :src="productImage" alt="product" />
        </div>
        <div class="middle">
          <div class="middle-header">
            {{ getProduct?.product?.name }}
          </div>

          <div v-if="productBrand?.logo">
            <p
              class="each-block-info-col flex flex-column align-items-start gap-2"
            >
              <span>
                {{ $t("storeMark") }}
              </span>
              <img :src="productBrand?.logo" alt="brand" class="brand-logo" />
            </p>
          </div>
          
          <div class="middle-review">
            <span class="each-block-info-col">{{ $t("rating") }}</span>
            <div class="middle-rating">
              <span class="middle-review-number">{{
                getProduct?.product?.rating?.toFixed(2)
              }}</span>
              <Rating
                v-model="ratingValue"
                :cancel="false"
                :value="ratingValue"
                disabled
              />

              <a class="middle-review-text" href="#product-reviews">{{
                $t("reviews")
              }}</a>
            </div>
          </div>

          <div class="middle-volume">
            <span class="each-block-info-col">{{ $t("volume") }}</span>
            <div class="middle-volume-buttons">
              <button
                v-for="(btn, index) in getProduct?.product?.variants"
                :key="btn?.id"
                :class="{
                  'active-btn':
                    volumeBtn === btn?.id || volumeBtn === btn?.size,
                }"
                class="volume-btn"
                @click="selectVolumeSize(btn, index)"
              >
                {{ btn?.size }}
              </button>
              <button
                class="volume-btn"
                :class="{
                  'active-btn': volumeBtn === getProduct?.product?.id,
                }"
                @click="selectedDefaultVolume(getProduct?.product?.id)"
              >
                {{ getProduct?.product?.size }}
              </button>
            </div>
          </div>

          <div class="middle-koler">
            <span class="each-block-info-col">{{ $t("baseTinting") }}</span>
            <button class="middle-koler-btn">
              {{ selectedBase ? selectedBase : $t("noData") }}
            </button>
          </div>
          <div>
            <span class="each-block-info-col">
              {{ $t("consumption") }}
            </span>
            <p>{{ getProduct?.product?.consumption }}</p>
          </div>
          <div>
            <span class="each-block-info-col">{{ $t("parameters") }} </span>
            <div class="middle-parameters">
              <button @click="toggle">
                <span>{{ $t("count") }}</span>
                <img src="../../assets/icons/ion_calculator-outline.svg" />
              </button>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="header">
            <span>{{ $t("prices") }}</span>
            <UIBookmarks :product="getProduct?.product" />
          </div>

          <div class="numbers">
            <p>
              <span>{{ $t("piece") }}</span>
              <span class="numbers-price">{{ selectedProductPrice }} сом</span>
            </p>
          </div>

          <div class="count">
            <span class="each-block-info-col">{{ $t("quantity") }}</span>
            <button class="prod-count-buttons">
              <span @click="decreaseCount">-</span>
              <span>{{ countToBuy }}</span>
              <span @click="increaseCount">+</span>
            </button>
          </div>

          <div class="count">
            <span class="each-block-info-col">{{ $t("sum") }}</span>
            {{ selectedProductPrice * countToBuy }} сом
          </div>

          <div class="buy-btns">
            <button @click="addToCart">
              {{ !isProductExistsInCart ? $t("addToCart") : $t("addedToCart") }}
            </button>
            <button @click.capture="buyNow">
              {{ $t("buyNow") }}
            </button>
          </div>
        </div>
      </div>
    </ClientOnly>

    <OverlayPanel ref="countOverlay" class="countOverlay">
      <div class="count-overlay">
        <span class="header">{{ $t("count") }}</span>
        <p class="count-overlay-info">
          {{ $t("productCountInfo") }}
        </p>
      </div>
    </OverlayPanel>
    <Dialog
      v-model:visible="isProfileOpen"
      modal
      :style="{ width: '450px', padding: '10px 40px 40px 40px' }"
    >
      <AuthModal @close-modal="() => (isProfileOpen = false)" />
    </Dialog>
    <Dialog
      v-model:visible="isConfirmOpen"
      modal
      :style="{ width: '550px', padding: '20px 40px 50px 20px' }"
      header=" "
    >
      <ConfirmPay
        :title="$t('confirmOrderText')"
        @cancel="isConfirmOpen = false"
        @confirm="confirmCreatePay"
      />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Rating from "primevue/rating";
import { ExtendedProduct } from "@/types/Product";
import { Brands } from "~/types/Brands";
import { Variant } from "~/types/Variant";
const isConfirmOpen = ref(false);
const props = defineProps<{
  productId: string;
}>();
const ratingValue = ref(0);
const countOverlay = ref();
const volumeBtn = ref("");
const countToBuy = ref(1);
const totalPrice = ref(0);
const authStore = useAuthStore();
const brandsStore = useBrandsStore();
const productStore = useProductsSstore();
const store = useCartStore();
const productBrand = ref({} as Brands);
const selectedProductPrice = ref(0);
const selectedBase = ref("");
const isProductBookmarked = ref(false);
const isProfileOpen = ref(false);
const { getProduct } = storeToRefs(productStore);

const { t } = useI18n();

const toggle = (event: any) => {
  countOverlay.value.toggle(event);
};
const productImage = ref("");
productImage.value = getProduct.value.product?.images[0];
ratingValue.value = getProduct.value?.product?.rating;

const selectVolumeSize = (value: any, index: number) => {
  if (volumeBtn.value === value?.id) {
    removeVolume();
  } else {
    volumeBtn.value = value?.id;
    if (getProduct.value?.product?.variants) {
      if (value?.image) {
        productImage.value = value?.image;
      } else {
        productImage.value = getProduct?.value?.product?.images[0];
      }
      selectedProductPrice.value =
        getProduct.value?.product?.variants[index].price;

      selectedBase.value = value?.base;
    }
  }
};

const selectedDefaultVolume = (value: string) => {
  if (volumeBtn.value === value) {
    removeVolume();
  } else {
    volumeBtn.value = value;
    selectedProductPrice.value = getProduct.value?.product?.price;
    selectedBase.value = "";
  }
};

const decreaseCount = () => {
  if (countToBuy.value > 1) {
    countToBuy.value = countToBuy.value - 1;
    if (getProduct.value?.product?.price) {
      totalPrice.value = countToBuy.value * getProduct.value?.product?.price;
    }
    if (isProductExistsInCart.value) {
      if (getProduct.value?.product?.price) {
        const updatedItem = {
          ...getProduct?.value?.product,
          count: countToBuy.value,
          totalProdSum: totalPrice.value,
          initPrice: +getProduct.value?.product?.price,
        };
        if (updatedItem) {
          store.updateCartItem(updatedItem);
          useNotif("success", t("successEdited"), t("success"));
        }
      }
    }
  }
};
const increaseCount = () => {
  countToBuy.value = countToBuy.value + 1;
  if (getProduct.value?.product?.price) {
    totalPrice.value = countToBuy.value * getProduct.value?.product?.price;
  }
  if (isProductExistsInCart.value) {
    if (getProduct.value?.product?.price) {
      const updatedItem = {
        ...getProduct?.value?.product,
        count: countToBuy.value,
        totalProdSum: totalPrice.value,
        initPrice: +getProduct.value?.product?.price,
      };
      if (updatedItem) {
        console.log("updatedItem", updatedItem);
        store.updateCartItem(updatedItem);
        useNotif("success", t("successEdited"), t("success"));
      }
    }
  }
};

const confirmCreatePay = async () => {
  const orderBody = {
    price: selectedProductPrice.value * countToBuy.value,
    quantity: countToBuy.value,
    productId: getProduct?.value?.product?.id,
    productName: getProduct?.value?.product?.name,
    customerId: authStore?.getUserId ? authStore.getUserId : "",
  };

  try {
    const response = await http.post(
      "/api/v1/Order/create-order",

      [orderBody],
    );
    if (response.data.code === 200) {
      return navigateTo(`/place-order/${response.data?.message?.id}`);
    }

    console.log("response confirmCreatePay", response);
  } catch (err) {
    console.log(err);
  }
};
const buyNow = () => {
  if (authStore.getUserId) {
    console.log("buy now");
    isConfirmOpen.value = true;
  } else {
    isProfileOpen.value = true;
  }
};

const addToCart = () => {
  const prodItem = {
    ...getProduct.value?.product,
    count: countToBuy.value,
    totalProdSum: totalPrice.value,
    initPrice: selectedProductPrice.value,
  };
  store.addToCart(prodItem);
};

const isProductExistsInCart = computed(() => {
  const index = store.getAllCart?.findIndex(
    (item) => item?.id === getProduct.value?.product?.id,
  );
  return index !== -1;
});

const leastSmallAmount = ref(0);

const prodCart = computed(() => {
  return store?.getAllCart?.find(
    (item: ExtendedProduct) => item?.id === getProduct?.value?.product?.id,
  );
});

if (prodCart.value && prodCart.value !== null) {
  countToBuy.value = prodCart?.value?.count;
}

const removeVolume = () => {
  selectedProductPrice.value = getProduct.value?.product?.price;
  volumeBtn.value = "";
  productImage.value = getProduct?.value?.product?.images[0];
  selectedBase.value = "";
};

onUnmounted(() => {
  leastSmallAmount.value = 0;
});

onMounted(async () => {
  productStore.fetchProductById(props?.productId);
  if(authStore.getUserId){
    productStore.getBookmarks(getProduct.value?.product?.id);
  }
  isProductBookmarked.value = productStore.getProductBookmarked;
  if (getProduct && getProduct?.value?.product?.brandId) {
    productBrand.value = await brandsStore.fetchAllBrandId(
      getProduct?.value?.product?.brandId,
    );
  }
  selectedProductPrice.value = getProduct.value?.product?.price;
  totalPrice.value = countToBuy.value * selectedProductPrice.value;
  volumeBtn.value = getProduct.value?.product?.size;
});
</script>

<style scoped lang="scss">
@import "../../assets/tabs.scss";

.count-overlay-info {
  max-width: 256px;
  width: 100%;
  @include textFormat(16px, 24px, 400, #000);
  margin-top: 40px;
}
.volume-btn {
  position: relative;
}
.remove-volume {
  position: absolute;
  top: -8px;
  right: 0;
  color: black;
}
.brand-logo {
  width: 120px;
}

.count-overlay {
  @include flex(column, start, space-between);
  padding: 20px;

  .header {
    @include footerSpan(24px, 24px);
    color: $main-black !important;
    font-weight: 700;
  }

  &-inputs {
    @include flex(row, center, center, 2px);

    &-block {
      @include flex(column, start, start);
    }

    .sign {
      margin-top: 20px;
      width: 5% !important;
      margin-left: -4px;
    }

    span {
      @include footerSpan(20px, 14px);
      color: black !important;
      width: 95%;
      text-align: center;
    }

    input {
      width: 95%;
      padding: 10px 35px;
      border: 1px solid $slider-border-color;
    }
  }

  &-res {
    @extend %border-bottoms;
    padding-bottom: 20px;

    span {
      @extend %sm-span;
      color: $main-gray !important;
    }

    p {
      color: black;
    }
  }

  &-finish {
    @include flex(row, space-between, center);
    @include footerSpan(20px, 20px);
    color: $main-black !important;
    font-weight: 600;
  }

  button {
    @extend %button-shared;
    margin-top: 40px;
    font-size: 20px;
  }
}

:deep(.p-overlaypanel) {
  width: 300px;
}

.buy-btns {
  @include flex(column, start, auto);
}

.buy-btns button:first-child {
  @extend %button-shared;
  font-size: 18px;
}

.buy-btns button:last-child {
  @include items-button(
    6px 20px 6px 20px,
    $main-black,
    $main-white,
    1px solid $main-white,
    18px
  );
}

.right {
  width: 45%;
  padding: 20px;
  border: 1px solid $slider-border-color;

  border-radius: 10px;
  @include flex(column, start, space-between, 25px);

  .header {
    @include flex(row, space-between, center);
    span {
      font-weight: 700 !important;
      @include footerSpan(24px, 24px);
      color: $main-black;
    }
  }

  .numbers {
    @include flex(row, center, center);

    &-price {
      color: $main-blue !important;
    }

    p {
      @include flex(column, center, center, 2px);

      span {
        @extend %sm-span;
        margin: 2px 0;
      }
    }
  }
}

.count {
  @include flex(row, space-between, center);
}

.item-page-header {
  @include flex(row, space-between, start);
}

.left {
  width: 30%;

  img {
    width: 100%;
  }
}

.middle {
  width: 80%;
  @include flex(column, start, space-between, 22px);

  &-header {
    @include footerSpan(28px, 28px);
    color: $main-black;
    font-weight: 700;
    max-width: 80%;
  }

  &-rating {
    @include flex(row, start, center, 13px);
  }
}

.middle-review {
  &-number {
    @include footerSpan(20px, 20px);
    color: $main-black;
    font-weight: 600;
  }

  &-text {
    color: $blue-color;
  }

  :deep(.p-icon) {
    @extend %rating-icon;
  }
}

.middle-volume {
  &-buttons {
    button.active-btn {
      @include items-button(8px 20px 8px 20px, white, $main-blue, none, 16px);
      margin-right: 10px;
    }

    button {
      @include items-button(
        8px 20px 8px 20px,
        $main-black,
        white,
        1px solid $slider-border-color,
        16px
      );
      margin-right: 10px;
    }
  }
}

.middle-koler {
  &-btn {
    @include items-button(8px 20px 8px 20px, white, $main-blue, none, 16px);
  }
}

.middle-parameters {
  @include flex(row, start, center);

  button {
    @include items-button(
      8px 20px 8px 20px,
      $main-black,
      $main-white,
      1px solid $main-white,
      16px
    );
    @include flex(row, start, center);
  }
}

.sizes {
  border: none;

  .btns {
    @include flex(row, start, center, 15px);
  }

  button {
    margin: 0;
    background: white;
    border: 1px solid $slider-border-color;
    @include textFormat(16px, 20x, 500, $main-black);
    width: 50%;
  }
}

@media (max-width: 1000px) {
  .item-page-header {
    flex-wrap: wrap;
    justify-content: start;
    gap: 60px;
  }

  .right {
    width: 100%;

    .header,
    .numbers,
    .count {
      width: 50%;
    }
  }

  .middle {
    width: 60%;

    &-header {
      max-width: 100%;
    }
  }

  .buy-btns {
    width: 50%;
    flex-direction: row;
  }
}

@media (max-width: 768px) {
  .middle {
    width: 50%;

    &-header {
      font-size: 24px;
      line-height: 24px;
    }
  }

  .left {
    width: 35%;
  }

  .right {
    .header,
    .numbers,
    .count,
    .buy-btns {
      width: 70%;
    }
  }
}

@media (max-width: 480px) {
  .item-page-header {
    flex-direction: column;
  }

  .middle-header {
    font-size: 20px;
    line-height: 20px;
  }

  .left,
  .middle,
  .right {
    width: 100% !important;

    .header,
    .numbers,
    .count,
    .buy-btns {
      width: 100%;
    }

    .buy-btns {
      flex-direction: column;
    }
  }

  .tabs-select {
    div:last-child {
      display: none;
    }
  }

  div:first-child::after {
    display: none;
  }
}
</style>
