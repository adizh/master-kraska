<template>
    <div class="actions-block-item" v-for="item in discounts" :key="item?.id" v-if="!isLoading && discounts?.length"
     :class="{'width-30':!isLoading && discounts?.length}">
     <img :src="item?.image" alt="discount">
        <div class="actions-block-item-header" > {{ item?.title }}</div>
        <p class="actions-block-item-info">
            {{ item?.description }}
        </p>
    </div>

    <!-- <div  v-else-if="isLoading && !discounts?.length"  class="text-center"> <ProgressSpinner/></div> -->
    <div v-else>{{ $t('noData') }} </div>
</template>

<script setup lang="ts">
import {Discount} from '@/types/Discout'
const discounts = ref([] as Discount[]);
const isLoading=ref(false)
const authStore=useAuthStore()
const getDiscounts=async()=>{
    isLoading.value=true
    try{
const response= await http('/api/v1/Banner/get-all-banners');
if(response.status===200){
    console.log('response data in discount',response)
    discounts.value=response.data.map((item:Discount)=>{
        if(authStore?.getSelectedLang==='kg'){
            return {...item, title:item?.titleKg,buttonText:item?.buttonTextKg,description:item?.descriptionKg}
        }else{
            return {...item, title:item?.titleRu,buttonText:item?.buttonTextRu,description:item?.descriptionRu}
        }
    })
}
    }catch(err){
        console.log(err)
    }finally{
        isLoading.value=false
    }
}
onMounted(()=>{
    getDiscounts()
})

</script>

<style scoped lang="scss">
.width-30{
    width: 30%  !important;
}
.actions-block {
    &-item {
        padding: 20px 10px 25px 10px;
        border-radius: 10px;
        text-align: center;
   width: 30%;
    img{
        width: 100%;
    }
        &-header {
            font-size: 20px;
            font-weight: 600;
        }

        &-info {
            font-size: 16px;
        }
    }
}

@media (max-width:768px){
    .actions-block-item{
        width:40%
    }
}
@media (max-width:576px){
    .actions-block-item{
        width:45%
    }
}
@media (max-width:510px){
    .actions-block-item{
        width:100%
    }
}
</style>