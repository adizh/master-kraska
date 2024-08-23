<template>
  <div class="item-block">
    <UIDropdown
      :isDropdownOpen="isUIDropdownOpen"
      :selectedValue="initStatus"
      :options="statusOptions"
      @toggleDropdownUI="toggleDropdownUI"
      @selectValue="selectState"
      label="name"
    />

    <p>
      <span class="item-block-info">Номер заказа: </span>
      {{ item?.orderNumber }}
    </p>

    <p>
      <span class="item-block-info">Создан: </span>
      {{ formatDate(item?.createdAt) }}
    </p>

    <p>
      <span class="item-block-info">Дата оплаты: </span>
      {{
        formatDate(item?.payDate !== null ? item.payDate : "") || "Нет данных"
      }}
    </p>

    <p>
      <span class="item-block-info">Оплачен: </span>
      {{ item?.isPaid ? "Да" : "Нет" }}
    </p>

    <p><span class="item-block-info">Общая сумма: </span> {{ item?.total }}</p>

    <p>
      <span class="item-block-info">Статус: </span>
      {{ statusMaps[item?.status as keyof typeof statusMaps] || "Нет данных" }}
    </p>

    <button @click="isOpen = !isOpen" class="show-info-btn">
      {{ !isOpen ? "Показать" : "Свернуть" }}
    </button>

    <Transition name="slide-fade">
      <div v-if="isOpen">
        <div v-for="itemInfo in item?.items" :key="itemInfo.id">
          <div class="flex flex-row col-info">
            <div class="col-info-block">
              <p>
                <span class="item-block-info">ФИО заказчика: </span>
                {{ itemInfo?.customerFullName || "Нет данных" }}
              </p>
              <p>
                <span class="item-block-info">Почта заказчика: </span>
                {{ itemInfo?.customerEmail || "Нет данных" }}
              </p>
              <p>
                <span class="item-block-info">Адрес заказчика: </span>
                {{ itemInfo?.customerAddress || "Нет данных" }}
              </p>

              <p>
                <span class="item-block-info">Номер заказчика: </span>
                {{ itemInfo?.phoneNumber || "Нет данных" }}
              </p>
            </div>
            <div class="col-info-block">
              <p>
                <span class="item-block-info">Название продукта: </span>
                {{ itemInfo?.productNameRu || "Нет данных" }}
              </p>
              <p>
                <span class="item-block-info">Цена: </span>
                {{ itemInfo?.price || "Нет данных" }}
              </p>
              <p>
                <span class="item-block-info">Количество: </span>
                {{ itemInfo?.quantity || "Нет данных" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <UIModal :show-modal="isModalOpen" @close-modal="isModalOpen = false">
      <ConfirmPay
        @cancel="isModalOpen = false"
        @confirm="confirmStatus"
        :title="`Вы потверждаете статус ${initStatus?.name} для заказа ${item?.orderNumber}`"
      />
    </UIModal>
  </div>
</template>

<script setup lang="ts">
type StatusOption = {
  name: "Активный" | "Отменить" | "Завершить";
  value: "Active" | "Canceled" | "Completed";
};
import { OrderItem, UserOrder } from "~/types/Order";
const isOpen = ref(false);
const isModalOpen = ref(false);
const orderStore = useOrderStore();
const props = defineProps<{
  item: OrderItem;
}>();
const isUIDropdownOpen = ref(false);
const initStatus = ref({
  name: "Выбрать статус",
  value: "",
});

const statusMaps = {
  Active: "Активный",
  Canceled: "Отмененный",
  Completed: "Завершенный",
};

const statusOptions = ref<StatusOption[]>([
  { name: "Активный", value: "Active" },
  { name: "Отменить", value: "Canceled" },
  { name: "Завершить", value: "Completed" },
]);
const toggleDropdownUI = () => {
  isUIDropdownOpen.value = !isUIDropdownOpen.value;
};

const selectState = (event: { name: string; value: string }) => {
  initStatus.value = event;
  isUIDropdownOpen.value = false;
  isModalOpen.value = true;
};

const confirmStatus = async () => {
  try {
    const response = await http.post(
      `/api/v1/Order/change-order-status?orderId=${props?.item?.id}&status=${initStatus?.value?.value}`,
    );
    if (response.status === 200) {
      useNotif("success", "Статус обновлен", "Успешно");
      isModalOpen.value = false;
      initStatus.value.name = "Выбрать статус";
      orderStore.fetchOrders();
    }
  } catch (err) {
    console.log(err);
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/dropdown.scss";
.item-block {
  box-shadow: 0px 6px 18px 0px rgba(0, 0, 0, 0.1215686275);
  padding: 20px;
  border-radius: 10px;
  p {
    margin: 10px 0;
  }
  &-info {
    color: $footer-border-color;
  }
}

.col-info {
  gap: 25px;
  &-block {
    max-width: 350px;
    width: 350px;
  }
}

.show-info-btn {
  background: $main-blue;
  padding: 10px;
  color: white;
  border: none;
  outline: none;
  border-radius: 8px;
  transition: 0.4s ease;
  font-size: 14px;
  &:hover {
    opacity: 0.8;
    transition: 0.4s ease;
  }
}

</style>
