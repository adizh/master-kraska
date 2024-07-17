<template>
  <div>
    <button class="btn-white-bg mb-4 mt-0" @click="navigateTo('/admin')">
      Назад
    </button>

    <h1 class="mb-3">Добавить продукт</h1>
    <form class="grid" @submit.prevent="formAdd">
      <div
        v-for="item in Object.values(inputs)"
        :key="item?.field"
        class="flex flex-column gap-2 lg:col-4 md:col-6 col-12"
      >
        <template
          v-if="item?.key === 'descriptionRu' || item?.key === 'descriptionKg'"
        >
          <label :for="item?.field">{{ item?.field }}</label>
          <textarea
            v-if="
              item?.key === 'descriptionRu' || item?.key === 'descriptionKg'
            "
            :id="item?.key"
            v-model="item.value"
            :name="item?.key"
            cols="30"
            rows="10"
            class="basic-input"
            @input="validate(item.key as string, item?.type as string)"
          />
        </template>

        <template v-else>
          <label :for="item?.field">{{ item?.field }}</label>
          <input
            :id="item?.field"
            v-model="item.value"
            class="basic-input"
            :type="!item?.type || item.type === 'string' ? 'text' : 'number'"
            @input="validate(item.key as string, item?.type as string)"
          />
        </template>

        <span v-if="item?.error" class="err-input-msg">{{ item?.error }}</span>
      </div>

      <div class="lg:col-4 md:col-6 col-12">
        <label for="popular">Популярный</label>
        <input id="popular" v-model="isPopular" type="checkbox" />
      </div>

      <div v-if="categoryCount?.length" class="lg:col-4 md:col-6 col-12">
        <label for="category">Категория</label>

        <div
          v-for="(item, index) in categoryCount"
          :key="item"
          class="ui-dropdown col-6"
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
            />
          </div>
          <Transition name="slide-fade">
            <div>
              <ul v-if="index === isCategoryOpen" class="ui-options">
                <input
                  type="text"
                  class="basic-input"
                  @input="
                    (event: any) => searchCategories(event?.target?.value)
                  "
                />
                <li
                  v-for="item in catalogStore?.getLinkedCategories"
                  :key="item?.id"
                  @click="selectCategory(item, index)"
                >
                  {{ item?.nameRu }}
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </div>

      <div v-if="subDirCount?.length" class="lg:col-4 md:col-6 col-12">
        <label for="category">Подкатегория</label>
        <div
          v-for="(item, index) in subDirCount"
          :key="item"
          class="ui-dropdown col-6"
        >
          <div
            class="selected-option basic-input"
            @click="toggleSubCategory(index)"
          >
            <span>
              {{
                selectedSubCategories[index]?.nameRu || "Выберите подкатегорию"
              }}
            </span>
            <img
              class="arrow"
              :class="{ rotated: isSubCategoryOpen === index }"
              src="../../assets/icons/icon=components-closed-arrow.svg"
              alt="open-arrow"
            />
          </div>
          <Transition name="slide-fade">
            <div>
              <ul v-if="index === isSubCategoryOpen" class="ui-options">
                <input
                  type="text"
                  class="basic-input"
                  @input="
                    (event: any) =>
                      catalogStore.searchSubDirs(event?.target?.value)
                  "
                />
                <li
                  v-for="item in catalogStore?.getHelperSubDirs"
                  :key="item?.id"
                  @click="selectSubCategory(item, index)"
                >
                  {{ item?.nameRu }}
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </div>

      <div class="lg:col-4 md:col-6 col-12 flex flex-column">
        <label for="image">Картинка</label>
        <input type="file" @change="uploadImage" />
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
            />
          </div>
          <Transition name="slide-fade">
            <div>
              <ul v-if="isBrandOpen" class="ui-options">
                <input
                  type="text"
                  class="basic-input"
                  @input="(event: any) => seachBrands(event?.target?.value)"
                />
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
        <span v-if="arrErrors?.brand?.error" class="err-input-msg">{{
          arrErrors?.brand?.error
        }}</span>
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
            />

            <label :for="'price-' + index">Цена</label>
            <input
              :id="'price-' + index"
              v-model="allVariants[index].price"
              type="text"
              class="basic-input"
            />

            <label :for="'code-' + index">Код</label>
            <input
              :id="'code-' + index"
              v-model="allVariants[index].code"
              type="text"
              class="basic-input"
            />

            <label :for="'base-' + index">База</label>
            <input
              :id="'base-' + index"
              v-model="allVariants[index].base"
              type="text"
              class="basic-input"
            />
            <label :for="'file-' + index">Картинка</label>
            <input
              :id="'file-' + index"
              type="file"
              class="basic-input"
              @change="handleImage($event, index)"
            />

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
          +Добавить категорию
        </button>
        <button
          type="button"
          class="pink-button"
          @click.capture="addVariantCount"
        >
          +Добавить объем
        </button>
        <button
          type="button"
          class="pink-button"
          @click.capture="addSubDirCount"
        >
          +Добавить подкатегорию
        </button>
        <button type="submit" class="btn-white-bg">Создать</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import imageCompression from "browser-image-compression";
