import http from "@/composables/http";
import { Product } from "@/types/Product";

import { Category } from "@/types/Category";
//const toast = useToast();

export const useProductsSstore = defineStore("productsStore", {
  state: () => ({
    allProducts: [] as Product[],
    filteredProducts: [] as Product[],
    isProductBookmarked: false,
    filters: {
      search: "",
      categoryId: "",
      subdirectoryIds: [] as any,
      fastDrying: false,
      approvedByThePaintQualityAssociation: false,
      withoutSmell: false,
      washableCoating: false,
      weatherResistantCoating: false,
      wearResistantCoating: false,
      dirtAndWaterRepellentCoating: false,
    },
  }),
  actions: {
    async fetchAllProducts() {
      try {
        const response = await http("/api/v1/Product/get-all-products");
        console.log("response fetchAllProducts", response);
        if (response.status === 200) {
          this.allProducts = response.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async addToBookmarks(objectId: string) {
      const authStore = useAuthStore();
      try {
        const response = await http.post(
          "/api/v1/Bookmark/set-bookmarks",
          {},
          {
            params: {
              userId: authStore.getUserId,
              objectId: objectId,
            },
          }
        );
        console.log("respponse", response);
        if (response.status === 200) {
          // toast.add({
          //   severity: "success",
          //   summary: "Успех",
          //   detail: "Добавленов в Избранное",
          // });
        }
      } catch (err) {
        console.log(err);
      }
    },

    setBoolParams(query: any) {
      this.filters.fastDrying = query.fastDrying;
      this.filters.approvedByThePaintQualityAssociation =
        query.approvedByThePaintQualityAssociation;
      this.filters.withoutSmell = query.withoutSmell;
      this.filters.washableCoating = query.washableCoating;
      this.filters.weatherResistantCoating = query.weatherResistantCoating;
      this.filters.dirtAndWaterRepellentCoating =
        query.dirtAndWaterRepellentCoating;
      this.filters.wearResistantCoating = query.wearResistantCoating;
    },
    setSubDirectories(item: { id: string; value: boolean } | null) {
      if (item) {
        this.filters.subdirectoryIds.push(item?.id);
      } else {
        this.filters.subdirectoryIds = null;
      }

      console.log("this.filters.subdirectoryIds", this.filters.subdirectoryIds);
    },
    async filterProducts() {
      const query = {
        productName: this.filters.search,
        categoryId: this.filters.categoryId,
        subdirectoryIds: this.filters.subdirectoryIds?.join(",") || null,

        fastDrying: this.filters.fastDrying,
        approvedByThePaintQualityAssociation:
          this.filters.approvedByThePaintQualityAssociation,
        withoutSmell: this.filters.withoutSmell,
        washableCoating: this.filters.washableCoating,
        weatherResistantCoating: this.filters.weatherResistantCoating,
        wearResistantCoating: this.filters.wearResistantCoating,
        dirtAndWaterRepellentCoating: this.filters.dirtAndWaterRepellentCoating,
      };

      try {
        const response = await http.get(
          "/api/v1/Product/get-all-products-pagination",
          { params: query }
        );
        console.log("response filterProducts", response);
        if (response.status === 200) {
          this.filteredProducts = response.data.items;
        }
      } catch (err) {
        console.log(err);
      }
    },
    setCategoryId(categoryId: string) {
      this.filters.categoryId = categoryId;
    },

    async getBookmarks(productId: string) {
      const authStore = useAuthStore();

      try {
        const response = await http("/api/v1/Bookmark/get-bookmarks", {
          params: {
            userId: authStore.getUserId,
            objectId: productId,
          },
        });

        console.log(" response getBookmarks", response);
        if (response.status === 200) {
          this.isProductBookmarked = response.data.message;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
    getAllProducsts(state) {
      return state.allProducts;
    },
    getFilteredProducts(state) {
      return state.filteredProducts;
    },
    getProductBookmarked(state) {
      return state.isProductBookmarked;
    },
  },
});
