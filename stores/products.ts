import http from "@/composables/http";
import { Product } from "@/types/Product";
import { Brands } from "@/types/Brands";

import { Category } from "@/types/Category";

export const useProductsSstore = defineStore("productsStore", {
  state: () => ({
    allProducts: [] as Product[],
    filteredProducts: [] as Product[],
    isProductBookmarked: false,
    product: {} as { product: Product; similarProducts: Product[] },
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
      minPrice: 0,
      maxPrice: 0,
      brandId: [] as string[],
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

    async fetchProductById(productId: string) {
      console.log("productId is reviev????", productId);
      const authStore = useAuthStore();
      try {
        const response = await http(
          `/api/v1/Product/get-product-by-id/${productId}`
        );
        if (response.status === 200) {
          let filtered = [];

          if (authStore.getSelectedLang === "kg") {
            filtered = await {
              ...response.data,
              product: {
                ...response.data.product,
                name: response.data?.product?.nameKg,
                shortDescription: response.data?.product?.shortDescriptionKg,
                description: response.data?.product?.descriptionKg,
              },
            };
          } else {
            filtered = await {
              ...response.data,
              product: {
                ...response.data.product,
                name: response.data?.product?.nameKg,
                shortDescription: response.data?.product?.shortDescriptionRu,
                description: response.data?.product?.descriptionRu,
              },
            };
          }

          this.product = filtered;
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
      console.log("setBoolParams query", query);
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
    setPrices(minPrice: number, maxPrice: number) {
      this.filters.minPrice = minPrice;
      this.filters.maxPrice = maxPrice;
    },
    setTypeOfWork(value: any) {
      if (value === null) {
        this.filters.subdirectoryIds = [];
      } else {
        console.log("value set Sub dirs", value);
        const ids = value.map((item: any) => item?.id);
        this.filters.subdirectoryIds.push(value[0]);
      }
    },
    setSubDirectories(value: any) {
      if (value === null) {
        this.filters.subdirectoryIds = [];
      } else {
        console.log("value set Sub dirs", value);
        const ids = value.map((item: any) => item?.id);
        this.filters.subdirectoryIds = [...ids];
      }
    },
    async filterProducts(prodName?: string) {
      const subDirs =
        this.filters.subdirectoryIds?.length > 0
          ? this.filters.subdirectoryIds?.join(",")
          : null;

      const allBrands =
        this.filters?.brandId?.length > 0
          ? this.filters.brandId?.join(",")
          : null;

      const query = {
        productName: this.filters.search || prodName,
        categoryId: this.filters.categoryId,
        subdirectoryIds: subDirs,
        fastDrying: this.filters.fastDrying,
        approvedByThePaintQualityAssociation:
          this.filters.approvedByThePaintQualityAssociation,
        withoutSmell: this.filters.withoutSmell,
        washableCoating: this.filters.washableCoating,
        weatherResistantCoating: this.filters.weatherResistantCoating,
        wearResistantCoating: this.filters.wearResistantCoating,
        dirtAndWaterRepellentCoating: this.filters.dirtAndWaterRepellentCoating,
        minPrice: this.filters.minPrice,
        maxPrice: this.filters.maxPrice,
        brandId: allBrands,
      };
      const authStore = useAuthStore();
      try {
        const response = await http.get(
          "/api/v1/Product/get-all-products-pagination",
          { params: query }
        );
        console.log("response filterProducts", response);
        if (response.status === 200) {
          const filtered = response.data.items?.map((item: Product) => {
            if (authStore.getSelectedLang === "kg") {
              return { ...item, name: item?.nameKg };
            } else {
              return { ...item, name: item?.nameRu };
            }
          });

          this.filteredProducts = filtered;
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
    getProduct(state) {
      return state.product;
    },
  },
});