import { Brands } from "~/types/Brands";
import { CategorySys } from "~/types/Category";
import { Variant } from "~/types/Variant";
const isCategoryOpen = ref();
type Input = {
  value: string;
  error?: string;
  type?: string;
  field?: string;
  key?: string;
};
type Fields = {
  [key: string]:
    | Input
    | boolean
    | string[]
    | Variant[]
    | string
    | {
        id: string;
        size: string;
        price: number;
        code: number;
        image: string;
        base: string;
      }[];
};

const catalogStore = useCatalogStore();
const isSubCategoryOpen = ref();
const categoryCount = ref([] as number[]);
const subDirCount = ref([] as number[]);
const isImageLoading = ref(false);
const selectedCategories = ref([] as any[]);
const selectedSubCategories = ref([] as any[]);
const selectedBrand = ref({} as Brands);
const isBrandOpen = ref(false);
const brandsStore = useBrandsStore();
const selectedCategory = ref({} as CategorySys);
const selectedSubCategory = ref({} as CategorySys);
const isPopular = ref(false);
const arrErrors = {
  brand: { error: "" },
  image: { error: "" },
};

const variantCount = ref<number[]>([]);

const allVariants = ref<Variant[]>([]);
const prodImages = ref([] as string[]);

const selectCategory = (category: any, index: number) => {
  selectedCategory.value = category;
  selectedCategories.value[index] = category;
  isCategoryOpen.value = "";
};

const searchCategories = (value: string) => {
  catalogStore.filterLinkedCategories(value);
};
const seachBrands = (value: string) => {
  brandsStore.searchBrands(value);
};
const selectSubCategory = (subCategory: any, index: number) => {
  selectedSubCategory.value = subCategory;
  selectedSubCategories.value[index] = subCategory;
  isSubCategoryOpen.value = "";
};

const toggleSubCategory = (index: number) => {
  if (isSubCategoryOpen.value === index) {
    isSubCategoryOpen.value = null;
  } else {
    isSubCategoryOpen.value = index;
  }
};

const addCategoryCount = () => {
  let value = 0;
  value++;
  selectedCategories.value.push(null);
  for (let i = 0; i < value; i++) {
    categoryCount.value.push(i);
  }
};
const addSubDirCount = () => {
  let value = 0;
  value++;

  for (let i = 0; i < value; i++) {
    subDirCount.value.push(i);
  }
};
const targetSizeBytes = 150 * 1024;

const checkImgCompression = async (event: any) => {
  const value = event.target.files[0];
  const options = {
    maxSizeMB: 0.1465,
    useWebWorker: true,
  };
  let compressedFile = value;
  if (value?.size > targetSizeBytes) {
    try {
      compressedFile = await imageCompression(value, options);
      console.log("Original file size:", (value.size / 1024).toFixed(2), "KB");
      console.log(
        "Compressed file size:",
        (compressedFile.size / 1024).toFixed(2),
        "KB",
      );
    } catch (error) {
      console.error("Compression error:", error);
    }
  }
  return compressedFile;
};

