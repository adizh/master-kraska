<template>
  <section>
    <ClientOnly>
      <h1>{{ $t("profile") }}</h1>
      <div class="profile-main grid">
        <ul class="sidebar col-12 sm:col-12 lg:col-3">
          <li
            v-for="(item, index) in tabsOptions"
            :key="item"
            :class="{ active: index + 1 === selectedTab }"
            @click="() => selectTab(index + 1)"
          >
            {{ item }}
          </li>
          <li class="" @click="openLogout">
            {{ $t("logoutext") }}
          </li>
        </ul>

        <div
          v-if="selectedTab === 1"
          class="col-12 sm:col-12 md:col-9 lg:col-8 right-side"
        >
          <ProfileForm />
        </div>

        <div
          v-else-if="selectedTab === 2"
          class="col-12 md:col-12 lg:col-9 right-side"
        >
          <div class="order-history">
            <OrdersItem />
          </div>
        </div>

        <div
          v-else-if="selectedTab === 3"
          class="col-12 md:col-12 lg:col-8 right-side"
        >
          <div v-if="cartStore.getAllCart?.length">
            <CartProductItem
              v-for="item in cartStore.getAllCart"
              :key="item?.id"
              :item="item"
              @remove-from-cart="removeFromCart"
              @increase-count="increaseCount"
              @decrease-count="decreaseCount"
              @confirm-delete="confirmDelete"
            />
            <div class="flex justify-content-end flex-row">
              <button class="btn-white-bg" @click="cartStore.saveNewCart">
                {{ $t("saveChanges") }}
              </button>
            </div>

            <div class="cart-main-info-price col-12">
              <div class="lg:col-6 col-12 md:col-9">
                <button class="pink-button" @click="isConfirmOpen = true">
                  {{ $t("goToRegister") }}
                </button>
                <div class="cart-main-info-price-block">
                  <div class="first">
                    <span>{{ $t("all") }}: {{ totalOfProdTotals }}
                      {{ $t("product") }}</span>
                    <span>{{ cartStore.totalOfTotalSum }} сом</span>
                  </div>
                  <div class="second">
                    <span>{{ $t("accountPiece") }}</span>
                    <span>0%</span>
                  </div>
                  <input class="basic-input" placeholder="Промокод">
                  <div class="last">
                    <span>{{ $t("inTotal") }}</span>
                    <span>{{ cartStore.totalOfTotalSum }} сом</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <NoContent v-else :title="$t('noCart')">
            <template #icon>
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31.1667 31.1667C30.1942 31.1667 29.2616 31.553 28.5739 32.2406C27.8863 32.9282 27.5 33.8609 27.5 34.8333C27.5 35.8058 27.8863 36.7384 28.5739 37.4261C29.2616 38.1137 30.1942 38.5 31.1667 38.5C32.1391 38.5 33.0718 38.1137 33.7594 37.4261C34.447 36.7384 34.8333 35.8058 34.8333 34.8333C34.8333 33.8609 34.447 32.9282 33.7594 32.2406C33.0718 31.553 32.1391 31.1667 31.1667 31.1667ZM31.1667 31.1667H17.039C16.1938 31.1667 15.7703 31.1667 15.422 31.0163C15.1151 30.8839 14.8501 30.6703 14.6557 30.3985C14.4357 30.0923 14.3495 29.6835 14.1772 28.8768L9.66167 7.81917C9.48567 6.99233 9.39583 6.578 9.17583 6.27C8.98103 5.9973 8.71541 5.78303 8.40767 5.65033C8.06117 5.5 7.6395 5.5 6.79617 5.5H5.5M11 11H34.6005C35.9242 11 36.5842 11 37.0297 11.275C37.4188 11.5168 37.7033 11.8955 37.8272 12.3365C37.9683 12.8388 37.7868 13.475 37.4202 14.7455L34.881 23.5455C34.661 24.3063 34.551 24.6858 34.331 24.9682C34.1338 25.2174 33.8755 25.4113 33.5812 25.531C33.2512 25.6667 32.8552 25.6667 32.0687 25.6667H14.1717M14.6667 38.5C13.6942 38.5 12.7616 38.1137 12.0739 37.4261C11.3863 36.7384 11 35.8058 11 34.8333C11 33.8609 11.3863 32.9282 12.0739 32.2406C12.7616 31.553 13.6942 31.1667 14.6667 31.1667C15.6391 31.1667 16.5718 31.553 17.2594 32.2406C17.947 32.9282 18.3333 33.8609 18.3333 34.8333C18.3333 35.8058 17.947 36.7384 17.2594 37.4261C16.5718 38.1137 15.6391 38.5 14.6667 38.5Z"
                  stroke="#222222"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </template>
          </NoContent>
          <Dialog
            v-model:visible="isConfirmOpen"
            modal
            :style="{ width: '550px', padding: '20px 40px 50px 20px' }"
            header=" "
          >
            <ConfirmPay
              :title="$t('confirmOrderText')"
              @cancel="isConfirmOpen = false"
              @confirm="createOrder"
            />
          </Dialog>
        </div>

        <div
          v-else-if="selectedTab === 4"
          class="col-12 md:col-12 lg:col-8 right-side"
        >
          <ProfileReviews />
        </div>

        <div
          v-else-if="selectedTab === 5"
          class="col-12 md:col-12 lg:col-8 right-side"
        >
          <ProfileNotifications />
        </div>

        <div
          v-else-if="selectedTab === 6"
          class="col-12 lg:col-8 md:col-12 right-side"
        >
          <div v-if="userBookmarks?.length" class="bookmarked-list">
            <ProductsProductItem
              v-for="item in userBookmarks"
              :key="item.id"
              :product="item"
              from="bookmarks"
              @add-item-to-bookmarks="addItemToBookmarks"
            />
          </div>

          <NoContent v-else title="Избранные пусто">
            <template #icon>
              <img
                src="../assets/icons/icon=heart.svg"
                alt="heart"
                class="no-content-img"
              >
            </template>
          </NoContent>
        </div>
      </div>

      <Dialog
        v-model:visible="isLogoutOpen"
        modal
        header=" "
        :style="{ padding: '20px 40px 50px 20px' }"
      >
        <template #header>
          <div class="p-modal-header" />
        </template>
        <template #closeicon>
          <span class="close-icon-modal">X</span>
        </template>
        <div class="modal-header">
          {{ $t("logoutWarningText") }}?
        </div>
        <div class="modal-btns">
          <button @click="isLogoutOpen = false">
            {{ $t("cancel") }}
          </button>
          <button @click="confirmedLogout">
            {{ $t("logout") }}
          </button>
        </div>
      </Dialog>

      <Dialog
        v-model:visible="isDeleteOpen"
        modal
        :style="{ width: '550px', padding: '20px 40px 50px 20px' }"
        header=" "
      >
        <ConfirmPay
          :title="$t('deleteCartProdWarning')"
          @confirm="removeFromCart"
          @cancel="isDeleteOpen = false"
        />
      </Dialog>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Product, ExtendedProduct } from "~/types/Product";
