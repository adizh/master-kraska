<template>

   <NoContent title="Вы не оставляли коментарии" v-if="!reviewsUser?.length">
      <template #icon>
         <img src="../../assets/icons/comments.svg" alt="comment">
      </template>
   </NoContent>

   <ul v-else>
      <ReviewsItem v-for="item in reviewsUser" :key="item.id" :item="item" type="profile" />
   </ul>
</template>

<script setup lang="ts">
import { Review } from '~/types/Review';


const authStore = useAuthStore();
const reviewsUser = ref<Review[]>([])

const fetchAllReviewsByUser = async () => {
   try {
      const response = await http.get(`/api/v1/ProductReview/get-review-by-userId/${authStore.getUserId}`);
      console.log('response fetchAllReviewsByUser', response);
      if (response.status === 200) {
         reviewsUser.value = response.data
      }
   } catch (err) {
      console.log(err)
   }
}
onMounted(() => {
   fetchAllReviewsByUser()
})
</script>

<style scoped></style>