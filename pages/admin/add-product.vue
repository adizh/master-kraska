<template>
    <div>
<h1>Добавить продукт</h1>
<form class="grid" @submit.prevent="formAdd">
<div v-for="item in Object.values(inputs)" :key="item?.field"  class="flex flex-column gap-2 lg:col-4 md:col-6 col-12">
<template v-if="item?.key==='descriptionRu' || item?.key==='descriptionKg'">
  <label  :for="item?.field">{{ item?.field }}</label>
  <textarea v-if="item?.key==='descriptionRu' || item?.key==='descriptionKg'" :name="item?.key" :id="item?.key" cols="30" rows="10" class="basic-input"  v-model="item.value"  @input="validate(item.key as string,item?.type as string)"></textarea>
</template>


<template v-else>
  <label :for="item?.field">{{ item?.field }}</label>
  <input  v-model="item.value" :id="item?.field" class="basic-input" :type="item?.type==='string' ? 'text':'number'"
  @input="validate(item.key as string,item?.type as string)"
  >
</template>


  <span v-if="item?.error" class="err-input-msg">{{
  item?.error
  }}</span>
</div>

<div class="lg:col-4 md:col-6 col-12" v-if="categoryCount?.length">
<label for="category">Категория</label>

<div class="ui-dropdown col-6" v-for="(item,index) in categoryCount" :key="item">
  <div class="selected-option basic-input" @click="toggleDropdown(index)">
    <span>
     {{ selectedCategories[index]?.nameRu || 'Выберите категорию'}}
    </span>
    <img
      class="arrow"
      :class="{ rotated: isCategoryOpen ===index}"
      src="../../assets/icons/icon=components-closed-arrow.svg"
      alt="open-arrow"
    />
  </div>
  <Transition name="slide-fade">
   <div>
    <ul class="ui-options" v-if="index===isCategoryOpen">
      <li
        v-for="item in catalogStore?.getLinkedCategories"
        :key="item?.id"
         @click="selectCategory(item,index)"
      >
        {{ item?.nameRu }}
      </li>
    </ul>
   </div>
  </Transition>
</div>

</div>

<div class="lg:col-4 md:col-6 col-12">
  <label for="category">Бренд</label>
  
  <div class="ui-dropdown col-6">
    <div class="selected-option basic-input" @click="isBrandOpen=!isBrandOpen">
      <span>
       {{ selectedBrand?.name || 'Выберите бренд'}}
      </span>
      <img
        class="arrow"
        :class="{ rotated: isBrandOpen}"
        src="../../assets/icons/icon=components-closed-arrow.svg"
        alt="open-arrow"
      />
    </div>
    <Transition name="slide-fade">
     <div>
      <ul class="ui-options" v-if="isBrandOpen">
        <li
          v-for="item in brandsStore?.getAllBrands"
          :key="item?.id"
           @click="selectBrand(item)"
        >
          {{ item?.name }}
        </li>
      </ul>
     </div>
    </Transition>
  </div>
  </div>


  <div class="lg:col-4 md:col-6 col-12" v-if="allVariants?.length">
    <label for="category">Объемы</label>
    
    <div class="flex flex-row gap-3 flex-wrap col-12">
      <div v-for="(variant, index) in variantCount" :key="index" class="flex flex-column each-variant">
        <label :for="'size-' + index">Размер</label>
        <input type="text" :id="'size-' + index" v-model="allVariants[index].size" class="basic-input">

        <label :for="'price-' + index">Цена</label>
        <input type="text" :id="'price-' + index" v-model="allVariants[index].price" class="basic-input">

        <label :for="'code-' + index">Код</label>
        <input type="text" :id="'code-' + index" v-model="allVariants[index].code" class="basic-input">

        <label :for="'base-' + index">База</label>
        <input type="text" :id="'base-' + index" v-model="allVariants[index].base" class="basic-input">
        <label :for="'file-' + index">Картинка</label>
        <input type="file" :id="'file-' + index" class="basic-input" @change="handleImage($event,index)">
      </div>
    </div>
    
    </div>
<div class="lg:col-4 md:col-6 col-12">
  <button type="button" class="pink-button" @click.capture="addCategoryCount">+Добавить категорию</button>
  <button type="button" class="pink-button" @click.capture="addVariantCount">+Добавить объем</button>
  <button type="submit" class="btn-white-bg">Создать</button>
</div>
</form>
    </div>
</template>

<script setup lang="ts">
import { Brands } from '~/types/Brands';
import { CategorySys } from '~/types/Category';
import { Variant } from '~/types/Variant';
const isCategoryOpen=ref()
type Input={
  value:string,
  error?:string,
  type?:string, 
  field?:string,
  key?:string
}
type Fields = {
  [key: string]: Input | boolean | string[]  |string| { id: string; size: string; price: number; code: number; image: string; base: string }[];
};
const catalogStore=useCatalogStore();
const categoryCount=ref([] as number[]);

