<template>
    <div class="news-list-block" v-for="item in news" :key="item?.id" v-if="!isLoading && news?.length">  
        <div class="image">
            <img :src="item?.image" :alt="item?.name">
        </div>
        <div class="info">
            <h2 class='each-section-header'>{{ item?.name }}</h2>
            <p>
              {{ item?.description }}
            </p>
            <br>
            <p>
                {{ item?.text }}
              </p>
        </div>
    </div>
<div  v-else-if="isLoading && !news?.length"  class="text-center">    <ProgressSpinner/></div>


    <div v-else>{{ $t('noData') }} </div>

</template>

<script setup lang="ts">
import {News} from '@/types/News'
const news=ref([] as News[])
const authStore=useAuthStore()
const isLoading=ref(false)
const getNews=async()=>{
    isLoading.value=true
    try{
const response = await http('/api/v1/News/get-all-news')
if(response.status===200){
    console.log('response get news',response);
news.value=response.data?.map((news:News)=>{
    if(authStore?.getSelectedLang==='kg'){
        return {...news,name:news?.nameKg,description:news?.descriptionKg,text:news?.textKg}
    }else{
        return {...news,name:news?.nameRu,description:news?.descriptionRu,text:news?.textRu}
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
    getNews()
})

</script>

<style scoped lang="scss">
.news-list-block {
    @include flex(row, start, start, 40px);
    margin-bottom: 40px;

    .image {
        width: 380px;
        border-radius: 10px;
        img{
            width: 100%;
            object-fit: contain;
        }
    }

    .info {
        width: 70%;

        h2 {
            margin: 0 0 40px 0 !important
        }

        p {
            @include footerSpan(24px, 16px);
            color: $main-black !important;
        }
    }
}

@media (max-width:768px) {
    .news-list-block {
        flex-direction: column;
        align-items: center;

        .image {
            width: 60%;
        }

        .info {
            width: 100%;
        }
        .news-list-block .info h2{
            font-size:24px  !important;
            line-height: 24px !important;
        }
    }

}

@media (max-width:480px) {
    .news-list-block .info h2 {
        font-size: 20px !important;
    }
   .image{
    width: 100% !important;
   }
}
</style>