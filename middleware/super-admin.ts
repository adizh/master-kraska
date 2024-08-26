export default defineNuxtRouteMiddleware((to, from) => {
   const authStore=useAuthStore()
   if(authStore.getRole!=='SuperAdmin'){
    return navigateTo('/admin')
   }
  })