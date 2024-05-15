<template>
  <section>
    <form class="grid" @submit.prevent="editProduct('form')">
      <div class="lg:col-4 md:col-6 col-12 each-field">
        <label for="name">Имя</label>
        <input
          id="name"
          v-model="inputs.nameRu.value"
          class="basic-input col-12"
          type="text"
          @input="validate('nameRu', 'string')"
        >
        <span v-if="inputs.nameRu.error" class="err-input-msg">{{
          inputs.nameRu.error
        }}</span>
      </div>

      <div class="lg:col-4 md:col-6 col-12 each-field">
        <label for="name">Имя (кырг)</label>
        <input
          id="name"
          v-model="inputs.nameKg.value"
          class="basic-input col-12"
          type="text"
          @input="validate('nameKg', 'string')"
        >
        <span v-if="inputs.nameKg.error" class="err-input-msg">{{
          inputs.nameKg.error
        }}</span>
      </div>

      <div class="lg:col-4 md:col-6 col-12 each-field">
        <label for="description">Описание</label>
        <input
          id="description"
          v-model="inputs.descriptionRu.value"
          class="basic-input col-12"
          type="text"
          @input="validate('descriptionRu', 'string')"
        >
        <span v-if="inputs.descriptionRu.error" class="err-input-msg">{{
          inputs.descriptionRu.error
        }}</span>
      </div>
      <div class="lg:col-4 md:col-6 col-12 each-field">
        <label for="description">Описание (кырг)</label>
        <input
          id="descriptionKg"
          v-model="inputs.descriptionKg.value"
          class="basic-input col-12"
          type="text"
          @input="validate('descriptionKg', 'string')"
        >
        <span v-if="inputs.descriptionKg.error" class="err-input-msg">{{
          inputs.descriptionKg.error
        }}</span>
      </div>
      <div class="lg:col-4 md:col-6 col-12 each-field">
        <label for="description">Короткое описание</label>
        <input
          id="shortDescriptionRu"
          v-model="inputs.shortDescriptionRu.value"
          class="basic-input col-12"
          type="text"
          @input="validate('shortDescriptionRu', 'string')"
        >
        <span v-if="inputs.shortDescriptionRu.error" class="err-input-msg">{{
          inputs.shortDescriptionRu.error
        }}</span>
      </div>
      <div class="lg:col-4 md:col-6 col-12 each-field">
        <label for="description">Короткое описание (кырг)</label>
        <input
          id="shortDescriptionKg"
          v-model="inputs.shortDescriptionKg.value"
          class="basic-input col-12"
          type="text"
          @input="validate('shortDescriptionKg', 'string')"
        >
        <span v-if="inputs.shortDescriptionKg.error" class="err-input-msg">{{
          inputs.shortDescriptionKg.error
        }}</span>
      </div>

      <div class="lg:col-4 md:col-6 col-12 each-field">
        <label for="price">Цена</label>
        <input
          id="price"
          v-model="inputs.price.value"
          class="basic-input col-12"
          type="number"
          @input="validate('price', 'number')"
        >
        <span v-if="inputs.price.error" class="err-input-msg">{{
          inputs.price.error
        }}</span>
      </div>

      <div class="lg:col-4 md:col-6 col-12 each-field" v-if="item?.categories?.length">
        <label for="categoryId">Категории</label>
  <UISelect v-for="item in categoryValues?.value" :key="item?.id" :options="catalogStore?.getLinkedCategories" label="nameRu" 
  @selectValue="selectValue"
  :isDropdownOpen="isCategoryOpen === item?.id" :selectedValue="item" @openDropdown="openDropdown" @deleteCategory="deleteCategory"
  @searchCategories=searchCategories  type="category"
  />
      </div>

      <div class="lg:col-4 md:col-6 col-12 each-field">
        <label for="brandId">Бренд</label>
