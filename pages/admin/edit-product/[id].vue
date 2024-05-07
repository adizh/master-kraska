<template>

    <section>


    <form class="grid" @submit.prevent="editProduct">

        <div class="col-4 each-field">
            <label for="name">Имя (на русском)</label>
            <input class='form-input col-12' type="text" id="name" v-model="inputs.nameRu.value"
                @input="validate('nameRu', 'string')">
            <span v-if="inputs.nameRu.error" class="err-input-msg">{{ inputs.nameRu.error }}</span>
        </div>

        <div class="col-4 each-field">
            <label for="name">Имя (на кыргызском)</label>
            <input class='form-input col-12' type="text" id="name" v-model="inputs.nameKg.value"
                @input="validate('nameKg', 'string')">
            <span v-if="inputs.nameKg.error" class="err-input-msg">{{ inputs.nameKg.error }}</span>
        </div>
        <div class="col-4 each-field">
            <label for="description">descriptionRu</label>
            <input class='form-input col-12' type="text" id="description" v-model="inputs.descriptionRu.value"
                @input="validate('descriptionRu', 'string')">
            <span v-if="inputs.descriptionRu.error" class="err-input-msg">{{ inputs.descriptionRu.error }}</span>
        </div>
        <div class="col-4 each-field">
            <label for="description">descriptionKg</label>
            <input class='form-input col-12' type="text" id="descriptionKg" v-model="inputs.descriptionKg.value"
                @input="validate('descriptionKg', 'string')">
            <span v-if="inputs.descriptionKg.error" class="err-input-msg">{{ inputs.descriptionKg.error }}</span>
        </div>
        <div class="col-4 each-field">
            <label for="description">short description ru</label>
            <input class='form-input col-12' type="text" id="shortDescriptionRu" v-model="inputs.shortDescriptionRu.value"
                @input="validate('shortDescriptionRu', 'string')">
            <span v-if="inputs.shortDescriptionRu.error" class="err-input-msg">{{ inputs.shortDescriptionRu.error }}</span>
        </div>
        <div class="col-4 each-field">
            <label for="description">short description kg</label>
            <input class='form-input col-12' type="text" id="shortDescriptionKg" v-model="inputs.shortDescriptionKg.value"
                @input="validate('shortDescriptionRu', 'string')">
            <span v-if="inputs.shortDescriptionKg.error" class="err-input-msg">{{ inputs.shortDescriptionKg.error }}</span>
        </div>

        <div class="col-4 each-field">
            <label for="price">price</label>
            <input class='form-input col-12' type="number" id="price" v-model="inputs.price.value"
                @input="validate('price', 'number')"
                >
            <span v-if="inputs.price.error" class="err-input-msg">{{ inputs.price.error }}</span>
        </div>

        <div class="col-4 each-field">
            <label for="categoryId">Категории</label>
            <input v-for="(categoryId,index) in inputs.categories" :key="index" class='form-input col-12' type="text"  id="categoryId" >
            <!-- <span v-if="inputs.categoryId.error" class="err-input-msg">{{ inputs.categoryId.error }}</span> -->
        </div>

        <div class="col-4 each-field">
            <label for="subcategoryId">subcategoryId</label>
            <input class='form-input col-12' type="text" id="subcategoryId" v-model="inputs.subcategoryId.value">
            <span v-if="inputs.subcategoryId.error" class="err-input-msg">{{ inputs.subcategoryId.error }}</span>
        </div>

        <div class="col-4 each-field">
            <label for="brandId">brandId</label>
            <input class='form-input col-12' type="text" id="brandId" v-model="inputs.brandId.value">
            <span v-if="inputs.brandId.error" class="err-input-msg">{{ inputs.brandId.error }}</span>
        </div>


        <div class="col-4 each-field">
            <label for="size">size</label>
            <input class='form-input col-12' type="text" id="size" v-model="inputs.size.value"
                @input="validate('size', 'string')">
            <span v-if="inputs.size.error" class="err-input-msg">{{ inputs.size.error }}</span>
        </div>

        <div class="col-4 each-field">
            <label for="size">color</label>
            <input class='form-input col-12' type="text" id="color" v-model="inputs.color.value"
                @input="validate('color', 'string')">
            <span v-if="inputs.color.error" class="err-input-msg">{{ inputs.color.error }}</span>
        </div>

        <div class="col-4 each-field">
            <label for="size">isPopular</label>
            <input class='form-input col-12' type="checkbox" id="color" v-model="inputs.isPopular.value">
            <!-- <span v-if="inputs.color.error" class="err-input-msg">{{ inputs.isPopular.error }}</span> -->
        </div>

        <div class="col-4 each-field">
            <label for="isFeatured">isFeatured</label>
            <input class='form-input col-12' type="checkbox" id="isFeatured" v-model="inputs.isFeatured.value">
            <!-- <span v-if="inputs.color.error" class="err-input-msg">{{ inputs.isPopular.error }}</span> -->
        </div>

        <div class="col-4 each-field">
            <label for="isBeneficial">isBeneficial</label>
            <input class='form-input col-12' type="checkbox" id="isBeneficial" v-model="inputs.isBeneficial.value">
            <!-- <span v-if="inputs.color.error" class="err-input-msg">{{ inputs.isPopular.error }}</span> -->
        </div>

        <button type="submit">Сохранить изменения</button>\
        
    </form>

    <button type="button" class='pink-button' >+Добавить картинку</button>
