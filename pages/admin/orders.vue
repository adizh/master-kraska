<template>
  <NuxtLayout name="admin">
    <div>
      <button class="btn-white-bg mb-4 mt-0" @click="navigateToAdmin">
        Назад
      </button>
      <div
        class="admin-order-heading grid flex flex-row justify-content-between align-items-center"
      >
        <h1 class="col-2">
          Заказы
        </h1>
        <div class="flex flex-row gap-3 align-items-center col-10">
          <p>Фильтровать по</p>
          <div class="lg:col-3">
            <UIDropdown
              :is-dropdown-open="isUIDropdownOpen"
              :selected-value="selectedStatus"
              :options="statusOptions"
              label="name"
              @toggle-dropdown-u-i="toggleDropdownUI"
              @select-value="selectState"
            />
          </div>

          <div>
            <input
              class="basic-input"
              placeholder="Поиск по номеру заказа"
              type="text"
              @input="filterOrdernumber"
            >
          </div>
        </div>
      </div>

      <div class="orders-section grid">
        <AdminOrdersItem
          v-for="item in orderStore.getAllOrders"
          :key="item?.id"
          :item="item"
        />
      </div>

      <UIPagination
        :total="orderStore.getAllOrdersPages?.totalPages"
        :current-active="orderStore.getAllOrdersPages.page"
        @change-page="orderStore.updatePage"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
const orderStore = useOrderStore();

const isUIDropdownOpen = ref(false);

const selectedStatus = ref({
  value: "",
  name: "Все"
});

const statusOptions = [
  { name: "Все", value: "" },
  { name: "Активные", value: "Active" },
  { name: "Отмененные", value: "Canceled" },
  { name: "Завершенные", value: "Completed" }
];

const toggleDropdownUI = () => {
  isUIDropdownOpen.value = !isUIDropdownOpen.value;
};

const selectState = (event: { name: string; value: string }) => {
  selectedStatus.value = event;
  isUIDropdownOpen.value = false;
  orderStore.updateStatus(event?.value);
};

const filterOrdernumber = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const currentValue = target.value;
  const char = (event as InputEvent).data ?? "";
  const isNumber = /^\d*$/.test(char);
  if (isNumber) {
    orderStore.updateOrderNumber(currentValue);
  } else {

  }
};

onMounted(() => {
  orderStore.fetchOrders();
});
</script>

<style scoped lang="scss">
.orders-section {
  margin-top: 20px;
  margin-bottom: 30px;
  @include flex(row, start, center);
  gap: 25px;
  flex-wrap: wrap;
}
</style>
