import { Category, CategorySys } from "~/types/Category";

const defaultText = "Выберите категорию";
const isSubcategoryOpen = ref(false);
const subCategory = ref("");
const subCategoryKg = ref("");
const selectedCategoryId = ref({} as CategorySys);



export {
  isSubcategoryOpen,
  subCategory,
  subCategoryKg,
  selectedCategoryId,

  defaultText
};
