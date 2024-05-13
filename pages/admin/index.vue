<template>
  <section>
    <AdminProducts />
  </section>
</template>

<script setup lang="ts">
const authStore=useAuthStore()

const router=useRouter()
onMounted(()=>{
// if(authStore?.getRole!=='Admin'){
//     router.push('/')
// }
})




</script>

<style scoped></style>
