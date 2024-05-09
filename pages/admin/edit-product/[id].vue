<template>
    <section>
    <form class="grid" @submit.prevent="editProduct">
        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="name">Имя</label>
            <input class='form-input col-12' type="text" id="name" v-model="inputs.nameRu.value"
                @input="validate('nameRu', 'string')">
            <span v-if="inputs.nameRu.error" class="err-input-msg">{{ inputs.nameRu.error }}</span>
        </div>

        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="name">Имя (кырг)</label>
            <input class='form-input col-12' type="text" id="name" v-model="inputs.nameKg.value"
                @input="validate('nameKg', 'string')">
            <span v-if="inputs.nameKg.error" class="err-input-msg">{{ inputs.nameKg.error }}</span>
        </div>

        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="description">Описание</label>
            <input class='form-input col-12' type="text" id="description" v-model="inputs.descriptionRu.value"
                @input="validate('descriptionRu', 'string')">
            <span v-if="inputs.descriptionRu.error" class="err-input-msg">{{ inputs.descriptionRu.error }}</span>
        </div>
        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="description">Описание (кырг)</label>
            <input class='form-input col-12' type="text" id="descriptionKg" v-model="inputs.descriptionKg.value"
                @input="validate('descriptionKg', 'string')">
            <span v-if="inputs.descriptionKg.error" class="err-input-msg">{{ inputs.descriptionKg.error }}</span>
        </div>
        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="description">Короткое описание</label>
            <input class='form-input col-12' type="text" id="shortDescriptionRu" v-model="inputs.shortDescriptionRu.value"
                @input="validate('shortDescriptionRu', 'string')">
            <span v-if="inputs.shortDescriptionRu.error" class="err-input-msg">{{ inputs.shortDescriptionRu.error }}</span>
        </div>
        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="description">Короткое описание (кырг)</label>
            <input class='form-input col-12' type="text" id="shortDescriptionKg" v-model="inputs.shortDescriptionKg.value"
                @input="validate('shortDescriptionRu', 'string')">
            <span v-if="inputs.shortDescriptionKg.error" class="err-input-msg">{{ inputs.shortDescriptionKg.error }}</span>
        </div>

        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="price">Цена</label>
            <input class='form-input col-12' type="number" id="price" v-model="inputs.price.value"
                @input="validate('price', 'number')"
                >
            <span v-if="inputs.price.error" class="err-input-msg">{{ inputs.price.error }}</span>
        </div>

        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="categoryId">Категории</label>
            <div v-for="(categoryId,index) in categories" :key="categoryId?.id">
                <label :for="categoryId?.name">{{categoryId?.nameRu}}</label>
                <input class='form-input col-12' type="text"  :id="categoryId?.name"  v-model="categoryValues[categoryId?.id]">
            </div>
            <!-- <span v-if="inputs.categoryId.error" class="err-input-msg">{{ inputs.categoryId.error }}</span> -->
        </div>

        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="subcategoryId">Подкатегории</label>
            <input class='form-input col-12' type="text" id="subcategoryId" v-model="inputs.subcategoryId.value">
            <span v-if="inputs.subcategoryId.error" class="err-input-msg">{{ inputs.subcategoryId.error }}</span>
        </div>

        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="brandId">Бренд</label>
            <input class='form-input col-12' type="text" id="brandId" v-model="inputs.brandId.value">
            <span v-if="inputs.brandId.error" class="err-input-msg">{{ inputs.brandId.error }}</span>
        </div>


        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="size">Размер</label>
            <input class='form-input col-12' type="text" id="size" v-model="inputs.size.value"
                @input="validate('size', 'string')">
            <span v-if="inputs.size.error" class="err-input-msg">{{ inputs.size.error }}</span>
        </div>

        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="size">Цвет</label>
            <input class='form-input col-12' type="text" id="color" v-model="inputs.color.value"
                @input="validate('color', 'string')">
            <span v-if="inputs.color.error" class="err-input-msg">{{ inputs.color.error }}</span>
        </div>

        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="size">Высыхание</label>
            <input class='form-input col-12' type="text" id="color" v-model="inputs.dryingTime.value"
                @input="validate('dryingTime', 'string')">
            <span v-if="inputs.dryingTime.error" class="err-input-msg">{{ inputs?.dryingTime?.error }}</span>
        </div>
        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="size">Расход</label>
            <input class='form-input col-12' type="text" id="color" v-model="inputs.consumption.value"
                @input="validate('consumption', 'string')">
            <span v-if="inputs.consumption.error" class="err-input-msg">{{ inputs.consumption.error }}</span>
        </div>

        <div class="col-12 each-field">
            <label for="size">Объемы</label>
         <div class="all-variant">
            <div v-for="variant in variants" class="variant" :key="variant?.id">
                <img :src="varSizes[variant?.size]?.image" alt="variant" @click="openFileInput(variant?.size)" style="cursor: pointer;" />
                <input ref="fileInput" type="file" id="fileInput" style="display: none;" @change="(event)=>handleNewVarImage(event) "/>
 
              
                <label :for="variant?.size">Размер</label>
                <input class='form-input col-12' type="text" :id="variant?.size"  v-model="varSizes[variant?.size].size"
               >
                <label :for="variant?.size">Код</label>
                <input class='form-input col-12' type="number" :id="variant?.size" v-model="varSizes[variant?.size].code"
                >
    
                <label :for="variant?.size">Цена</label>
                <input class='form-input col-12' type="number" :id="variant?.size"  v-model="varSizes[variant?.size].price"
               >
              </div>
         </div>
            <span v-if="inputs.color.error" class="err-input-msg">{{ inputs.color.error }}</span>
        </div>

        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="size">Популярный</label>
            <input class='form-input col-12' type="checkbox" id="color" v-model="inputs.isPopular.value">
            <!-- <span v-if="inputs.color.error" class="err-input-msg">{{ inputs.isPopular.error }}</span> -->
        </div>

        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="isFeatured">Рекомендуемый</label>
            <input class='form-input col-12' type="checkbox" id="isFeatured" v-model="inputs.isFeatured.value">
            <!-- <span v-if="inputs.color.error" class="err-input-msg">{{ inputs.isPopular.error }}</span> -->
        </div>

        <div class="lg:col-4 md:col-6 col-12 each-field">
            <label for="isBeneficial">Выгодный</label>
            <input class='form-input col-12' type="checkbox" id="isBeneficial" v-model="inputs.isBeneficial.value">
            <!-- <span v-if="inputs.color.error" class="err-input-msg">{{ inputs.isPopular.error }}</span> -->
        </div>

        <button type="submit">Сохранить изменения</button>
    </form>

    <button type="button" class='pink-button'  @click="isVariantOpen=true">+Добавить объемы</button>

    <UIModal :showModal="isVariantOpen" @closeModal="isVariantOpen=false" title="Добавить объем">
 <form @submit.prevent="addVariant" class="flex flex-column align-items-start mt-3 gap-2"> 
    <input type="text" placeholder="Размер"  required v-model="newVariants.size" class="basic-input"/> 
    <input type="number" placeholder="Цена"   required v-model="newVariants.price" class="basic-input"/>
    <input type="number" placeholder="Код"   required v-model="newVariants.code" class="basic-input"/>
    <input type="file" @change="handleFileChange" />
    <button type="submit">Добавить</button>
 </form>
    </UIModal>
