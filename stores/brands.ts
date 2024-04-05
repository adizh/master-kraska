import { Brands } from "~/types/Brands";

export const useBrandsStore = defineStore("brandsStore", {
  state: () => ({
    brands: [] as Brands[],
  }),
  actions: {
    async fetchAllBrands() {
      try {
        const response = await http("/api/v1/Brand/get-all-brands");
        console.log("response brands", response);
        if (response.status === 200) {
          this.brands = response.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
    getAllBrands(state) {
      return state.brands;
    },
  },
});