const uploadImage = async (event: any) => {
  arrErrors.image.error = "";
  isImageLoading.value = await true;
  const result = await checkImgCompression(event);
  if (result?.size > targetSizeBytes) {
    arrErrors.image.error = "Размер слишком большой";
  }
  if (result && result !== undefined) {
    isImageLoading.value = await false;
    const base64StringNewImage = (await useConvertToBase64(
      result,
    )) as unknown as string;
    prodImages.value = [base64StringNewImage];
    arrErrors.image.error = "";
  }
  console.log("prodImages", prodImages);
};

const handleImage = async (event: any, index: number) => {
  allVariants.value[index].loading = true;
  const result = await checkImgCompression(event);
  console.log("what is aresult??", result);
  if (result.size > targetSizeBytes) {
    allVariants.value[index].error = "Размер слишком большой";
    allVariants.value[index].loading = false;
  } else if (result.size < targetSizeBytes && result && result !== undefined) {
    allVariants.value[index].loading = false;
    const base64StringNewImage = (await useConvertToBase64(
      result,
    )) as unknown as string;
    allVariants.value[index].image = base64StringNewImage as unknown as string;
  }
};

const addVariantCount = () => {
  const newIndex = variantCount.value.length;
  variantCount.value.push(newIndex);
  allVariants.value.push({ size: "", price: 0, code: 0, base: "", image: "" });
};

const toggleDropdown = (item: number) => {
  if (isCategoryOpen.value === item) {
    isCategoryOpen.value = "";
  } else {
    isCategoryOpen.value = item;
  }
};

const selectBrand = (item: Brands) => {
  selectedBrand.value = item;
  isBrandOpen.value = false;
  arrErrors.brand.error = "";
};
const { handleValues } = useInputValidation();

const fields = ref<Fields>({
  nameKg: { value: "", error: "", type: "string", field: "Название (кырг)" },
  nameRu: { value: "", error: "", type: "string", field: "Название" },
  shortDescriptionRu: { value: "", field: "Короткое описание" },
  shortDescriptionKg: { value: "", field: "Короткое описание (кырг)" },
  price: { value: "", error: "", type: "number", field: "Цена" },
  size: { value: "", error: "", type: "string", field: "Размер" },
  consumption: { value: "", field: "Расход" },
  dryingTime: { value: "", field: "Высыхание" },

  colorType: { value: "", error: "", type: "number", field: "Цвет" },
  descriptionRu: { value: "", field: "Описание" },
  descriptionKg: { value: "", field: "Описание (кырг)" },
  code: { value: "", error: "", type: "number", field: "Код" },
  isPopular: false,
  isFeatured: false,
  isBeneficial: false,
  subdirectoryId: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
  brandId: "",
  images: [""],
  categoryIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
  variants: allVariants.value,
});

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
  function allFieldsHaveValues(obj: any) {
    return Object.values(obj).every(
      (value) => value !== "" && value !== null && value !== undefined,
    );
  }
  const subCategories = selectedSubCategories?.value
    ?.filter(Boolean)
    ?.map((item) => item?.id);
  const filteredVariants = allVariants.value?.filter((obj) =>
    allFieldsHaveValues(obj),
  );

  const remaining = {
    isPopular: isPopular?.value,
    isFeatured: false,
    isBeneficial: false,
    subdirectoryId: subCategories || null,
    brandId: selectedBrand?.value?.id,
    images: prodImages?.value,
    categoryIds: categories,
    variants: filteredVariants,

    extension:'png'
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
  for (const fieldName in inputs.value) {
    if (Object.prototype.hasOwnProperty.call(inputs.value, fieldName)) {
      const fieldType = inputs.value[fieldName].type;
      handleValues(inputs.value, fieldName, fieldType);
    }
  }
  const hasError = Object.values(inputs.value).some(
    (input) => input.error !== "",
  );

  if (!selectedBrand?.value?.id) {
    arrErrors.brand.error = "Это поле обязательно";
  }
  if (!prodImages?.value?.length) {
    arrErrors.image.error = "Это поле обязательно";
  } else if (!hasError && prodImages?.value?.length && selectedBrand?.value) {
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

console.log("inputs", inputs);
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