</section>
</template>

<script setup lang="ts">

import { Category,CategorySys } from '~/types/Category';
import { Product } from '~/types/Product';
import { Variant } from '~/types/Variant';
const { t } = useI18n();
const route = useRoute();
const id = route.params.id;
//const { data: product } = await useApi(`/api/v1/Product/get-product-by-id/${id}`) as any;
const isVariantOpen=ref(false)
const item = ref({} as Product)

const productsStore=useProductsSstore()
const newVariants=ref({
    size:"",
    price:'',
    code:'',
    image:''
})



const handleFileChange = (event:any) => {
    newVariants.value.image = event.target.files[0];
    };


    const varImage=(image:string)=>{
        return image
    }
  
const variants =ref([] as Variant[])

interface InputField {
    value: string | number | undefined | string[] | boolean | CategorySys[] | any[]
    error: string;
    type?: string | any;
}

interface Inputs {
    [key: string]: InputField;
}

const convertToBase64 = (file:any) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };


const newVarImage=ref(null)
const variantImage=ref('')
const handleNewVarImage = async(event:any )=> {
    newVarImage.value = event.target.files[0];
    const base64StringNewImage = await convertToBase64(newVarImage.value);
    variantImage.value=base64StringNewImage as unknown as string;
    varSizes[currVarSize.value].image = base64StringNewImage  as unknown as string;
    console.log('variants',variants)
    console.log('varSizes',varSizes)

    };
