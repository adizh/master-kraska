<template>
    <form class="grid" @submit.prevent="editProduct">

        <div class="col-4 each-field">
            <label for="name">Имя</label>
            <input class='form-input col-12' type="text" id="name" v-model="inputs.name.value"
                @input="validate('name', 'string')">
            <span v-if="inputs.name.error" class="err-input-msg">{{ inputs.name.error }}</span>
        </div>
        <div class="col-4 each-field">
            <label for="description">description</label>
            <input class='form-input col-12' type="text" id="description" v-model="inputs.description.value"
                @input="validate('description', 'string')">
            <span v-if="inputs.description.error" class="err-input-msg">{{ inputs.description.error }}</span>
        </div>

        <div class="col-4 each-field">
            <label for="price">price</label>
            <input class='form-input col-12' type="number" id="price" v-model="inputs.price.value"
                @input="validate('price', 'number')">
            <span v-if="inputs.price.error" class="err-input-msg">{{ inputs.price.error }}</span>
        </div>

        <div class="col-4 each-field">
            <label for="categoryId">categoryId</label>
            <input class='form-input col-12' type="text" id="categoryId" v-model="inputs.categoryId.value">
            <span v-if="inputs.categoryId.error" class="err-input-msg">{{ inputs.categoryId.error }}</span>
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
            <label for="expenditure">expenditure</label>
            <input class='form-input col-12' type="text" id="expenditure" v-model="inputs.expenditure.value"
                @input="validate('expenditure', 'string')">
            <span v-if="inputs.expenditure.error" class="err-input-msg">{{ inputs.expenditure.error }}</span>
        </div>




        <div class="col-4 each-field">
            <label for="packing">packing</label>
            <input class='form-input col-12' type="text" id="packing" v-model="inputs.packing.value"
                @input="validate('packing', 'string')">
            <span v-if="inputs.packing.error" class="err-input-msg">{{ inputs.packing.error }}</span>
        </div>


        <div class="col-4 each-field">
            <label for="brandName">brandName</label>
            <input class='form-input col-12' type="text" id="brandName" v-model="inputs.brandName.value"
                @input="validate('brandName', 'string')">
            <span v-if="inputs.brandName.error" class="err-input-msg">{{ inputs.brandName.error }}</span>
        </div>
        <div class="col-4 each-field">
            <label for="surfacePreparations">surfacePreparations</label>
            <input class='form-input col-12' type="text" id="surfacePreparations"
                v-model="inputs.surfacePreparations.value" @input="validate('surfacePreparations', 'string')">
            <span v-if="inputs.surfacePreparations.error" class="err-input-msg">{{ inputs.surfacePreparations.error
                }}</span>
        </div>


        <div class="col-4 each-field">
            <label for="numberOfLayers">numberOfLayers</label>
            <input class='form-input col-12' type="number" id="numberOfLayers" v-model="inputs.numberOfLayers.value"
                @input="validate('numberOfLayers', 'number')">
            <span v-if="inputs.numberOfLayers.error" class="err-input-msg">{{ inputs.numberOfLayers.error }}</span>
        </div>


        <div class="col-4 each-field">
            <label for="size">size</label>
            <input class='form-input col-12' type="text" id="size" v-model="inputs.size.value"
                @input="validate('size', 'string')">
            <span v-if="inputs.size.error" class="err-input-msg">{{ inputs.size.error }}</span>
        </div>


        <div class="col-4 each-field">
            <label for="size">material</label>
            <input class='form-input col-12' type="text" id="material" v-model="inputs.material.value"
                @input="validate('material', 'string')">
            <span v-if="inputs.material.error" class="err-input-msg">{{ inputs.material.error }}</span>
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

        <button type="submit">Сохранить изменения</button>
    </form>

</template>

<script setup lang="ts">

import { Product } from '~/types/Product';

const route = useRoute()
const id = route.params.id;
const { data: product } = await useApi(`/api/v1/Product/get-product-by-id/${id}`) as any;