<UISelect  :options="brandsStore?.getAllBrands" label="name" 
@selectValue="selectBrand"
:isDropdownOpen="isBrandOpen" :selectedValue="selectedBrand" @openDropdown="toggleBrand" 
@searchCategories='seachBrands' type="brand"
/>
      
      </div>


      <div class="lg:col-6 md:col-6 col-12 each-field">
        <label for="subcategoryId">Подкатегории (helpersMain)</label>
        <UISelect v-for="helper in productHelpers" :key="helper?.id" :options="catalogStore.getHelperSubDirs" label="nameRu" 
        @selectValue="selectSubDir" :isDropdownOpen="isHelperOpen === helper?.id" :selectedValue="helper" @openDropdown="toggleHelper" @deleteCategory="deleteSubDir"
        @searchCategories='catalogStore.searchSubDirs'  type="subdir"
        />
      </div>

     
      <div class="lg:col-4 md:col-6 col-12 each-field">
        <label for="size" class="flex flex-row justify-content-between">
          <span> Размер </span>
        </label>
        <input
          id="size"
          v-model="inputs.size.value"
          class="basic-input col-12"
          type="text"
          @input="validate('size', 'string')"
        >
        <span v-if="inputs.size.error" class="err-input-msg">{{
          inputs.size.error
        }}</span>
      </div>

      <div class="lg:col-4 md:col-6 col-12 each-field">
        <label for="size">Цвет</label>
        <input
          id="color"
          v-model="inputs.color.value"
          class="basic-input col-12"
          type="text"
          @input="validate('color', 'string')"
        >
        <span v-if="inputs.color.error" class="err-input-msg">{{
          inputs.color.error
        }}</span>
      </div>

      <div class="lg:col-4 md:col-6 col-12 each-field">
        <label for="size">Высыхание</label>
        <input
          id="color"
          v-model="inputs.dryingTime.value"
          class="basic-input col-12"
          type="text"
          @input="validate('dryingTime', 'string')"
        >
        <span v-if="inputs.dryingTime.error" class="err-input-msg">{{
          inputs?.dryingTime?.error
        }}</span>
      </div>
      <div class="lg:col-4 md:col-6 col-12 each-field">
        <label for="size" class="flex flex-row justify-content-between">
          <span> Расход </span>
          <span class="cursor" @click="isDeleteOpen = true">X</span>
        </label>

        <input
          id="color"
          v-model="inputs.consumption.value"
          class="basic-input col-12"
          type="text"
          @input="validate('consumption', 'string')"
        >
        <span v-if="inputs.consumption.error" class="err-input-msg">{{
          inputs.consumption.error
        }}</span>
      </div>

      <div class="col-12 each-field">
        <label for="size">Объемы</label>
        <div class="all-variant">
          <div v-for="variant in variants" :key="variant?.id" class="variant">
            <img
              :src="varSizes[variant?.size]?.image"
              alt="variant"
              style="cursor: pointer"
              @click="openFileInput(variant?.size)"
            >
            <input
              id="fileInput"
              ref="fileInput"
              type="file"
              style="display: none"
              @change="(event) => handleNewVarImage(event)"
            >

            <label :for="variant?.size">Размер</label>
            <input
              :id="variant?.size"
              v-model="varSizes[variant?.size].size"
              class="basic-input col-12"
              type="text"
            >

            <label :for="variant?.base">База</label>
            <input
              :id="variant?.base"
              v-model="varSizes[variant?.size].base"
              class="basic-input col-12"
              type="text"
            >
            <label :for="variant?.size">Код</label>
            <input
              :id="variant?.size"
              v-model="varSizes[variant?.size].code"
              class="basic-input col-12"
              type="number"
            >

            <label :for="variant?.size">Цена</label>
            <input
              :id="variant?.size"
              v-model="varSizes[variant?.size].price"
              class="basic-input col-12"
              type="number"
            >
          </div>
        </div>
        <span v-if="inputs.color.error" class="err-input-msg">{{
          inputs.color.error
        }}</span>
      </div>

      <div class="lg:col-4 md:col-6 col-12 each-field">
        <label for="size">Популярный</label>
        <input
          id="color"
          v-model="inputs.isPopular.value"
          class="basic-input col-12"
          type="checkbox"
        >
      </div>

      <div class="lg:col-4 md:col-6 col-12 each-field">
        <label for="isFeatured">Рекомендуемый</label>
        <input
          id="isFeatured"
          v-model="inputs.isFeatured.value"
          class="basic-input col-12"
          type="checkbox"
        >
      </div>

      <div class="lg:col-4 md:col-6 col-12 each-field">
        <label for="isBeneficial">Выгодный</label>
        <input
          id="isBeneficial"
          v-model="inputs.isBeneficial.value"
          class="basic-input col-12"
          type="checkbox"
        >
      
      </div>

      <button type="submit">
        Сохранить изменения
      </button>
    </form>

    <button type="button" class="pink-button" @click="isVariantOpen = true">
      +Добавить объемы
    </button>

    <button type="button" class="pink-button" @click="isCategoryCreateOpen = true">
      +Добавить категорию
    </button>
    <UIModal
      :show-modal="isVariantOpen"
      title="Добавить объем"
      @close-modal="isVariantOpen = false"
    >
      <form
        class="flex flex-column align-items-start mt-3 gap-2"
        @submit.prevent="addVariant"
      >
        <input
          v-model="newVariants.size"
          type="text"
          placeholder="Размер"
          required
          class="basic-input"
        >
        <input
          v-model="newVariants.price"
          type="number"
          placeholder="Цена"
          required
          class="basic-input"
        >
        <input
        v-model="newVariants.base"
        type="text"
        placeholder="База"
        required
        class="basic-input"
      >
        <input
          v-model="newVariants.code"
          type="number"
          placeholder="Код"
          required
          class="basic-input"
        >
        <input type="file" @change="handleFileChange">
        <button type="submit">
          Добавить
        </button>
      </form>
    </UIModal>

    <Dialog
      v-model:visible="isDeleteOpen"
      modal
      :style="{ width: '550px', padding: '20px 40px 50px 20px' }"
      header=" "
    >
      <ConfirmPay
        title="Вы действительно хотите удалить расход"
        @cancel="isDeleteOpen = false"
        @confirm="confirmDelete"
      />
    </Dialog>

    <Dialog
    v-model:visible="isDeleteCategoryOpen"
    modal
    :style="{ width: '550px', padding: '20px 40px 50px 20px' }"
    header=" "
  >
    <ConfirmPay
      :title="`Вы действительно хотите удалить категорию ${currentCategory?.nameRu}`"
      @cancel="isDeleteCategoryOpen = false"
      @confirm="confirmCategoryDelete"
    />
  </Dialog>

  <Dialog
  v-model:visible="isSubDirDeleteOpen"
  modal
  :style="{ width: '550px', padding: '20px 40px 50px 20px' }"
  header=" "
