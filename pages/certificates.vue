<template>
    <div class="info-certif-img">
        <img v-for="img in computedCertificates" :key="img?.id" :src="img?.image" :alt="img?.descriptionRu"
        :class="{'page-class':type==='page'}"
        >
    </div>
</template>

<script setup lang="ts">
import {Certificate} from '@/types/Brands'
const certificates=ref([] as Certificate[])
const props=defineProps({
    type:{
        type:String,
        default:''
    }
})

const computedCertificates=computed(()=>{
    return props.type==='page' ? certificates.value?.slice(0,3) : certificates.value
})
const getCertiticates=async()=>{
    try{
const response = await http('/api/v1/Banner/get-all-certificates');
if(response.status===200){
    certificates.value=response.data
}
    }catch(err){
        console.log(err)
    }
}


onMounted(()=>{
    getCertiticates()
})
</script>

<style scoped lang="scss">
.info-certif-img{
    @include flex(row,start,center,25px);
    flex-wrap: wrap;
    img{
        width: 18%;
    }
}

.page-class{
    width: 30% !important;
}
@media (max-width:576px){
   .info-certif-img img{
        width: 45%;
    }
}
</style>