<template>
  <div
    class="item-block"
    @click="router.push(`/product/${product?.id}`)"
    v-if="visibleMethod === 'vertical'"
    @mousemove="itemHover"
    @mouseleave="itemHoverLeave"
  >
    <div
      v-if="type === 'bookmark'"
      class="bookmark-icon-heart"
      @click.stop="emit('addItemToBookmarks', product?.id as string)"
    >
      <img src="../../assets/icons/icon=heart fill.svg" alt="heart icon" />
    </div>
    <slot name="edit-items"></slot>
    <img :src="product?.images[0]" format="webp" />
    <span class="item-block-name">{{ product?.name }}</span>

    <div class="product-infomation">
      <span
        >{{ $t("consumption") }}:
        {{ product?.consumption || $t("noData") }}</span
      >
      <span
        >{{ $t("dryingTime") }}: {{ product?.dryingTime || $t("noData") }}</span
      >
      <span class="volume"
        >{{ $t("volume") }} (л): {{ product?.size }}
        <span v-for="vars in product?.variants?.slice(0, 2)" :key="vars?.id">
          / {{ vars?.size?.split(" ")[0] }}</span
        >
      </span>
    </div>

    <!-- <div class="item-add-btns">
      <button @click.stop="removeCount">
        <svg
          width="14"
          height="2"
          viewBox="0 0 14 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14 1.998H0V-0.00199986H14V1.998Z" fill="#222222" />
        </svg>
      </button>
      <span>{{ countToBuy }}</span>
      <button @click.stop="increaseCount">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 7.998H8V13.998H6V7.998H0V5.998H6V-0.00199986H8V5.998H14V7.998Z"
            fill="#222222"
          />
        </svg>
      </button>
    </div> -->
    <button
      class="pink-button prod-price"
      @click.stop="router.push(`/product/${product?.id}`)"
    >
      {{
        !isItemHovered
          ? product?.price + "сом"
          : isItemHovered
            ? $t("toProduct")
            : ""
      }}
    </button>
  </div>

  <div
    class="item-block horizontal grid"
    @click="router.push(`/product/${product?.id}`)"
    v-else
    @mousemove="itemHover"
    @mouseleave="itemHoverLeave"
  >
    <div class="first-col col-6">
      <img :src="product?.images[0]" format="webp" class="col-1" />
      <div class="first-sub-col col-12">
        <span class="item-block-name">{{ product?.name }}</span>
        <div class="product-infomation">
          <span
            >{{ $t("consumption") }}:
            {{ product?.consumption || $t("noData") }}</span
          >
          <span
            >{{ $t("dryingTime") }}:
            {{ product?.dryingTime || $t("noData") }}</span
          >
          <span class="volume"
            >{{ $t("volume") }}: {{ product?.size }}л
            <span
              v-for="vars in product?.variants?.slice(0, 2)"
              :key="vars?.id"
            >
              - {{ vars?.size }}л</span
            >
          </span>
        </div>
      </div>
    </div>
    <!-- 
    <div class="item-add-btns col-1">
      <button @click.stop="removeCount">
        <svg
          width="14"
          height="2"
          viewBox="0 0 14 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14 1.998H0V-0.00199986H14V1.998Z" fill="#222222" />
        </svg>
      </button>
      <span>{{ countToBuy }}</span>
      <button @click.stop="increaseCount">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 7.998H8V13.998H6V7.998H0V5.998H6V-0.00199986H8V5.998H14V7.998Z"
            fill="#222222"
          />
        </svg>
      </button>
    </div> -->
    <div class="last-col col-3">
      <button
        class="item-block-buy"
        @click.stop="router.push(`/product/${product?.id}`)"
      >
        {{
          !isItemHovered
            ? product?.price + "сом"
            : isItemHovered && isProductExistsInCart
              ? $t("toProduct")
              : ""
        }}
      </button>
      <UIBookmarks :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ExtendedProduct, Product } from "@/types/Product";
const props = defineProps<{
  type?: string;
  product: Product;
  visibleMethod: string;
}>();
const router = useRouter();
const countToBuy = ref(1);
const { t } = useI18n();
const cartStore = useCartStore();

const prodBrand = ref("");

const isProductExistsInCart = computed(() => {
  const index = cartStore.getAllCart?.findIndex(
    (item) => item?.id === props?.product?.id,
  );
  return index !== -1 ? false : true;
});

const emit = defineEmits<{
  addItemToBookmarks: [string];
}>();

onMounted(async () => {
  if (props?.product) {
    prodBrand.value = await getBrandId(props?.product?.brandId);
  }
});

const prodCart = computed(() => {
  return cartStore?.getAllCart?.find(
    (item: ExtendedProduct) => item?.id === props?.product?.id,
  );
});

if (prodCart.value && prodCart.value !== null) {
  countToBuy.value = prodCart?.value?.count;
}
const removeCount = () => {
  if (countToBuy.value > 1) {
    countToBuy.value = countToBuy.value - 1;
    if (props?.product?.price) {
      totalPrice.value = countToBuy.value * props?.product?.price;
    }

    if (isProductExistsInCart.value) {
    } else {
      if (props.product?.price) {
        const updatedItem = {
          ...props?.product,
          count: countToBuy.value,
          totalProdSum: totalPrice.value,
          initPrice: +props?.product?.price,
        };
        if (updatedItem) {
          cartStore.updateCartItem(updatedItem);
          useNotif("success", t("successEdited"), t("success"));
        }
      }
    }
  }
};
const totalPrice = ref();
if (props?.product?.price) {
  totalPrice.value = countToBuy.value * props?.product?.price;
}

