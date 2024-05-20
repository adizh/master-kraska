<template>
  <section>

    <Sidebar v-model:visible="visible" :style="{paddingTop:'20px'}">
      <div class="mt-5">

        <div class="admin-links">
          <a href="/admin/add-product" target="_blank">Добавить продукт</a>
          <a href="#" @click.prevent="openModal" target="_blank">Создать категорию</a>
        </div>

      </div>
  </Sidebar>
    <Button icon="pi pi-trash" @click="visible = true" label="Ссылки" class="mb-4 p-2 flex flex-row justify-content-end"/>
    <AdminProducts />


  <AdminCreateCategory :openCreateCategoryModal="openCreateCategoryModal" @closeModal="openCreateCategoryModal=false"/>

    <!-- <Dialog   v-model:visible="openCreateCategoryModal"
    modal
    :style="{padding: '20px 40px 50px 20px'}"
    header="Создать категорию">
<AdminCreateCategory/>
    </Dialog> -->
  </section>
</template>

<script setup lang="ts">
const authStore=useAuthStore()
const visible=ref(false)
const router=useRouter();
const openCreateCategoryModal =ref(false)
const openModal =()=>{
  openCreateCategoryModal.value=true;
  visible.value=false
}

onMounted(()=>{
// if(authStore?.getRole!=='Admin'){
//     router.push('/')
// }
})




</script>

<style scoped lang="scss">
.admin-links{
  @include flex(column,start,start);
  a{
    border:1px solid #ddd;
    padding:20px;
    display: block;
    width: 100%;
  }
}

</style>
