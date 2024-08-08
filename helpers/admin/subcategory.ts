import { Category, CategorySys } from "~/types/Category";

const defaultText = "Выберите категорию";
const isSubcategoryOpen = ref(false);

const selectedCategoryId = ref({} as CategorySys);
const openSubCategories = ref(false);
const subCategory = ref("");
const subCategoryKg = ref("");
const selectedSubcategory = ref({} as CategorySys);
const defaultTextSubcategory = "Выберите подкатегорию";
const isDeleteSubcategoryOpen = ref(false);
const subCategoryFilter = ref("");
const selectSubCategory = (item: CategorySys) => {
  selectedSubcategory.value = item;
  isDeleteSubcategoryOpen.value = false;
};
export {
  isSubcategoryOpen,
  selectedCategoryId,
  selectedSubcategory,
  isDeleteSubcategoryOpen,
  defaultText,
  openSubCategories,
  defaultTextSubcategory,
  subCategoryFilter,
  selectSubCategory,
  subCategory,
  subCategoryKg
};