const { t } = useI18n();

const isLogoutOpen = ref(false);
const isConfirmOpen = ref(false);

const userBookmarks = ref<Product[]>([]);
let selectedTab: Ref<number>;
const tabsOptions = [
  t("personalInfo"),
  t("ordersHistory"),
  t("cart"),
  t("myReviews"),
  t("notificationSettings"),
  t("boormarksProfile")
];
const store = useAuthStore();
const productsStore = useProductsSstore();
const orderStore = useOrderStore();
const cartStore = useCartStore();
const currentProd = ref({} as ExtendedProduct);
const isDeleteOpen = ref(false);
const openLogout = () => {
  isLogoutOpen.value = true;
};

if (process.client) {
  if (
    localStorage.getItem("selectedTab") &&
    localStorage.getItem("selectedTab") !== null
  ) {
    selectedTab = ref<number>(
      parseInt(localStorage.getItem("selectedTab") as string)
    );
  } else {
    selectedTab = ref<number>(1);
  }
} else {
  selectedTab = ref(1);
}
const createOrder = () => {
  orderStore.createOrder();
};

const confirmedLogout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("cart");
  navigateTo("/");
  setTimeout(() => {
    window.location.reload();
  }, 700);
};

const selectTab = (tab: number) => {
  selectedTab.value = tab;
  if (tab === 7) {
    openLogout();
  } else if (tab === 5) {
    fetchUserBookmarks();
  }
  localStorage.setItem("selectedTab", selectedTab.value.toString());
};

