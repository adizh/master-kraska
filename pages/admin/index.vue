<template>
  <section>

    <Sidebar v-model:visible="visible" :style="{paddingTop:'20px'}">
      <!-- <template #header>
          <div class="flex align-items-center gap-2">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
              <span class="font-bold">Amy Elsner</span>
          </div>
      </template> -->
      <div class="mt-5">

        <div class="admin-links">
          <a href="/admin/add-product" target="_blank">Добавить продукт</a>
        </div>

      </div>
  </Sidebar>
    <Button icon="pi pi-trash" @click="visible = true" label="Ссылки" class="mb-4 p-2 flex flex-row justify-content-end"/>
    <AdminProducts />

  </section>
</template>

<script setup lang="ts">
const authStore=useAuthStore()
const visible=ref(true)
const router=useRouter()
onMounted(()=>{
// if(authStore?.getRole!=='Admin'){
//     router.push('/')
// }
})




</script>

<style scoped lang="scss">
.admin-links{
  border:1px solid #ddd;
  padding:20px;
}

</style>
