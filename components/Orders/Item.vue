<template>
  <div v-if="userOrders?.length > 0">
    <div class="item" v-for="order in userOrders" :key="order?.id">
      <span class="item-date">{{ formatDated(order?.createdAt) }}</span>
      <div class="item-info grid">
        <div class="header grid col-12">
          <div class="lg:col-4 sm:col-5 col-6">
            <span>{{ $t("productCap") }}</span>
            <p>{{ $t("desctiption") }}</p>
          </div>
          <div class="lg:col-3 sm:col-4 col-4">
            <span>{{ $t("quantity") }}</span>
            <p>{{ orderCount(order) }}</p>
          </div>
          <div class="lg:col-3 sm:col-3 col-4">
            <span>{{ $t("sum") }}</span>
            <p>{{ order?.total }} сом</p>
          </div>
          <div
            class="lg:col-2 sm:col-2 col-7 more-info"
            @click="() => toggleCatalog(order?.id)"
          >
            {{ $t("moreInfo") }}
            <img
              class="arrow"
              :class="{ rotated: openedProducts.includes(order.id) }"
              src="../../assets/icons/icon=components-arrow-blue.svg"
              alt="open-arrow"
            />
          </div>
        </div>

        <div class="expanded-container">
          <div
            class="expanded-section"
            v-for="item in order?.items"
            :key="item?.id"
            v-if="openedProducts.includes(order.id)"
            :class="{
              'slide-enter': openedProducts.includes(order.id),
              'slide-leave-to': !openedProducts.includes(order.id),
            }"
          >
            <div class="item-info grid">
              <div
                class="lg:col-6 md:col-12 fcol-12 flex flex-row gap-2 align-items-start expanded-prod-main"
              >
                <img :src="item?.image" alt="" class="expanded-img" />
                <div class="expanded-section-info">
                  <span>{{ item?.productName }}</span>
                </div>
              </div>
              <div class="col-5 md:col-3 lg:col-2">
                <p>{{ $t("piece") }}</p>
              </div>
              <div class="col-12 md:col-3 lg:col-2">
                <p>{{ item?.price * item?.quantity }} сом</p>
              </div>
              <div class="col-12 md:col-5 lg:col-2">
                <button class="bg-white-btn" @click="openReOrder(item)">
                  {{ $t("orderAgain") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <UIPagination
      :total="totalPages"
      :currentActive="currentPage"
      @changePage="changePage"
    />
  </div>

  <NoContent v-else-if="!userOrders?.length" :title="$t('noHistoryOrder')">
    <template #icon>
      <img
        src="../../assets/icons/black/icon=components -time-notfill.svg"
        alt=""
      />
    </template>
  </NoContent>

  <Dialog
    v-model:visible="isConfirmOpen"
    modal
    :style="{ width: '550px', padding: '20px 40px 50px 20px' }"
    header=" "
  >
    <h5 class="modal-header">{{ $t("confirmOrderText") }}?</h5>
    <div class="flex flex-row justify-content-end gap-2">
      <button class="modal-btns">{{ $t("confirm") }}</button>
      <button @click="isConfirmOpen = false" class="modal-btns blue">
        {{ $t("cancel") }}
      </button>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="isPayOpen"
    modal
    :style="{ width: '550px', padding: '20px 40px 50px 20px' }"
    header=" "
  >
    <ConfirmPay
      @cancel="isPayOpen = false"
      @confirm="confirmOrder"
      :title="$t('confirmOrderText')"
    />
  </Dialog>
</template>

<script setup lang="ts">
import { OrderItem, UserOrder } from "~/types/Order";
import moment from "moment";
import { User } from "~/types/User";
const totalPages = ref(1);
const isPayOpen = ref(false);
const formatDated = (date: string) => {
  return moment(date).format("D/MM/YY");
};
const { t } = useI18n();
const isConfirmOpen = ref(false);
const isCatalogOpen = ref("");
const userOrders = ref<OrderItem[]>([]);
const authStore = useAuthStore();
const router = useRouter();
const openedProducts = ref([] as any[]);
const reOrderItem = ref({} as UserOrder);
const currentPage = ref(1);
const orderCount = (order: OrderItem) => {
  return order?.items?.reduce((acc, rec) => acc + rec?.quantity, 0);
};

const openReOrder = (item: UserOrder) => {
  isPayOpen.value = true;
  reOrderItem.value = item;
};

const confirmOrder = async () => {
  const allOrderItems = {
    customerId: authStore.getUserId ? authStore.getUserId : "",
    productId: reOrderItem.value?.productId,
    productName: reOrderItem.value?.productName,
    price: reOrderItem.value?.price,
    quantity: reOrderItem.value?.quantity,
  };
  console.log("reOrderItem", reOrderItem);
  console.log("allOrderItems", allOrderItems);

  try {
    const response = await http.post("/api/v1/Order/create-order", [
      allOrderItems,
    ]);
    console.log("response confirm reorder", response);
    if (response.data.code === 200) {
      router.push(`/place-order/${response.data.message?.id}`);
    }
  } catch (err: any) {
    console.log(err);
    if (err.response?.data?.code === 400) {
      useNotif("error", t("errCreatingOrder"), t("error"));
      isPayOpen.value = false;
    }
  }
};

const toggleCatalog = (id: string) => {
  const prodIndex = openedProducts.value.indexOf(id);

  if (prodIndex === -1) {
    openedProducts.value.push(id);
  } else {
    openedProducts.value.splice(prodIndex, 1);
  }
};
const changePage = (page: number) => {
  currentPage.value = page;
  getOrderByUser();
};

const getOrderByUser = async () => {
  try {
    const response = await http(
      `/api/v1/Order/get-orders-by-user-id/${authStore.getUserId}?page=${currentPage?.value}&pageSize=4`,
    );
    if (response.status === 200) {
      console.log("get order by user", response);
      totalPages.value = response.data?.totalPages;
      userOrders.value = response.data?.items?.map((order: OrderItem) => {
        return {
          ...order,
          items: order?.items.map((eachItem) => {
            if (authStore.getSelectedLang === "kg") {
              return {
                ...eachItem,
                productName: eachItem?.productNameKg,
              };
            } else {
              return {
                ...eachItem,
                productName: eachItem?.productNameRu,
              };
            }
          }),
        };
      });
      console.log("userOrders>>>>", userOrders);
    }
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  authStore.fetchUser();
  getOrderByUser();
});
</script>

<style scoped lang="scss">
.header {
  padding-bottom: 20px;
}

.more-info {
  @include textFormat(16px, 20px, 500, #33587d);
  @include flex(row, center, center, 2px);
  transition: transform 0.5s ease;
}

.item {
  margin-bottom: 40px;

  &-date {
    margin-bottom: 15px;
    display: block;
    @include textFormat(20px, 20px, 600, #222);
  }

  p {
    @include textFormat(20px, 20px, 500, #000);
    margin-top: 4px;
  }

  &-info {
    background: $main-white;
    padding: 20px;

    span {
      @extend %sm-span;
      font-size: 20px;
      line-height: 32px;
      margin: 0 !important;
    }
  }
}

.more-info:hover {
  cursor: pointer;
}

@keyframes slideFromUpToBottoms {
  0% {
    opacity: 0;
    transform: translateY(-10%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideFromBottomToUp {
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;

    transform: translateY(-10%);
  }
}

.expanded-section.slide-enter {
  animation: slideFromUpToBottoms 0.6s ease forwards;

  display: block;
}

.expanded-section.slide-leave-to {
  animation: slideFromBottomToUp 0.3s ease forwards !important;
  display: none !important;
}

.expanded-container {
  width: 100%;
  border-top: 1px solid $slider-border-color;
}

.expanded-section {
  width: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
  display: none;
  margin-top: 20px;
  transition: 0.5s ease all;
  padding-top: 20px;

  .prod-img {
    width: 25%;
  }

  span:first-child {
    @include textFormat(28px, 28px, 500, $main-black);
  }

  span:nth-child(2),
  span:last-child {
    margin-top: 10px !important;
    display: block;
    @include textFormat(16px, 24px, 400, $footer-bottom-color);
  }

  button {
    box-shadow: 0px 0px 0px 0.5px #0000000d;
  }
}

.expanded-img {
  margin-left: -20px;
  width: 120px;
}

.expanded-section-info span:first-child {
  font-size: 22px;
  line-height: 22px;
  color: #222;
  font-weight: 500;
}

@media (max-width: 1000px) {
  .expanded-section-info span:first-child {
    font-size: 18px;
    line-height: 20px;
  }

  .item-info {
    align-items: center;
  }
}

@media (max-width: 768px) {
  .item-info {
    align-items: center;
  }

  .expanded-img {
    margin-left: -55px;
  }
}

@media (max-width: 540px) {
  .expanded-img {
    margin-left: -35px;
  }
}

@media (max-width: 480px) {
  .expanded-prod-main {
    flex-direction: column !important;
  }

  .expanded-img {
    width: 50%;
  }

  .expanded-section-info span:first-child {
    font-size: 16px;
  }
}
</style>