const currVarSize=ref('')
    const openFileInput = (varSize:string) => {
      const fileInput = document.getElementById('fileInput') as HTMLElement;
      fileInput.click();
      currVarSize.value=varSize
    };

    
const addVariant =async()=>{
        if (!newVariants.value.image) {
        alert('Please select a file');
        return;
      }

      try{
        const base64String = await convertToBase64(newVariants.value.image);
        // Now you can send the base64String to your API
        console.log('Base64 string:', base64String);
        const body=[
            {
                price:newVariants.value.price,
                code:newVariants.value.code,
                size:newVariants.value.size,
                image:base64String
            }
        ]
        const response = await http.put(`/api/v1/Product/add-variants/${id}`,body);
        console.log('response add variant',response)

    }catch(err){
        console.log(err)
    }finally{
        isVariantOpen.value=false
    }
}

const categories=ref([] as any[])
const categoryValues = reactive({} as any);
const varSizes = reactive({} as any);

const inputs = ref<Inputs>({
    nameRu: { value: item.value?.nameRu, error: '', type: 'string' },
    nameKg: { value: item.value?.nameKg, error: '', type: 'string' },
    descriptionRu: { value: item.value?.descriptionRu, error: '', type: 'string' },
    descriptionKg: { value: item.value?.descriptionKg, error: '', type: 'string' },
    shortDescriptionRu: { value: item.value?.shortDescriptionRu, error: '', type: 'string' },
    shortDescriptionKg: { value: item.value?.shortDescriptionKg, error: '', type: 'string' },
    price: { value: item?.value?.price, error: '', type: 'number' },
    subcategoryId: { value: item?.value?.subcategoryId, error: '' },
    brandId: { value: item?.value?.brandId, error: '' },
    size: { value: item?.value?.size, error: '', type: 'string' },
    color: { value: item?.value?.colorType, error: '', type: 'number' },
    consumption: { value: item?.value?.consumption, error: '', type: 'string' },
    dryingTime: { value: item?.value?.dryingTime, error: '', type: 'string' },
    isPopular: { value: item?.value?.isPopular, error: '' },
    isFeatured: { value: item?.value?.isFeatured, error: '' },
    isBeneficial: { value: item?.value?.isBeneficial, error: '' },
    images: {
        value: item?.value?.images, error: '',
    },
});

const { handleValues } = useInputValidation()

const validate = (field: string, type: string) => {
    handleValues(inputs.value, field, type);
}


