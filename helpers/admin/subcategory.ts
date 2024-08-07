import { Category, CategorySys } from "~/types/Category";

const defaultText = "Выберите категорию";
const isSubcategoryOpen = ref(false);
const subCategory = ref("");
const subCategoryKg = ref("");
const selectedCategoryId = ref({} as CategorySys);

const selectCategory = (category: CategorySys) => {
  selectedCategoryId.value = category;
  isSubcategoryOpen.value = false;
};
export {
  isSubcategoryOpen,
  subCategory,
  subCategoryKg,
  selectedCategoryId,
  selectCategory,
  defaultText
};
