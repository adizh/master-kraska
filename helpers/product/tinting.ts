import { Tinting } from "~/types/Tinting";

const currentPage = ref(1);
const totalPages = ref(1);
const tintingSearch = ref("");
const selectedColor =ref('')
const tingintByBrands = ref([] as Tinting[]);

const selectColor =(colorCode:string)=>{
    selectedColor.value=colorCode
}

export { currentPage, totalPages, tingintByBrands, tintingSearch ,selectedColor,selectColor};
