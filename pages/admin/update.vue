<template>
    <section>
        <button class="btn-white-bg mt-0 mb-4 " @click="navigateTo('/admin')">
          Назад
        </button>

        <div class="admin-delete">
          <button class="pink-button" @click="brandOpen=true">
            Обновить бренд
          </button>
          <button class="pink-button" @click="categoryOpen=true">
            Обновить категорию
          </button>
          <button class="pink-button" @click="newsOpen=true">
            Обновить новость
          </button>
        </div>

        <AdminUpdateBrand :isOpen="brandOpen" @close-modal="brandOpen=false"/>
        <AdminUpdateNews :isOpen="newsOpen" @close-modal="newsOpen=false"/>
        <AdminUpdateCategory :isOpen="categoryOpen" @close-modal="categoryOpen=false"/>
    </section>
</template>

<script setup lang="ts">
const categoryOpen=ref(false)
const brandOpen=ref(false)
const newsOpen=ref(false)
</script>

<style scoped lang="scss">
.admin-delete{
  @include flex(row,start,center)
}
</style>