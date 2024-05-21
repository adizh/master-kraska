<template>
<section>

<button @click="navigateTo('/admin')" class="btn-white-bg mt-0 mb-4 ">Назад</button>
    <div class="admin-delete">
        <button class="pink-button" @click="isBrandOpen=true">Удалить бренд</button>
        <button class="pink-button" @click="isCategoryOpen=true">Удалить категорию</button>
            </div>

<AdminDeleteBrand :isOpen="isBrandOpen" @closeModal="isBrandOpen=false"/>
      <AdminDeleteCategory :isOpen="isCategoryOpen" @closeModal="isCategoryOpen=false"/>
</section>

</template>

<script setup lang="ts">
const isBrandOpen=ref(false)
const isCategoryOpen=ref(false)



</script>

<style scoped lang="scss">
.admin-delete{
    @include flex(row,start,center)
}
</style>