const selectedCategories=ref([] as any[]);
const selectedBrand=ref({} as Brands)
const isBrandOpen=ref(false)
const brandsStore=useBrandsStore()
const selectedCategory=ref({} as CategorySys)
const selectCategory = (category: any,index:number) => {
  selectedCategory.value=category;
  selectedCategories.value[index] = category;
  isCategoryOpen.value=''
};


const variantCount = ref<number[]>([]);

// Initialize an array to store the variant details
const allVariants = ref<Variant[]>([]);
const addCategoryCount =()=>{
  let value=0;
  value++;
  selectedCategories.value.push(null); 
  for(let i =0;i<value;i++){
    categoryCount.value.push(i)
  }

}


const handleImage=async(event:any,index:number)=>{
  let value = event.target.files[0];
  const base64StringNewImage = await useConvertToBase64(value);
  value = base64StringNewImage as unknown as string;
  allVariants.value[index].image = base64StringNewImage as unknown as string;


}
const addVariantCount =()=>{
  const newIndex = variantCount.value.length;
  variantCount.value.push(newIndex);
  allVariants.value.push({ size: '',price:0,code:0,base:'',image:'' });
  console.log('allVariants:', allVariants.value);
//   let value=0;

//   value++;
//   for(let i =0;i<value;i++){
//     variantCount.value.push(i);
//     allVariants.value[i]={size:''};
//   }
// console.log(allVariants)

}


const toggleDropdown =(item:number)=>{
  if(isCategoryOpen.value===item){
    isCategoryOpen.value=''
  }else{
    isCategoryOpen.value=item;
  }
}

const selectBrand =(item:Brands)=>{
  selectedBrand.value=item;
  isBrandOpen.value=false
}
const { handleValues } = useInputValidation();
const fields=ref<Fields>({
    "nameKg": {value:'',error:'',type:'string',field:'Название (кырг)'},
  "nameRu": {value:'',error:'',type:'string',field:'Название'},
  "shortDescriptionRu":  {value:'',field:'Короткое описание'},
  "shortDescriptionKg":  {value:'',field:'Короткое описание (кырг)'},
  "price":{value:'',error:'',type:'number',field:'Цена'} ,
  "size":  {value:'',error:'',type:'string',field:'Размер'},
  "consumption":  {value:'',field:'Расход'},
  "dryingTime":  {value:'',field:'Высыхание'},

  "colorType": {value:'',error:'',type:'number',field:'Цвет'} ,
  "descriptionRu":  {value:'',error:'',type:'string',field:'Описание'},
  "descriptionKg":  {value:'',error:'',type:'string',field:'Описание (кырг)'},
  "code": {value:'',error:'',type:'number',field:'Код'} ,
  "isPopular": false,
  "isFeatured": false,
  "isBeneficial": false,
  "subdirectoryId": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "brandId":  '',
  "images": [
    "string"
  ],
  "categoryIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "variants": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "size": "string",
      "price": 0,
      "code": 0,
      "image": "string",
      "base": "string"
    }
  ]
})


const addProduct=async()=>{

}

const formAdd = () => {
 console.log('variants',allVariants)
  for (const fieldName in inputs.value) {
    if (Object.prototype.hasOwnProperty.call(inputs.value, fieldName)) {
      const fieldType = inputs.value[fieldName].type;
      handleValues(inputs.value, fieldName, fieldType);
    }
  }
  const hasError = Object.values(inputs.value).some(
    (input) => input.error !== ""
  );
  if (!hasError) {
alert('Add profuct')
    
    // submitUpdate();
    // router.push('/admin')
  }
};



const fieldsObj = fields.value as any
const inputs = ref<{ [key: string]: Input }>({});

for (const key in fields.value) {
  const field = fields.value[key];
  if (typeof field === 'object' && 'value' in field) {
    inputs.value[key] = { ...field, key };
  }
}
 
  const validate = (field: string, type: string) => {
  handleValues(inputs.value, field, type);
};

onMounted(()=>{
catalogStore.fetchAllCategoriesLinked();
brandsStore.fetchAllBrands()
})

</script>

<style scoped lang="scss">
.admin-form{
  @include flex(row,start,center,20px);
  flex-wrap: wrap;
}
.selected-option {
  @include flex(row, space-between, center);

  &:hover {
    cursor: pointer;
  }
}

.each-variant{
  border:1px solid #ddd
}
.ui-options {
  border: 1px solid $slider-border-color;
  border-radius: 8px;
  padding: 6px;
  max-height:200px;
  overflow-y: auto;
  @include textFormat(16px, 20px, 400, #000);

  li {
    padding: 16px;
    border-radius: 10px;
    transition: 0.3s ease all;

    &:hover {
      background: $main-white;
      cursor: pointer;
      transition: 0.3s ease all;
    }
  }
}

.open-options {
  visibility: visible;
  opacity: 1;
  animation: slideFromTop 0.5s forwards;
}

.ui-dropdown {
  width: 100%;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-5%);
  opacity: 0;
}

@keyframes slideFromTop {
  from {
    transform: translateY(-5%);
    opacity: 0;
  }

  to {
    transform: translateY(1%);
    opacity: 1;
  }
}

@keyframes slideFromBottomToTop {
  from {
    transform: translateY(5%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>