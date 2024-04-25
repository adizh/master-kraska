<template>
   <ul v-if="reviewsUser?.length > 0 && !loading">
      <ReviewsItem v-for="item in reviewsUser" :key="item.id" :item="item" type="profile" />
   </ul>


   <div v-else-if="loading">
      
      <ProgressSpinner />
   </div>
   <NoContent :title="$t('noCommentsLeft')" v-else>
      <template #icon>
         <img src="../../assets/icons/comments.svg" alt="comment">
      </template>
   </NoContent>


</template>

<script setup lang="ts">
import { Review } from '~/types/Review';
const loading = ref(false)

const authStore = useAuthStore();
const reviewsUser = ref<Review[]>([])

const fetchAllReviewsByUser = async () => {
   loading.value = true
   try {
      const response = await http.get(`/api/v1/ProductReview/get-review-by-userId/${authStore.getUserId}`);
      console.log('response fetchAllReviewsByUser', response);
      if (response.status === 200) {
         reviewsUser.value = response.data
      }
   } catch (err) {
      console.log(err)
   } finally {
      loading.value = false
   }
}
onMounted(() => {
   fetchAllReviewsByUser()
})
</script>

<style scoped></style>