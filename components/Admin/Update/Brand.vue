<template>
    <UIModal
      :show-modal="isOpen"
      title="Обновить бренд"
      @close-modal="$emit('closeModal')"
    >
      <div class="ui-dropdown col-6">
        <div class="selected-option basic-input" @click="toggleCreateCategory">
          <span>
            {{ brandsTitle }}
          </span>
  
          <img
            class="arrow"
            :class="{ rotated: openBrand }"
            src="../../../assets/icons/icon=components-closed-arrow.svg"
            alt="open-arrow"
          />
        </div>
  
        <Transition name="slide-fade">
          <div>
            <ul class="ui-options" v-if="openBrand">
              <input
                type="text"
                class="basic-input"
                @input="
                  (event: any) => brandsStore.searchBrands(event?.target?.value)
                "
              />
              <li
                v-for="(item, index) in brandsStore.getAllBrands"
                :key="item?.id"
                @click="selectBrand(item)"
              >
                {{ item?.name }}
              </li>
            </ul>
          </div>
        </Transition>
      </div>




<form v-if="isFormOpen" class="admin-edit-form" @submit.prevent="editBrand">
<div>
    <label for="name">Название</label>
    <input type="text" v-model="brandsInputs.name.value" class="basic-input" @input="validate('name','string')">
    <span class="err-input-msg" v-if="brandsInputs.name.error">{{ brandsInputs.name.error }}</span>
</div>
<div>
    <label for="name">Номер порядка</label>
    <input type="number" v-model="brandsInputs.order.value" class="basic-input" @input="validate('order','number')">
    <span class="err-input-msg" v-if="brandsInputs.order.error">{{ brandsInputs.order.error }}</span>
</div>
<div>
    <label for="name">Колеврока</label>
    <input type="checkbox" v-model="brandsInputs.tinting.value">

</div>

<div>
    <label for="name">Активный</label>
    <input type="checkbox" v-model="brandsInputs.isActive.value">
</div>

<div>
    <img
    :src="brandsInputs.logo.value"
    alt="variant"
    style="cursor: pointer"
    @click="openFileInput"
    class="admin-image"
  >
  <input
    id="fileInput"
    ref="fileInput"
    type="file"
    style="display: none"
    @change="(event) => handleNewVarImage(event)"
  >
  <span class="err-input-msg" v-if="!brandsInputs.logo.loading && brandsInputs.logo.error">{{ brandsInputs.logo.error }}</span>
  <span class="err-input-msg" v-else-if="brandsInputs.logo.loading">Загрузка</span>
</div>

<div>
    <button class="pink-button" type="submit">Обновить</button>
</div>
</form>


    </UIModal>
  </template>
  
  <script setup lang="ts">
  import Id from "~/pages/news/[id].vue";
  import { Brands } from "~/types/Brands";
  const { handleValues } = useInputValidation();
  const openBrand = ref(false);
  const isCategoryCreateOpen = ref(false);
  const brandsStore = useBrandsStore();
  const props = defineProps({
    isOpen: Boolean,
  });
  const isFormOpen=ref(false)
  const emit = defineEmits(["closeModal"]);
  const selectedBrands = ref({} as Brands);

  const brandsInputs=ref({
"name": {value:'',type:'string',error:''},
  "logo": {value:'',type:'string',error:'',loading:false} ,
  "isActive":  {value:false,type:'string',error:''},
  "tinting":  {value:false,type:'string',error:''},
  "order":  {value:0,type:'number',error:''}
  })
  const toggleCreateCategory = () => {
    openBrand.value = !openBrand.value;
  };


  const openFileInput = () => {
  const fileInput = document.getElementById("fileInput") as HTMLElement;
  fileInput.click();
};
const handleNewVarImage = async (event: any) => {
    const targetSizeBytes = 150 * 1024;
 brandsInputs.value.logo.loading=true;

 brandsInputs.value.logo.error=''
  const result = await useCompressImage(event);
  if (result?.size > targetSizeBytes) {
    brandsInputs.value.logo.error = "Размер файла слишком большой";
    brandsInputs.value.logo.loading= false;

  } else if (result.size < targetSizeBytes && result && result !== undefined) {
    brandsInputs.value.logo.loading = false;

    brandsInputs.value.logo.error= "";
    const base64StringNewImage = (await useConvertToBase64(
      result
    )) as unknown as string;
    brandsInputs.value.logo.value= base64StringNewImage as unknown as string;

  }
};



  const brandsTitle = computed(() => {
    if (selectedBrands?.value?.id) {
      return selectedBrands?.value?.name
    } else {
      return "Выбрать бренд";
    }
  });
  


  const selectBrand = (item: Brands) => {
    console.log(item);
selectedBrands.value=item
    for(const key in brandsInputs.value){
        brandsInputs.value[key as keyof typeof brandsInputs.value].value = item[key as keyof typeof item]
    }
    isFormOpen.value=true;
    openBrand.value=false
    console.log('brandsInputs',brandsInputs)
    // const index = selectedBrands.value.findIndex(
    //   (brand) => brand?.id === item?.id,
    // );
    // console.log("index", index);
    // if (index === -1) {
    //   selectedBrands.value.push(item);
    // }else{
    //   selectedBrands.value.splice(index,1)
    // }
    // console.log("selectedBrands", selectedBrands);
  };

  const validate = (field: string, type: string) => {
  handleValues(brandsInputs.value, field, type);
};


const submitEdit =async()=>{
 let body={} as any;
 for(const key in brandsInputs.value){
    body[key as keyof typeof body] = brandsInputs.value[key as keyof typeof brandsInputs.value]?.value
 }



 if(body.logo?.startsWith('http')){
    body={...body,logo:null}
 }else{
    body=body
 }
 console.log('body',body)
    try{
      const response = await http.put(`/api/v1/Brand/update-brand/${selectedBrands?.value?.id}`,body)
      console.log('response',response)
      if(response.status===200){
        useNotif('success','Бренд обновлен!','Успешно');

setTimeout(()=>{
    emit('closeModal');
    for(const key in brandsInputs.value){
        brandsInputs.value[key as keyof typeof brandsInputs.value].value = ''
        brandsInputs.value[key as keyof typeof brandsInputs.value].error = ''
        brandsInputs.value[key as keyof typeof brandsInputs.value].type =''
        selectedBrands.value={} as Brands
        brandsStore.fetchAllBrands();

        isFormOpen.value=false;


 }
},700)
      }  
    }catch(err){
        console.log(err)
    }
}
  const editBrand=()=>{

  for (const fieldName in brandsInputs.value) {
    if (
        fieldName==="name"  ||  fieldName === "order"  
    ) {
      const fieldType = brandsInputs.value[fieldName as keyof typeof brandsInputs.value]?.type;
      handleValues(brandsInputs.value, fieldName, fieldType);
    }
  }
  const hasError = Object.values(brandsInputs.value).some(
    (input) => input.error !== ""
  );

  if(!hasError){
  submitEdit()
  }else{
    console.log('there is some erro')
  }
  }
  
  onMounted(() => {
    brandsStore.fetchAllBrands();

    
  });
  </script>
  
  <style scoped lang="scss">
  @import '../../../assets/dropdown.scss';

  .admin-image{
    width: 50%;
  }

  .admin-edit-form{
    @include flex(column,start,start);
    padding-left: 0.5rem;
    padding-bottom: 30px;
    margin-top: 25px;
    div{

        @include flex(column,start,start,5px); 
    }
  }
  </style>
  