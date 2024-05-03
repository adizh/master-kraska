<template>
    <div class="actions-block-item" v-for="item in discounts" :key="item?.id" v-if="!isLoading && discounts?.length">
        <div class="actions-block-item-header">{{ item?.title }}</div>
        <p class="actions-block-item-info">
            {{ item?.description }}
        </p>
    </div>

    <div  v-else-if="isLoading && !discounts?.length"  class="text-center"> <ProgressSpinner/></div>
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

.actions-block {
    &-item {
        background: $main-white;
        padding: 20px 10px 25px 10px;
        border-radius: 10px;
        text-align: center;
        width: 30%;
        height:178px;

        &-header {
            font-size: 20px;
            font-weight: 600;
        }

        &-info {
            color: $main-dark-grey;
            font-size: 16px;
        }
    }
}
</style>