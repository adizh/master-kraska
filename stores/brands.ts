import { Brands, Seller } from "~/types/Brands";

export const useBrandsStore = defineStore("brandsStore", {
  state: () => ({
    brands: [] as Brands[],
    allBrands: [] as Brands[],
    sellers: [] as Seller[],
    brand: {} as Brands,
  }),

  actions: {
    
    async fetchAllBrands() {
      try {
        const response = await http("/api/v1/Brand/get-all-brands");

        if (response.status === 200) {
          this.brands = response.data;
          this.allBrands = response.data;
          console.log('all brands???',response.data);
      


        }
      } catch (err) {
        console.log(err);
      }
    },

    async fetchAllSellers() {
      const authStore = useAuthStore();
      try {
        const response = await http("/api/v1/Seller/get-all-sellers");
        if (response.status === 200) {
          const filtered = response.data.map((seller: Seller) => {
            if (authStore.getSelectedLang === "ru") {
              return { ...seller, sellerInfo: seller?.descriptionRu };
            } else {
              return { ...seller, sellerInfo: seller?.descriptionKg };
            }
          });
          this.sellers = filtered;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async fetchAllBrandId(brandId: string) {
      try {
        const response = await http(`/api/v1/Brand/get-brand/${brandId}`);

        if (response.status === 200) {
          this.brand = response.data;
          return response.data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    searchBrands(value: string) {
      this.brands = this.allBrands.filter((brand) =>
        brand?.name?.toLowerCase()?.includes(value?.toLowerCase()),
      );
    },

  },
  getters: {
    getAllBrands(state) {
      return state.brands;
    },
    getAllSellers(state) {
      return state.sellers;
    },
    getBrand(state) {
      return state.brand;
    },
  },
});
