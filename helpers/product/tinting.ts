import { Brands } from "~/types/Brands";
import { Tinting } from "~/types/Tinting";

const currentPage = ref(1);
const totalPages = ref(1);
const allTingings = ref<Tinting[]>([]);
const currentBrandsColors = ref<Tinting[]>([]);
const tintingSearch = ref("");
const selectedColor = ref("");
const tingintByBrands = ref([] as Tinting[]);
const filteredBrands = ref<Brands[]>([]);
const selectedBrand = ref<Brands>({} as Brands);

const selectColor = (colorCode: string) => {
  selectedColor.value = colorCode;
};

export {
  currentPage,
  totalPages,
  tingintByBrands,
  tintingSearch,
  selectedColor,
  selectColor,
  allTingings,
  filteredBrands,
  selectedBrand,
  currentBrandsColors,
};
