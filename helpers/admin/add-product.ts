import { Brands } from "~/types/Brands";
import { CategorySys } from "~/types/Category";
import { Variant } from "~/types/Variant";


const isSubCategoryOpen = ref();
const categoryCount = ref([] as number[]);
const subDirCount = ref([] as number[]);
const isImageLoading = ref(false);
const selectedCategories = ref([] as any[]);
const selectedSubCategories = ref([] as any[]);
const selectedBrand = ref({} as Brands);
const isBrandOpen = ref(false);

const isSubcategorySelect = ref(false);
const selectedCategory = ref({} as CategorySys);
const isCategorySelected = ref(false);
const allSelectedSubcategories = ref([] as CategorySys[]);
const selectedSubCategory = ref({} as CategorySys);
const isPopular = ref(false);
const arrErrors = {
  image: { error: "" }
};

const variantCount = ref<number[]>([]);
const allVariants = ref<Variant[]>([]);
const prodImages = ref([] as string[]);

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

const chooseSubCategories = (item: CategorySys) => {
  const index = allSelectedSubcategories.value.findIndex(
    (subcategory) => subcategory.id === item?.id
  );
  if (index === -1) {
    allSelectedSubcategories.value.push(item);
  } else {
    allSelectedSubcategories.value.splice(index, 1);
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
};
const fields = ref<Fields>({
  nameKg: { value: "", error: "", type: "string", field: "Название (кырг)" },
  nameRu: { value: "", error: "", type: "string", field: "Название" },
  shortDescriptionRu: { value: "", field: "Короткое описание" },
  shortDescriptionKg: { value: "", field: "Короткое описание (кырг)" },
  price: { value: "", error: "", type: "number", field: "Цена" },
  size: { value: "", error: "", type: "string", field: "Размер" },
  consumption: { value: "", field: "Расход" },
  dryingTime: { value: "", field: "Высыхание" },

  colorType: { value: "", type: "number", field: "Цвет" },
  descriptionRu: { value: "", field: "Описание" },
  descriptionKg: { value: "", field: "Описание (кырг)" },
  code: { value: "", type: "number", field: "Код" },
  isPopular: false,
  isFeatured: false,
  isBeneficial: false,
  subdirectoryId: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
  brandId: "",
  images: [""],
  categoryIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
  variants: allVariants.value
});

export {

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
  selectedSubCategory,
  isPopular,
  arrErrors,
  variantCount,
  allVariants,
  prodImages,
  isCategoryOpen,
  type Input,
  type Fields,
  selectSubCategory,
  toggleSubCategory,
  chooseSubCategories,
  addCategoryCount,
  addSubDirCount,
  addVariantCount,
  toggleDropdown,
  selectBrand,
  fields,

};
