<template>
  <div class="layout-container">
    <div class="admin-links">
      <a href="/admin" target="_blank" @click="selectRoute('/admin')" :class="{'active-route':currentRoute==='/admin'}">Главная</a>
      <a href="/admin/add-product" target="_blank">Добавить продукт</a>
      <a href="/admin/orders" target="_blank">Заказы</a>
      <a href="/admin/sellers" target="_blank">Продавцы</a>
      <a href="/admin/banners" target="_blank">Баннеры</a>
      <a href="/admin/category" target="_blank">Категории</a>
      <a href="/admin/news" target="_blank">Новости</a>
      <a href="/admin/brands" target="_blank">Бренды</a>
    </div>
    <div class="slot-sidebar">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

const currentRoute= ref('/admin')


const selectRoute=(route:string)=>{
  currentRoute.value=route
}

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
  top:0;


  background: white;
  border-right: 1px solid #ddd;
  height:100%;

  @include flex(column, start, start,0);
  a {
    border-top: 1px solid #ddd;
    
    padding: 20px;
    display: block;
    width: 190px;
    color:#222;
    font-weight: 500;
    &:last-child{
      border-bottom: 1px solid #ddd;
    }
    &:hover{
      background: #dddddd;
    }
  }
}
.active-route{
  background: #dddddd;
}
.slot-sidebar {
  padding: 20px;
  flex: 1;
}
</style>