const fetchUserBookmarks = async () => {
  try {
    const response = await http.get(
      `/api/v1/Bookmark/get-bookmark-by-user-id/${store.getUserId}`
    );
    console.log("response fetchUserBookmarks", response);
    if (response.status === 200) {
      const filtered = response.data.products.map((item: Product) => {
        if (store.getSelectedLang === "kg") {
          return {
            ...item,
            name: item?.nameKg
          };
        } else {
          return {
            ...item,
            name: item?.nameRu
          };
        }
      });
      userBookmarks.value = filtered;
    }
  } catch (err) {
    console.log(err);
  }
};

const addItemToBookmarks = (objectId: string) => {
  // productsStore.addToBookmarks(objectId);
  console.log("addItemToBookmarks");
};

const confirmDelete = (prop: ExtendedProduct) => {
  isDeleteOpen.value = true;
  currentProd.value = prop;
};

const removeFromCart = () => {
  if (currentProd?.value) {
    cartStore.removeFromCart(currentProd.value);
  }
  isDeleteOpen.value = false;
};
const increaseCount = (item: ExtendedProduct) => {
  cartStore.increaseCount(item);
};

const decreaseCount = (item: ExtendedProduct) => {
  cartStore.decreaseCount(item);
};
const totalOfProdTotals = computed(() => {
  return cartStore.getAllCart.reduce((acc, rec) => acc + rec?.count, 0);
});
onUnmounted(() => {
  localStorage.removeItem("selectedTab");
});

onMounted(() => {
  if (!store.getUserId) {
    navigateTo("/");
  }
  store.fetchUser();
  fetchUserBookmarks();
});
onBeforeRouteLeave(() => {
  localStorage.removeItem("selectedTab");
});
</script>

<style scoped lang="scss">
:deep(.p-dialog .p-dialog-content) {
  overflow-y: hidden;
}
.right-side {
  padding: 20px 40px;
}

.profile-main {
  margin-top: 41px;
  border: 1px solid $slider-border-color;
  border-radius: 10px;
}

%active-tab {
  color: $main-blue !important;
  background: #33587d10;
  cursor: pointer;
}

li.active {
  @extend %active-tab;
}

.sidebar {
  padding: 0 !important;
  border-right: 1px solid $slider-border-color;

  ul {
    @include flex(column, start, center, 10px);
  }

  li {
    @include flex(row, start, center);
    @include textFormat(16px, 20px, 500, $main-gray);
    padding: 20px;
    border-bottom: 1px solid $slider-border-color;

    &:hover {
      @extend %active-tab;
    }
  }
}

.orders {
  width: 73% !important;
}

.cart-main-info-price {
  width: 100% !important;
  @include flex(row, flex-end, center);
}

.item-block {
  width: 40%;
}

@media (max-width: 1000px) {
  .profile-main {
    border: none;
  }

  .item-block {
    width: 40%;
  }

  .sidebar {
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    border: none;

    li {
      height: 8%;
      border-bottom: none;
    }
  }

  .edit-btn {
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .item-block {
    width: 45%;
    height: 560px;
    max-height: 560px;
  }

  .right-side {
    padding: 15px;
  }
}

@media (max-width: 665px) {
  .item-block {
    &-description {
      margin-bottom: 30px;
    }
  }
}

@media (max-width: 576px) {
  .right-side {
    padding: 5px;
  }

  .item-block {
    width: 100% !important;
  }

  .modal-header,
  .modal-btns button {
    font-size: 15px;
  }
}
</style>
