<template>
    <UIModal
    :show-modal="isOpen"
    title="Добавить бренд"
    @close-modal="$emit('closeModal')"
  >
 
<form class="mt-4 flex flex-column align-items-center" @submit.prevent="createNews">
<div class="form-block">
    <label for="category">Название</label>
    <input type="text" v-model="newsForm.name" class="basic-input" required id="category">
</div>


<div class="form-block">
    <label for="category">Колеровка</label>
    <input type="checkbox" v-model="newsForm.tinting" class="basic-input"  id="category">
</div>



   <div class="form-block flex flex-column align-items-start">
    <label for="categoryKg">Картинка</label>
    <img
    :src="newsForm.image.value"
    alt="добавить картинку"
    style="cursor: pointer"
    class="upload-image"
    @click="openFileInput"
  >
  <span class="err-input-msg" v-if="newsForm.image.error">{{ newsForm.image.error }}</span>
  <span class="err-input-msg" v-else-if="newsForm.image.loading">Загрузка...</span>
  <input
    id="fileInput"
    ref="fileInput"
    type="file"
    style="display: none"
    @change="(event) => handleNewsImage(event)"
  >
   </div>


      <button type="submit" class="pink-button">
        Добавить
      </button>
</form>
  
  </UIModal>
</template>

<script setup lang="ts">
const emit=defineEmits(['closeModal']);
const targetSizeBytes = 150 * 1024;
const props=defineProps({
    isOpen:{
        type:Boolean
    }
})
const newsForm=ref({
    name:"",
  tinting:false,
    image:{
        value:'',error:"",loading:false
    }
})
const openFileInput = () => {
  const fileInput = document.getElementById("fileInput") as HTMLElement;
  fileInput.click();
};

const handleNewsImage=async(event:any)=>{
    newsForm.value.image.loading=true;
    newsForm.value.image.error=''
    newsForm.value.image.value=''
  const result =await useCompressImage(event);
if(result?.size>targetSizeBytes){
  newsForm.value.image.error='Размер файла слишком большой';
  newsForm.value.image.loading=false;
  const base64StringNewImage = await useConvertToBase64( event.target.files[0]) as unknown as string;
 newsForm.value.image.value=base64StringNewImage

}
else if(result.size<targetSizeBytes && result && result!==undefined){
newsForm.value.image.error=''
newsForm.value.image.loading=false
   const base64StringNewImage = await useConvertToBase64(result) as unknown as string;
   newsForm.value.image.value=''
newsForm.value.image.value=base64StringNewImage
}



}

const createNews=async()=>{
  if(newsForm.value.image.value?.length>0 && !newsForm.value.image.error){


const body={
    "name": newsForm.value.name,
  "logo": newsForm.value.image.value,
  "tinting": newsForm.value.tinting
}
try{
    const response = await http.post('/api/v1/Brand/create-brand',body)

    console.log('response',response)
    if(response.status==200){
        useNotif('success','Бренд создан!','Успешно');
setTimeout(()=>{
    emit('closeModal');

},600)

setTimeout(()=>{
    newsForm.value.image.value=''
    newsForm.value.image.error=''
    newsForm.value.name=''
    newsForm.value.tinting=false

},2000)
    }

}catch(err){
    console.log(err)
}
  }
}


</script>

<style scoped lang="scss">
@import "../../assets/dropdown.scss";


form{
    input,textarea{width: 100%;
    margin-top: 7px;
    }

 
}

.form-block{
    width: 100%;
    margin:10px 0;
}

.upload-image{
width:60%
}
</style>