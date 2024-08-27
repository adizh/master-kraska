<template>
  <NuxtLayout name="admin">
    <div>
      <button class="btn-white-bg mb-4 mt-0" @click="navigateToAdmin">
        Назад
      </button>

      <h1 class="mb-3">
        Добавить продукт
      </h1>
      <span class="err-input-msg">*Обязательные поля</span>
      <form class="grid mt-3" @submit.prevent="formAdd">
        <div
          v-for="item in Object.values(inputs)"
          :key="item?.field"
          class="flex flex-column gap-2 lg:col-12 md:col-12 col-12"
        >
          <template
            v-if="
              item?.key === 'descriptionRu' || item?.key === 'descriptionKg'
            "
          >
            <label :for="item?.field">{{ "error" in item ? "*" : "" }}{{ item?.field }}</label>
            <textarea
              v-if="
                item?.key === 'descriptionRu' || item?.key === 'descriptionKg'
              "
              :id="item?.key"
              v-model="item.value"
              :name="item?.key"
              class="basic-input"
              @change="validate(item.key as any, item?.type as any)"
            />
          </template>

          <template v-else>
            <label :for="item?.field">
              {{ "error" in item ? "*" : "" }}{{ item?.field }}</label>
            <textarea
              :id="item?.field"
              v-model="item.value"
              class="basic-input"
              :type="!item?.type || item.type === 'string' ? 'text' : 'number'"
              @change="validate(item.key as any, item?.type as any)"
            />
          </template>

          <span v-if="item?.error" class="err-input-msg">{{
            item?.error
          }}</span>
        </div>

        <div class="lg:col-4 md:col-6 col-12">
          <label for="popular">Популярный</label>
          <input id="popular" v-model="isPopular" type="checkbox">
        </div>

        <div v-if="categoryCount?.length" class="lg:col-4 md:col-6 col-12">
          <label for="category">*Категория</label>

          <div
            v-for="(item, index) in categoryCount"
            :key="item"
            class="ui-dropdown mt-2"
          >
            <div
              class="selected-option basic-input"
              @click="toggleDropdown(index)"
            >
              <span>
                {{ selectedCategories[index]?.nameRu || "Выберите категорию" }}
              </span>
              <img
                class="arrow"
                :class="{ rotated: isCategoryOpen === index }"
                src="../../assets/icons/icon=components-closed-arrow.svg"
                alt="open-arrow"
              >
            </div>
            <Transition name="slide-fade">
              <div v-if="index === isCategoryOpen">
                <ul class="ui-options">
                  <input
                    type="text"
                    class="basic-input w-100 d-block"
                    @input="
                      (event: any) =>
                        catalogStore.filterTopCategories(event?.target?.value)
                    "
                  >
                  <li
                    v-for="categoryItem in catalogStore?.getTopCategories"
                    :key="categoryItem?.id"
                    @click="selectCategory(categoryItem, index)"
                  >
                    {{ categoryItem?.nameRu }}
                  </li>
                </ul>
              </div>
            </Transition>
            <span v-if="arrErrors.category.error.length" class="err-input-msg"> {{   arrErrors.category.error }}</span>

          </div>
        </div>

        <div v-if="isCategorySelected" class="lg:col-4 md:col-6 col-12">
          <label for="category">*Подкатегория</label>

          <div class="ui-dropdown mt-2">
            <div
              class="selected-option basic-input"
              @click="isSubcategorySelect = !isSubcategorySelect"
            >
              <span v-if="allSelectedSubcategories.length > 0">
                {{
                  allSelectedSubcategories
                    ?.map((item) => item?.nameRu)
                    ?.join("| ")
                }}
              </span>

              <span v-else> Выберите подкатегорию </span>
              <img
                class="arrow"
                :class="{ rotated: isSubcategorySelect }"
                src="../../assets/icons/icon=components-closed-arrow.svg"
                alt="open-arrow"
              >
            </div>
            <Transition name="slide-fade">
              <div v-if="isSubcategorySelect">
                <ul class="ui-options">
                  <input
                    type="text"
                    class="basic-input w-100 d-block admin-search-input"
                    @input="
                      (event: any) =>
                        catalogStore.filterSubcategoriesByCategory(
                          event?.target?.value,
                        )
                    "
                  >
                  <li
                    v-for="categoryItem in catalogStore?.getFilteredSubcategories"
                    :key="categoryItem?.id"
                    @click="chooseSubCategories(categoryItem)"
                  >
                    {{ categoryItem?.nameRu }}
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>

        <div v-if="subDirCount?.length" class="lg:col-6 md:col-6 col-12">
          <label for="category">Каталог</label>
          <div
            v-for="(subDirItem, index) in subDirCount"
            :key="subDirItem"
            class="ui-dropdown"
          >
            <div
              class="selected-option basic-input"
              @click="toggleSubCategory(index)"
            >
            <span>
              {{selectedSubCategories[index] ? (selectedSubCategories[index]?.category + ' - ' + selectedSubCategories[index]?.nameRu): "Выберите каталог" }}
            </span>
            
              <img
                class="arrow"
                :class="{ rotated: isSubCategoryOpen === index }"
                src="../../assets/icons/icon=components-closed-arrow.svg"
                alt="open-arrow"
              >
            </div>
            <Transition name="slide-fade">
              <div v-if="index === isSubCategoryOpen">
                <ul class="ui-options">
                  <input
                    type="text"
                    class="basic-input d-block w-full"
                    @input="
                      (event: any) =>
                        catalogStore.searchSubDirs(event?.target?.value)
                    "
                  >
                  <li
                    v-for="helperSubDir in catalogStore?.getHelperSubDirs"
                    :key="helperSubDir?.id"
                    @click="selectSubCategory(helperSubDir, index)"
                  >
                    {{ helperSubDir.category }}: {{ helperSubDir?.nameRu }}
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>

        <div class="lg:col-4 md:col-6 col-12 flex flex-column">
          <label for="image">*Картинка</label>
          <input type="file" @change="uploadImage">
          <span v-if="arrErrors?.image?.error" class="err-input-msg">{{
            arrErrors?.image?.error
          }}</span>

          <ProgressSpinner v-if="isImageLoading" />
        </div>

        <div class="lg:col-4 md:col-6 col-12">
          <label for="category">Бренд</label>

          <div class="ui-dropdown col-6">
            <div
              class="selected-option basic-input"
              @click="isBrandOpen = !isBrandOpen"
            >
              <span>
                {{ selectedBrand?.name || "Выберите бренд" }}
              </span>
              <img
                class="arrow"
                :class="{ rotated: isBrandOpen }"
                src="../../assets/icons/icon=components-closed-arrow.svg"
                alt="open-arrow"
              >
            </div>
            <Transition name="slide-fade">
              <div>
                <ul v-if="isBrandOpen" class="ui-options">
                  <input
                    type="text"
                    class="basic-input"
                    @input="(event: any) => seachBrands(event?.target?.value)"
                  >
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

        <div v-if="allVariants?.length" class="lg:col-4 md:col-6 col-12">
          <label for="category">Объемы</label>

          <div class="flex flex-row gap-3 flex-wrap col-12">
            <div
              v-for="(variant, index) in variantCount"
              :key="index"
              class="flex flex-column each-variant"
            >
              <label :for="'size-' + index">Размер</label>
              <input
                :id="'size-' + index"
                v-model="allVariants[index].size"
                type="text"
                class="basic-input"
              >

              <label :for="'price-' + index">Цена</label>
              <input
                :id="'price-' + index"
                v-model="allVariants[index].price"
                type="text"
                class="basic-input"
              >

              <label :for="'code-' + index">Код</label>
              <input
                :id="'code-' + index"
                v-model="allVariants[index].code"
                type="text"
                class="basic-input"
              >

              <label :for="'base-' + index">База</label>
              <input
                :id="'base-' + index"
                v-model="allVariants[index].base"
                type="text"
                class="basic-input"
              >
              <label :for="'file-' + index">Картинка</label>
              <input
                :id="'file-' + index"
                type="file"
                class="basic-input"
                @change="handleImage($event, index)"
              >

              <span v-if="allVariants[index].error" class="err-input-msg">{{
                allVariants[index].error
              }}</span>

              <ProgressSpinner v-if="allVariants[index].loading" />
            </div>
          </div>
        </div>

        <div class="lg:col-4 md:col-6 col-12">
          <button
            type="button"
            class="pink-button"
            @click.capture="addCategoryCount"
          >
            Добавить категорию
          </button>

          <span v-if="arrErrors.category.error.length" class="err-input-msg"> {{   arrErrors.category.error }}</span>
          <button
            type="button"
            class="pink-button"
            @click.capture="addVariantCount"
          >
            Добавить объем
          </button>
          <button
            type="button"
            class="pink-button"
            @click.capture="addSubDirCount"
          >
            Добавить каталог(helpersMain)
          </button>
          <button type="submit" class="btn-white-bg">
            Создать
          </button>
        </div>
      </form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