>
  <ConfirmPay
    :title="`Вы действительно хотите удалить подкатегорию  ${currentSubDir?.category}: ${currentSubDir?.nameRu}`"
    @cancel="isSubDirDeleteOpen = false"
    @confirm="confirmSubDirDelete"
  />
</Dialog>

  <UIModal
  :show-modal="isCategoryCreateOpen"
  title="Добавить категорию"
  @close-modal="isCategoryCreateOpen = false"
>
<div class="ui-dropdown col-6">
  <div class="selected-option basic-input" @click="toggleCreateCategory">
    <span>

     {{  newCategory?.nameRu||'Выбрать категорию'  }}
    </span>

    
    <img
      class="arrow"
      :class="{ rotated: isCategoryCreateOpen }"
      src="../../../assets/icons/icon=components-closed-arrow.svg"
      alt="open-arrow"
    />
  </div>



  <Transition name="slide-fade">
   <div>
    <ul class="ui-options" v-if="openCategory">
        <input type="text" class="basic-input" v-model="searchCategory" @input="(event:any)=>searchCategories(event?.target?.value)"/>
      <li
        v-for="(item,index) in catalogStore?.getLinkedCategories"
        :key="item?.id" 
        @click='selectNewCategory(item)'
      >
        {{ item?.nameRu }}
      </li>
    </ul>
   </div>
  </Transition>
</div>

    <button type="button" @click='createNewProdCategory'>
      Добавить
    </button>

</UIModal>

  </section>

</template>