const submitUpdate = async () => {
    console.log('varSizes',varSizes)
    const prodCategories=Object.values(categoryValues)
const prodVariantes=Object.values(varSizes).map((item:any)=>{
if(item?.image && item?.image?.startsWith('http')){
    return {...item,image:null}
}else{
    return item
}
})

console.log('prodVariantes',prodVariantes)
    try {
        const body = {
            "nameKg": inputs.value.nameKg.value,
            "nameRu": inputs.value.nameRu.value,
            "descriptionRu": inputs.value.descriptionRu.value,
            "descriptionKg": inputs.value.descriptionKg.value,
            "shortDescriptionRu": inputs.value.shortDescriptionRu.value,
            "shortDescriptionKg": inputs.value.shortDescriptionKg.value,
            "price": inputs.value.price.value,
            "categoryIds":prodCategories|| null,
            "subcategoryId": inputs.value.subcategoryId.value || null,
            "brandId": inputs.value.brandId.value || null,
                     "size": inputs.value.size.value,
            "colorType": inputs.value.color.value,
            "isPopular": inputs.value.isPopular.value,
            "isFeatured": inputs.value.isFeatured.value,
            "isBeneficial": inputs.value.isBeneficial.value,
            "consumption": inputs.value.consumption.value,
            "dryingTime": inputs?.value?.dryingTime?.value,
            "images": null,
            variants:prodVariantes || null
        }

        const response = await http.put(`/api/v1/Product/update-product/${id}`, body);
        console.log('response', response);
        if (response.status === 200) {


            useNotif('success', t('updated'), t('success'))
        }
    } catch (err) {
        console.log(err)
    }
}

const editProduct = () => {
    for (const fieldName in inputs.value) {
        if (Object.prototype.hasOwnProperty.call(inputs.value, fieldName)) {
            const fieldType = inputs.value[fieldName].type;
            handleValues(inputs.value, fieldName, fieldType);
        }
    }
    const hasError = Object.values(inputs.value).some(input => input.error !== '');
    if (!hasError) {
        submitUpdate()
    }

}

onMounted(async () => {
   await productsStore.fetchProductById(id as string)
    item.value = productsStore?.getProduct?.product
    if(item?.value?.variants){
        variants.value=item.value.variants
    }


    console.log(item,'item')
    console.log('productsStore get Prouct',productsStore.getProduct)
    categories.value=item?.value?.categories
    
    item?.value?.categories.map((category:any) => {
        categoryValues[category.id] = category.id;
      });

      item?.value?.variants?.map((variant:Variant)=>{
        varSizes[variant?.size]={...variant};
      })
      console.log('varSizes on mounted',varSizes)
    inputs.value = {
        nameRu: { value: item.value?.nameRu, error: '', type: 'string' },
        nameKg: { value: item.value?.nameKg, error: '', type: 'string' },
        descriptionRu: { value: item.value?.descriptionRu, error: '', type: 'string' },
        descriptionKg: { value: item.value?.descriptionKg, error: '', type: 'string' },
        shortDescriptionRu: { value: item.value?.shortDescriptionRu, error: '', type: 'string' },
        shortDescriptionKg: { value: item.value?.shortDescriptionKg, error: '', type: 'string' },
        price: { value: item?.value?.price, error: '', type: 'number' },
     //   categories: { value: item?.value?.categories, error: '' },
        subcategoryId: { value: item?.value?.subcategoryId, error: '' },
        brandId: { value: item?.value?.brandId, error: '' },
        size: { value: item?.value?.size, error: '', type: 'string' },
       color: { value: item?.value?.colorType, error: '', type: 'string' },
       dryingTime: { value: item?.value?.dryingTime, error: '', type: 'string' },
       consumption: { value: item?.value?.consumption, error: '', type: 'string' },
        isPopular: { value: item?.value?.isPopular, error: '' },
        isFeatured: { value: item?.value?.isFeatured, error: '' },
        isBeneficial: { value: item?.value?.isBeneficial, error: '' },
        images: {
            value: item?.value?.images, error: '',

        }
    }
    console.log('inputs',inputs)
})

</script>

<style scoped lang='scss'>
button {
    margin-top: 20px;
    @extend %button-shared;
}

.variant{
    border:1px solid $main-pink;
    img{
        width: 100%;
    }
}
.all-variant{
    @include flex(row,start,start);
    flex-wrap: wrap;
    div{
        width: 20%;
    }
}

@media (max-width:768px){
    .all-variant{
        div{
            width: 45%;
        }
    }
}
@media (max-width:576px){
    .all-variant{
        flex-direction: column;
        div{
            width: 100%;
        }
    }
}
</style>