import {

  isSubCategoryOpen,
  categoryCount,
  subDirCount,
  isImageLoading,
  selectedCategories,
  selectedSubCategories,
  selectedBrand,
  isBrandOpen,
  isSubcategorySelect,
  selectedCategory,
  isCategorySelected,
  allSelectedSubcategories,

  isPopular,
  arrErrors,
  variantCount,
  allVariants,
  prodImages,
  isCategoryOpen,
  type Input,

  selectSubCategory,
  toggleSubCategory,
  chooseSubCategories,
  addCategoryCount,
  addSubDirCount,
  addVariantCount,
  toggleDropdown,
  selectBrand,
  fields
} from "@/helpers/admin/add-product";
const targetSizeBytes = 150 * 1024;
const brandsStore = useBrandsStore();
const catalogStore = useCatalogStore();
import imageCompression from "browser-image-compression";

const selectCategory = async (category: any, index: number) => {
  selectedCategory.value = category;
  selectedCategories.value[index] = category;
  isCategoryOpen.value = "";
  isCategorySelected.value = true;
  await catalogStore.fetchCategoryById(category?.id);
  arrErrors.value.category.error=''
};

const seachBrands = (value: string) => {
  brandsStore.searchBrands(value);
};


const { handleValues } = useInputValidation();
const checkImgCompression = async (event: any) => {
    const value = event.target.files[0];
    const options = {
      maxSizeMB: 0.1465,
      useWebWorker: true
    };
    let compressedFile = value;
    if (value?.size > targetSizeBytes) {
      try {
        compressedFile = await imageCompression(value, options);
        console.log("Original file size:", (value.size / 1024).toFixed(2), "KB");
        console.log(
          "Compressed file size:",
          (compressedFile.size / 1024).toFixed(2),
          "KB"
        );
      } catch (error) {
        console.error("Compression error:", error);
      }
    }
    return compressedFile;
  };
  
  const uploadImage = async (event: any) => {
    arrErrors.value.image.error = "";
    isImageLoading.value = await true;
    const result = await checkImgCompression(event);
    if (result?.size > targetSizeBytes) {
      arrErrors.value.image.error = "Размер слишком большой";
    }
    if (result && result !== undefined) {
      isImageLoading.value = await false;
      const base64StringNewImage = (await useConvertToBase64(
        result
      )) as unknown as string;
      prodImages.value = [base64StringNewImage];
      arrErrors.value.image.error = "";
    }
    console.log("prodImages", prodImages);
  };
  
  const handleImage = async (event: any, index: number) => {
    allVariants.value[index].loading = true;
    const result = await checkImgCompression(event);
  
    if (result.size > targetSizeBytes) {
      allVariants.value[index].error = "Размер слишком большой";
      allVariants.value[index].loading = false;
    } else if (result.size < targetSizeBytes && result && result !== undefined) {
      allVariants.value[index].loading = false;
      const base64StringNewImage = (await useConvertToBase64(
        result
      )) as unknown as string;
      allVariants.value[index].image = base64StringNewImage as unknown as string;
    }
  };