<script setup lang="ts">
import { Brands } from "~/types/Brands";
import { Category, CategorySys } from "~/types/Category";
import { Product } from "~/types/Product";
import { Variant } from "~/types/Variant";
import {SubDirHelper} from '@/types/Catalog'
const { t } = useI18n();
const route = useRoute();
const id = route.params.id;
const isVariantOpen = ref(false);
const isDeleteCategoryOpen = ref(false);
const item = ref({} as Product);
const brandsStore=useBrandsStore()
const currentCategory=ref({} as CategorySys)
const productsStore = useProductsSstore();
const catalogStore=useCatalogStore()
const isBrandOpen =ref(false)
const isDeleteOpen = ref(false);
const isCategoryCreateOpen = ref(false);
const isSubDirDeleteOpen=ref(false)
const isCategoryOpen=ref('');
const selectedBrand =ref({} as Brands)
const searchCategory =ref('')
const newCategory=ref({} as CategorySys)
const isHelperOpen=ref('')
const productHelpers=ref([] as SubDirHelper[])
const currentSubDir=ref({} as any)
const searchCategories =(value:string)=>{
  catalogStore.filterLinkedCategories(value)
}
const newVariants = ref({
  size: "",
  price: "",
  code: "",
  image: "",
  base:""
});
const deleteSubDir =(value:SubDirHelper,mainValue:string)=>{
  isSubDirDeleteOpen.value=true;
  currentSubDir.value={...value, category:mainValue}
  console.log('currentSubDir',currentSubDir)
}
const toggleHelper =(value:SubDirHelper)=>{
  if(isHelperOpen.value===value?.id){
    isHelperOpen.value=''
  }else{
    isHelperOpen.value=value?.id
  }
}

const handleFileChange = (event: any) => {
  newVariants.value.image = event.target.files[0];
};

const selectBrand=(brand:Brands,{})=>{
  inputs.value.brandId.value =brand?.id;
  selectedBrand.value=brand;
  isBrandOpen.value=false
}

const toggleBrand=()=>{
  isBrandOpen.value=!isBrandOpen.value
}
const deleteCategory=(item:CategorySys)=>{
  currentCategory.value=item;
  isDeleteCategoryOpen.value=true
}
const openCategory=ref(false);

const toggleCreateCategory =()=>{
  openCategory.value=!  openCategory.value
}

const openDropdown =(value:CategorySys)=>{
  if(  isCategoryOpen.value===value?.id){
    isCategoryOpen.value='';
    console.log('isCategoryOpen',isCategoryOpen)
  }else{
    isCategoryOpen.value=value?.id
  }
}

const seachBrands =(value:string)=>{
console.log(value);
brandsStore.searchBrands(value)
}

const selectValue =(newCategory:CategorySys,selectedValue:CategorySys)=>{
 const itemIndex = categoryValues.value.findIndex((item:CategorySys)=>item?.id===selectedValue?.id);
  categoryValues.value.splice(itemIndex,1,newCategory)
  isCategoryOpen.value='';
}
const variants = ref([] as Variant[]);

interface InputField {
  value:
    | string
    | number
    | undefined
    | string[]
    | boolean
    | CategorySys[]
    | any[];
  error: string;
  type?: string | any;
}

interface Inputs {
  [key: string]: InputField;
}

const confirmCategoryDelete =()=>{
 const categoryIndex= categoryValues?.value.findIndex((item:CategorySys)=>item?.id===currentCategory?.value?.id)
 categoryValues.value.splice(categoryIndex,1);
 isDeleteCategoryOpen.value=false;
 editProduct()
}


const confirmSubDirDelete =()=>{
 const index= productHelpers?.value.findIndex((item:SubDirHelper)=>item?.id===currentSubDir?.value?.id)
 productHelpers.value.splice(index,1);


 isSubDirDeleteOpen.value=false
 editProduct()
}
const selectNewCategory =(item:CategorySys)=>{
  newCategory.value=item;
  openCategory.value=false;
}

const createNewProdCategory =async()=>{
  if(newCategory?.value?.id){
    try{
const response = await http.put(`/api/v1/Product/add-category/${item?.value?.id}?categoryId=${newCategory?.value?.id}`);
console.log('response new caegory',response);
if(response.status===200){
  useNotif('success','Категория добавлена!','Успешно')
}
    }catch(err){
      console.log(err)
    }finally{
      isCategoryCreateOpen.value=false
    }
  }
}

const convertToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const newVarImage = ref(null);
const variantImage = ref("");

const handleNewVarImage = async (event: any) => {
  newVarImage.value = event.target.files[0];
  const base64StringNewImage = await convertToBase64(newVarImage.value);
  variantImage.value = base64StringNewImage as unknown as string;
  varSizes[currVarSize.value].image = base64StringNewImage as unknown as string;
};

const currVarSize = ref("");
const openFileInput = (varSize: string) => {
  const fileInput = document.getElementById("fileInput") as HTMLElement;
  fileInput.click();
  currVarSize.value = varSize;
};

const selectSubDir =(value:SubDirHelper,prevValue:SubDirHelper)=>{
  const index= productHelpers.value.findIndex((item:SubDirHelper)=>item?.id===prevValue?.id)
  productHelpers.value.splice(index,1,value)
}

const confirmDelete = () => {
  inputs.value.consumption.value = null as unknown as string;
  submitUpdate();
  isDeleteOpen.value = false;
};
const addVariant = async () => {
  if (!newVariants.value.image) {
    return;
  }
  try {
    const base64String = await convertToBase64(newVariants.value.image);
    const body = [
      {
        price: newVariants.value.price,
        code: newVariants.value.code,
        size: newVariants.value.size,
        base:newVariants.value?.base,
        image: base64String
      }
    ];
    const response = await http.put(`/api/v1/Product/add-variants/${id}`, body);
    console.log("response add variant", response);
  } catch (err) {
    console.log(err);
  } finally {
    isVariantOpen.value = false;
  }
};

const categories = ref([] as any[]);
const categoryValues = reactive({} as any);
const varSizes = reactive({} as any);

const inputs = ref<Inputs>({
  nameRu: { value: item.value?.nameRu, error: "", type: "string" },
  nameKg: { value: item.value?.nameKg, error: "", type: "string" },
  descriptionRu: {
    value: item.value?.descriptionRu,
    error: "",
    type: "string"
  },
  descriptionKg: {
    value: item.value?.descriptionKg,
    error: "",
    type: "string"
  },
  shortDescriptionRu: {
    value: item.value?.shortDescriptionRu,
    error: "",
    type: "string"
  },
  shortDescriptionKg: {
    value: item.value?.shortDescriptionKg,
    error: "",
    type: "string"
  },
  price: { value: item?.value?.price, error: "", type: "number" },
  subcategoryId: { value: item?.value?.subcategoryId, error: "" },
  brandId: { value: item?.value?.brandId, error: "" },
  size: { value: item?.value?.size, error: "", type: "string" },
  color: { value: item?.value?.colorType, error: "", type: "number" },
  consumption: { value: item?.value?.consumption, error: "", type: "string" },
  dryingTime: { value: item?.value?.dryingTime, error: "", type: "string" },
  isPopular: { value: item?.value?.isPopular, error: "" },
  isFeatured: { value: item?.value?.isFeatured, error: "" },
  isBeneficial: { value: item?.value?.isBeneficial, error: "" },
  images: {
    value: item?.value?.images,
    error: ""
  }
});

const { handleValues } = useInputValidation();

const validate = (field: string, type: string) => {
  handleValues(inputs.value, field, type);
};