const increaseCount = () => {
  countToBuy.value = countToBuy.value + 1;
  if (props?.product?.price) {
    totalPrice.value = countToBuy.value * props?.product?.price;
  }
  if (isProductExistsInCart.value) {
  } else {
    if (props.product?.price) {
      const updatedItem = {
        ...props?.product,
        count: countToBuy.value,
        totalProdSum: totalPrice.value,
        initPrice: +props?.product?.price,
      };
      if (updatedItem) {
        cartStore.updateCartItem(updatedItem);
        useNotif("success", t("successEdited"), t("success"));
      }
    }
  }
};
const addCart = () => {
  if (props.product?.price) {
    const prodItem = {
      ...props?.product,
      count: countToBuy.value,
      totalProdSum: totalPrice.value,
      initPrice: props?.product?.price,
    };
    if (props?.product) {
      cartStore.addToCart(prodItem);
    }
  }
};
const isItemHovered = ref(false);

const itemHover = () => {
  isItemHovered.value = true;
};
const itemHoverLeave = () => {
  isItemHovered.value = false;
};
const productName = (name: string) => {
  return name && name?.split(" ").length > 5
    ? name?.split(" ").slice(0, 5).join(" ") + "..."
    : name;
};
</script>

<style scoped lang="scss">
.item-block {
  transition: 0.3s ease all;
  border-radius: 10px;
  @include flex(column, start, start);
}
@keyframes slideFromBottomToTop {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes slideFromTopToBottom {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.item-add {
  opacity: 0;
  visibility: hidden;
  animation: slideFromTopToBottom 0.5s;
  display: none;
}
.item-block-info {
  @include textFormat(14px, 20px, 600, $main-dark-grey);
  max-width: 95%;
  width: 100%;
  margin: 15px 0;
  height: 83px;
}
.horizontal .item-add-btns {
  width: 20%;
}
.item-add-btns {
  opacity: 0;
  visibility: hidden;
  @include flex(row, center, center, 20px);
  color: $main-black;
  width: 100%;

  span {
    font-size: 16px;
    line-height: 20px;
  }
  button {
    background: #f5f5f5;
    border-radius: 50%;

    outline: none;
    padding: 5px;
    border: none;
    font-size: 20px;
    line-height: 32px;
    @include flex(row, center, center);
    &:hover {
      background: #dddddd;
    }
    &:first-child {
      padding: 11px 5px;
    }
  }
}
.item-block {
  width: 31%;
  padding: 20px;
  overflow: hidden;
  &:hover {
    .item-add {
      animation: slideFromBottomToTop 0.5s ease-out forwards;
      @include flex(column, center, center);
      opacity: 1;
      visibility: visible;
    }
    .item-add-btns {
      opacity: 1;
      visibility: visible;
    }
  }

  img {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }

  &-name {
    max-width: $product-item-width;
    font-size: 16px;
    font-weight: 600;
    color: $main-black;
    height: 42px !important;
    width: 100%;
    display: block;
    overflow-x: hidden;
    line-height: 20px;
    margin-top: 10px;

    overflow-y: hidden;
  }

  &-info {
    max-width: 100%;
    width: 100%;
    word-wrap: break-word !important;
  }

  &-buy {
    @extend %button-shared;
    font-weight: 600;
    font-size: 20px;
    width: $product-item-width;
  }
}

.each-block-info-col {
  @include flex(row, space-between, center);
}

.item-block:hover {
  cursor: pointer;
  box-shadow: 0px 6px 18px 0px #0000001f;
  transition: 0.3s ease all;
}

.horizontal .item-block {
  width: 100% !important;
  @include flex(row, space-between, start);

  .first-col {
    @include flex(row, space-between, start);
  }

  .first-sub-col {
    max-width: 80%;
  }

  .last-col {
    @include flex(column, start, flex-end, 20px);
  }

  .item-block-info {
    margin-top: 16px;
  }

  .item-block-buy {
    width: 100%;
    button: 100%;
  }
}

.each-block-info-col {
  justify-content: start;
}

@media (max-width: 1000px) {
  .item-block {
    width: 42%;
  }
}

@media (max-width: 768px) {
  .item-block {
    width: 45%;
    padding: 10px;

    &-name {
      text-align: start !important;
      margin-bottom: 10px;
    }

    img {
      width: 120px;
      height: 120px;
    }
  }

  .item-block-buy {
    padding: 13px 19px;
    font-size: 18px;
  }

  .item-block.horizontal .first-col {
    gap: 20px;
  }

  .item-block.horizontal {
    gap: 20px;
  }
}

@media (max-width: 576px) {
  .item-block {
    width: 100%;
    box-shadow: $item-block-shadow;

    img {
      width: 120px;
      height: 120px;
    }
  }

  .item-block.horizontal {
    flex-direction: column;
  }

  .item-block.horizontal .first-col {
    max-width: 100%;
  }

  .item-block.horizontal .last-col {
    @include flex(row, start, center);
    margin-top: 10px;

    width: 100%;

    button:first-child {
      width: 45%;
    }

    button:last-child {
      width: 50%;
    }
  }
}
</style>