const addProduct = async () => {
  const values = Object.values(inputs?.value);
  const body: { [key: string]: any } = {};
  for (let i = 0; i < values.length; i++) {
    const current = values[i];
    if (
      current &&
      typeof current === "object" &&
      typeof current.key !== "undefined"
    ) {
      const key = current.key;
      if (key !== null && typeof key !== "undefined") {
        body[key] = current.value;
      }
    }
  }
  const categories = selectedCategories?.value
    ?.filter(Boolean)
    ?.map((item) => item?.id);

  function allFieldsHaveValues (obj: any) {
    return Object.values(obj).every(
      (value) => value !== "" && value !== null && value !== undefined
    );
  }

  const subCategories = selectedSubCategories?.value
    ?.filter(Boolean)
    ?.map((item) => item?.id);


  const filteredVariants = allVariants.value?.filter((obj) =>
    allFieldsHaveValues(obj)
  );

const subCategors=allSelectedSubcategories.value?.filter(Boolean)
    ?.map((item) => item?.id);

  const allCategories=[...categories,...subCategors]

  const remaining = {
    isPopular: isPopular?.value,
    isFeatured: false,
    isBeneficial: false,
    subdirectoryId: subCategories || null,
    brandId: selectedBrand?.value?.id,
    images: prodImages?.value,
    categoryIds: allCategories,
    variants: filteredVariants,
    extension: "png"
  };

  const result = { ...body, ...remaining };

  try {
    const response = await http.post(`/api/v1/Product/create-product`, result);
    console.log("response", response);
    if (response.status === 200) {
      useNotif("success", "Продукт создан!", "Успешно");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  } catch (err) {
    console.log(err);
  }
};

const formAdd = () => {

  const hasArrError= Object.values(arrErrors)
console.log('selectedSubCategories',selectedSubCategories)
console.log('allSelectedSubCategories',allSelectedSubcategories)

  if(!selectedCategories.value.length){

  }
  for (const fieldName in inputs.value) {
    if (Object.prototype.hasOwnProperty.call(inputs.value, fieldName)) {
      const fieldType = inputs.value[fieldName].type;
      handleValues(inputs.value, fieldName, fieldType);
    }
  }

  const hasError = Object.values(inputs.value).some(
    (input) => input.hasOwnProperty('error') &&  input.error !== ""
  );


  console.log('hasError',hasError)
  console.log('inputs',inputs)

  if (!prodImages?.value?.length) {
    arrErrors.value.image.error = "Это поле обязательно";
  }  if(!selectedCategories.value.length){
    arrErrors.value.category.error = "Это поле обязательно";
  }
  
  
   if (!hasError && prodImages?.value?.length) {
    addProduct();
  }
};


const inputs = ref<{ [key: string]: Input }>({});

for (const key in fields.value) {
  const field = fields.value[key];
  if (typeof field === "object" && "value" in field) {
    inputs.value[key] = { ...field, key };
  }
}

const validate = (field: string, type: string) => {
  handleValues(inputs.value, field, type);
};

onMounted(() => {
  catalogStore.fetchAllCategoriesLinked();
  brandsStore.fetchAllBrands();
  catalogStore.getHelpersSubDirs();
});
</script>

<style scoped lang="scss">
.admin-form {
  @include flex(row, start, center, 20px);
  flex-wrap: wrap;
}
.selected-option {
  @include flex(row, space-between, center);

  &:hover {
    cursor: pointer;
  }
}

.each-variant {
  border: 1px solid #ddd;
}
.ui-options {
  border: 1px solid $slider-border-color;
  border-radius: 8px;
  padding: 6px;
  max-height: 200px;
  overflow-y: auto;
  @include textFormat(16px, 20px, 400, #000);
  input {
    display: block;
    width: 100%;
  }
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