const submitUpdate = async () => {
  const prodCategories = categoryValues.value.map((item:CategorySys)=>item?.id)
  const prodVariantes = Object.values(varSizes).map((item: any) => {
    if (item?.image && item?.image?.startsWith("http")) {
      return { ...item, image: null };
    } else {
      return item;
    }
  });



  const subDirs=productHelpers?.value?.map((item)=>item?.id)
  console.log('subDirs',subDirs)
  try {
    const body = {
      nameKg: inputs.value.nameKg.value,
      nameRu: inputs.value.nameRu.value,
      descriptionRu: inputs.value.descriptionRu.value,
      descriptionKg: inputs.value.descriptionKg.value,
      shortDescriptionRu: inputs.value.shortDescriptionRu.value,
      shortDescriptionKg: inputs.value.shortDescriptionKg.value,
      price: inputs.value.price.value,
      categoryIds: prodCategories || null,
     // subcategoryId: inputs.value.subcategoryId.value || null,
      brandId: inputs.value.brandId.value || null,
      subdirectoryId:subDirs || null,
      size: inputs.value.size.value,
      colorType: inputs.value.color.value,
      isPopular: inputs.value.isPopular.value,
      isFeatured: inputs.value.isFeatured.value,
      isBeneficial: inputs.value.isBeneficial.value,
      consumption: inputs.value.consumption.value,
      dryingTime: inputs?.value?.dryingTime?.value,
      images: null,
      variants: prodVariantes || null
    };

    const response = await http.put(
      `/api/v1/Product/update-product/${id}`,
      body
    );
    console.log("response", response);
    if (response.status === 200) {
      useNotif("success", t("updated"), t("success"));
    }
  } catch (err) {
    console.log(err);
  }
};

const editProduct = (type:string='') => {
  console.log('herlpersMain',productHelpers)
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
    submitUpdate();
    if(type==='form'){
     // router.push('/admin')
    }
  }
};


const router=useRouter()

onMounted(async () => {
//   if(authStore?.getRole!=='Admin'){
//     router.push('/')
// }
  await productsStore.fetchProductById(id as string);
  catalogStore?.fetchAllCategoriesLinked();


  item.value = productsStore?.getProduct?.product;

  await brandsStore.fetchAllBrandId(item?.value?.brandId)
  await brandsStore.fetchAllBrands();
  selectedBrand.value=brandsStore.getBrand

  if (item?.value?.variants) {
    variants.value = item.value.variants;
  }

  console.log('item',item)
  categories.value = item?.value?.categories;

  categoryValues.value= item?.value?.categories;

  productHelpers.value=item?.value?.helpersMain
 
catalogStore.getHelpersSubDirs()


  item?.value?.variants?.map((variant: Variant) => {
    varSizes[variant?.size] = { ...variant };
    return varSizes;
  });

  inputs.value = {
    nameRu: { value: item.value?.nameRu, error: "", type: "string" },
    nameKg: { value: item.value?.nameKg, error: "", type: "string" },
    descriptionRu: {
      value: item.value?.descriptionRu,
      error: "",
      type: "string"
    },
    descriptionKg: {
      value: item.value?.descriptionKg,
      error: "",
      type: "string"
    },
    shortDescriptionRu: {
      value: item.value?.shortDescriptionRu,
      error: "",
      type: "string"
    },
    shortDescriptionKg: {
      value: item.value?.shortDescriptionKg,
      error: "",
      type: "string"
    },
    price: { value: item?.value?.price, error: "", type: "number" },
    //   categories: { value: item?.value?.categories, error: '' },
    subcategoryId: { value: item?.value?.subcategoryId, error: "" },
    brandId: { value: item?.value?.brandId, error: "" },
    size: { value: item?.value?.size, error: "", type: "string" },
    color: { value: item?.value?.colorType, error: "", type: "string" },
    dryingTime: { value: item?.value?.dryingTime, error: "", type: "string" },
    consumption: { value: item?.value?.consumption, error: "", type: "string" },
    isPopular: { value: item?.value?.isPopular, error: "" },
    isFeatured: { value: item?.value?.isFeatured, error: "" },
    isBeneficial: { value: item?.value?.isBeneficial, error: "" },
    images: {
      value: item?.value?.images,
      error: ""
    }
  };
});

console.log('categories',categories)
</script>

<style scoped lang="scss">
.selected-option {
  @include flex(row, space-between, center);

  &:hover {
    cursor: pointer;
  }
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
button {
  margin-top: 20px;
  @extend %button-shared;
}

.variant {
  border: 1px solid $main-pink;
  img {
    width: 100%;
  }
}
.all-variant {
  @include flex(row, start, start);
  flex-wrap: wrap;
  div {
    width: 20%;
  }
}

@media (max-width: 768px) {
  .all-variant {
    div {
      width: 45%;
    }
  }
}
@media (max-width: 576px) {
  .all-variant {
    flex-direction: column;
    div {
      width: 100%;
    }
  }
}
</style>
