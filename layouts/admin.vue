<template>
  <div class="layout-container">
    <div class="admin-links">
      <a
        v-for="link in routes"
        :key="link.value"
        :href="link.value"
        :class="{ 'active-route': route.path === link.value }"
      >
        {{ link?.name }}</a>
    </div>
    <div class="slot-sidebar">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const routes = [
  { name: "Главная", value: "/admin" },
  { name: "Добавить продукт", value: "/admin/add-product" },
  { name: "Заказы", value: "/admin/orders" },
  { name: "Продавцы", value: "/admin/sellers" },
  { name: "Баннеры", value: "/admin/banners" },
  { name: "Категории", value: "/admin/category" },
  { name: "Новости", value: "/admin/news" },
  { name: "Бренды", value: "/admin/brands" }
];

const route = useRoute();
</script>

<style scoped lang="scss">
.layout-container {
  display: flex;
  flex-direction: row;
}

.admin-links {
  width: 190px;
  position: relative;
  left: -1.69rem;
  top: 0;

  background: white;
  border-right: 1px solid #ddd;
  height: 100%;

  @include flex(column, start, start, 0);
  a {
    border-top: 1px solid #ddd;

    padding: 20px;
    display: block;
    width: 190px;
    color: #222;
    font-weight: 500;
    &:last-child {
      border-bottom: 1px solid #ddd;
    }
    &:hover {
      background: #dddddd90;
    }
  }
}
.active-route {
  background: #dddddd90;
}
.slot-sidebar {
  padding: 20px;
  flex: 1;
}
</style>