const item = ref({} as Product)

interface InputField {
    value: string | number | undefined | string[] | boolean
    error: string;
    type?: string;
}

interface Inputs {
    [key: string]: InputField;
}


const inputs = ref<Inputs>({
    name: { value: item.value?.name, error: '', type: 'string' },
    description: { value: item.value?.description, error: '', type: 'string' },
    price: { value: item?.value?.price, error: '', type: 'number' },
    categoryId: { value: item?.value?.categoryId, error: '' },
    subcategoryId: { value: item?.value?.subcategoryId, error: '' },
    brandId: { value: item?.value?.brandId, error: '' },
    expenditure: { value: item?.value?.expenditure, error: '', type: 'string' },
    packing: { value: item?.value?.packing, error: '', type: 'string' },
    brandName: { value: item?.value?.brandName, error: '', type: 'string' },
    surfacePreparations: { value: item?.value?.surfacePreparations, error: '', type: 'string' },
    numberOfLayers: { value: item?.value?.numberOfLayers, error: '', type: 'number' },
    size: { value: item?.value?.size, error: '', type: 'string' },
    material: { value: item?.value?.material, error: '', type: 'string' },
    color: { value: item?.value?.color, error: '', type: 'string' },
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
            "name": inputs.value.name.value,
            "description": inputs.value.description.value,
            "price": inputs.value.price.value,
            "categoryId": inputs.value.categoryId.value || null,
            "subcategoryId": inputs.value.subcategoryId.value || null,
            "brandId": inputs.value.brandId.value || null,
            "expenditure": inputs.value.expenditure.value,
            "packing": inputs.value.packing.value,
            "brandName": inputs.value.brandName.value,
            "surfacePreparations": inputs.value.surfacePreparations.value,
            "numberOfLayers": inputs.value.numberOfLayers.value,
            "size": inputs.value.size.value,
            "material": inputs.value.material.value,
            "color": inputs.value.color.value,
            "isPopular": inputs.value.isPopular.value,
            "isFeatured": inputs.value.isFeatured.value,
            "isBeneficial": inputs.value.isBeneficial.value,
            "images": null
        }
        console.log(body)
        const response = await http.put(`/api/v1/Product/update-product/${item?.value?.id}`, body);
        console.log('response', response);
        if (response.status === 200) {


            useNotif('success', "Обновлено!", 'Успешно')
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
    item.value = product.value.product;
    console.log('what is produc value in in mounted', product);
    console.log('what is item in mouned ', item)

    inputs.value = {
        name: { value: item.value?.name, error: '', type: 'string' },
        description: { value: item.value?.description, error: '', type: 'string' },
        price: { value: item?.value?.price, error: '', type: 'number' },
        categoryId: { value: item?.value?.categoryId, error: '' },
        subcategoryId: { value: item?.value?.subcategoryId, error: '' },
        brandId: { value: item?.value?.brandId, error: '' },
        expenditure: { value: item?.value?.expenditure, error: '', type: 'string' },
        packing: { value: item?.value?.packing, error: '', type: 'string' },
        brandName: { value: item?.value?.brandName, error: '', type: 'string' },
        surfacePreparations: { value: item?.value?.surfacePreparations, error: '', type: 'string' },
        numberOfLayers: { value: item?.value?.numberOfLayers, error: '', type: 'number' },
        size: { value: item?.value?.size, error: '', type: 'string' },
        material: { value: item?.value?.material, error: '', type: 'string' },
        color: { value: item?.value?.color, error: '', type: 'string' },
        isPopular: { value: item?.value?.isPopular, error: '' },
        isFeatured: { value: item?.value?.isFeatured, error: '' },
        isBeneficial: { value: item?.value?.isBeneficial, error: '' },
        images: {
            value: item?.value?.images, error: '',

        },
    }
})

console.log('inutes edit admin', inputs);
console.log('item edit admin', item)
</script>

<style scoped lang='scss'>
button {
    margin-top: 20px;
    @extend %button-shared;
}
</style>