</section>
</template>

<script setup lang="ts">

import { Category,CategorySys } from '~/types/Category';
import { Product } from '~/types/Product';
const { t } = useI18n();
const route = useRoute();
const id = route.params.id;
//const { data: product } = await useApi(`/api/v1/Product/get-product-by-id/${id}`) as any;

const item = ref({} as Product)

const productsStore=useProductsSstore()

interface InputField {
    value: string | number | undefined | string[] | boolean | CategorySys[] | any[]
    error: string;
    type?: string;
}

interface Inputs {
    [key: string]: InputField;
}


const inputs = ref<Inputs>({
    nameRu: { value: item.value?.nameRu, error: '', type: 'string' },
    nameKg: { value: item.value?.nameKg, error: '', type: 'string' },
    descriptionRu: { value: item.value?.descriptionRu, error: '', type: 'string' },
    descriptionKg: { value: item.value?.descriptionKg, error: '', type: 'string' },
    shortDescriptionRu: { value: item.value?.shortDescriptionRu, error: '', type: 'string' },
    shortDescriptionKg: { value: item.value?.shortDescriptionKg, error: '', type: 'string' },
    price: { value: item?.value?.price, error: '', type: 'number' },
    categories: { value: item?.value?.categories, error: '' },
    subcategoryId: { value: item?.value?.subcategoryId, error: '' },
    brandId: { value: item?.value?.brandId, error: '' },
   size: { value: item?.value?.size, error: '', type: 'string' },
   color: { value: item?.value?.colorType, error: '', type: 'number' },
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
    try {
        const body = {
            "nameKg": inputs.value.nameKg.value,
            "nameRu": inputs.value.nameRu.value,
            "descriptionRu": inputs.value.descriptionRu.value,
            "descriptionKg": inputs.value.descriptionKg.value,
            "shortDescriptionRu": inputs.value.shortDescriptionRu.value,
            "shortDescriptionKg": inputs.value.shortDescriptionKg.value,
            "price": inputs.value.price.value,
            "categories": inputs.value.categories.value || null,
            "subcategoryId": inputs.value.subcategoryId.value || null,
            "brandId": inputs.value.brandId.value || null,
                     "size": inputs.value.size.value,
            "colorType": inputs.value.color.value,
            "isPopular": inputs.value.isPopular.value,
            "isFeatured": inputs.value.isFeatured.value,
            "isBeneficial": inputs.value.isBeneficial.value,
            "images": null
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


    console.log(item,'item')
    console.log('productsStore get Prouct',productsStore.getProduct)

    
    inputs.value = {
        nameRu: { value: item.value?.nameRu, error: '', type: 'string' },
        nameKg: { value: item.value?.nameKg, error: '', type: 'string' },
        descriptionRu: { value: item.value?.descriptionRu, error: '', type: 'string' },
        descriptionKg: { value: item.value?.descriptionKg, error: '', type: 'string' },
        shortDescriptionRu: { value: item.value?.shortDescriptionRu, error: '', type: 'string' },
        shortDescriptionKg: { value: item.value?.shortDescriptionKg, error: '', type: 'string' },
        price: { value: item?.value?.price, error: '', type: 'number' },
        categories: { value: item?.value?.categories, error: '' },
        subcategoryId: { value: item?.value?.subcategoryId, error: '' },
        brandId: { value: item?.value?.brandId, error: '' },
        size: { value: item?.value?.size, error: '', type: 'string' },
       color: { value: item?.value?.colorType, error: '', type: 'string' },
        isPopular: { value: item?.value?.isPopular, error: '' },
        isFeatured: { value: item?.value?.isFeatured, error: '' },
        isBeneficial: { value: item?.value?.isBeneficial, error: '' },
        images: {
            value: item?.value?.images, error: '',

        },
    }
    console.log('inputs',inputs)
})

</script>

<style scoped lang='scss'>
button {
    margin-top: 20px;
    @extend %button-shared;
}
</style>