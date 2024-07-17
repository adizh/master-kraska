import http from "@/composables/http";
import { Product } from "@/types/Product";

export const useProductsSstore = defineStore("productsStore", {
  state: () => ({
    allProducts: [] as Product[],
    specialProducts: [] as Product[],
    filteredProducts: [] as Product[],
    popularProds: [] as Product[],
    beneficialProds: [] as Product[],
    noBrands: false,
    filterProductTotal: {
      totalPages: 0,
      totalItems: 0,
    },
    isProductBookmarked: false,
    areFiltersLoading: true,
    areProdsReceived: false,
    product: {} as { product: Product; similarProducts: Product[] },
    filters: {
      search: "",
      categoryId: [] as string[],
      subdirectoryIds: [] as any,
      minPrice: 0,
      maxPrice: 0,
      brandId: [] as string[],
      currentPage: 1,
      pageSize: 20,
    },
  }),
  actions: {
    async fetchAllProducts() {
      try {
        const response = await http("/api/v1/Product/get-all-products");
        console.log("response fetchAllProducts", response);
        const authStore = useAuthStore();
        if (response.status === 200) {
          const filtered = response.data.map((item: Product) => {
            if (authStore.getSelectedLang === "kg") {
              return {
                ...item,
                name: item?.nameKg,
                shortDescription: item?.shortDescriptionKg,
              };
            } else {
              return {
                ...item,
                name: item?.nameRu,
                shortDescription: item?.shortDescriptionRu,
              };
            }
          });
          this.allProducts = filtered;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async fetchSpecialProd(type: string) {
      const authStore = useAuthStore();
      try {
        const response = await http(
          `/api/v1/Product/get-popular-products?type=${type}`,
        );

        if (response.status === 200) {
          if (type === "popular") {
            this.popularProds = response.data?.popular?.map(
              (popItem: Product) => {
                if (authStore.getSelectedLang === "kg") {
                  return {
                    ...popItem,
                    name: popItem?.nameKg,
                    shortDescription: popItem?.shortDescriptionKg,
                  };
                } else {
                  return {
                    ...popItem,
                    name: popItem?.nameRu,
                    shortDescription: popItem?.shortDescriptionRu,
                  };
                }
              },
            );
          } else if (type === "featured") {
            this.specialProducts = response.data?.featured?.map(
              (popItem: Product) => {
                if (authStore.getSelectedLang === "kg") {
                  return {
                    ...popItem,
                    name: popItem?.nameKg,
                    shortDescription: popItem?.shortDescriptionKg,
                  };
                } else {
                  return {
                    ...popItem,
                    name: popItem?.nameRu,
                    shortDescription: popItem?.shortDescriptionRu,
                  };
                }
              },
            );
          } else {
            this.beneficialProds = response.data?.beneficial?.map(
              (popItem: Product) => {
                if (authStore.getSelectedLang === "kg") {
                  return {
                    ...popItem,
                    name: popItem?.nameKg,
                    shortDescription: popItem?.shortDescriptionKg,
                  };
                } else {
                  return {
                    ...popItem,
                    name: popItem?.nameRu,
                    shortDescription: popItem?.shortDescriptionRu,
                  };
                }
              },
            );
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    async fetchProductById(productId: string) {
      const authStore = useAuthStore();
      try {
        const response = await http(
          `/api/v1/Product/get-product-by-id/${productId}`,
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
                description: response.data?.product?.descriptionKg.replace(
                  /<(\/?(p|br|h[1-5]|strong|img|a|div|span|li|ul|ol)( [^>]*)?)\/?>/g,
                  "",
                ),
              },
              similarProducts: response.data.similarProducts?.map(
                (similar: Product) => ({
                  ...similar,
                  shortDescription: similar.shortDescriptionKg,
                  name: similar?.nameKg,
                }),
              ),
            };
          } else {
            filtered = await {
              ...response.data,
              product: {
                ...response.data.product,
                name: response.data?.product?.nameRu,
                shortDescription: response.data?.product?.shortDescriptionRu,
                description: response.data?.product?.descriptionRu?.replace(
                  /<(\/?(p|br|h[1-5]|strong|img|a|div|span|li|ul|ol)( [^>]*)?)\/?>/g,
                  "",
                ),
              },
              similarProducts: response.data.similarProducts?.map(
                (similar: Product) => ({
                  ...similar,
                  shortDescription: similar.shortDescriptionRu,
                  name: similar?.nameRu,
                }),
              ),
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
              objectId,
            },
          },
        );
        if (response.status === 200) {
          useNotifLocal("success", "updated", "success");
        }
      } catch (err) {
        console.log(err);
      }
    },

    setPrices(minPrice: number, maxPrice: number) {
      this.filters.minPrice = minPrice;
      this.filters.maxPrice = maxPrice;
    },
    setTypeOfWork(value: any) {
      if (value === null) {
        this.filters.subdirectoryIds = [];
      } else {
        this.filters.subdirectoryIds.push(value[0]);
      }
    },
    setSubDirectories(value: any) {
      if (value === null) {
        this.filters.subdirectoryIds = [];
      } else {
        const ids = value.map((item: any) => item?.id);
        this.filters.subdirectoryIds = [...ids];
      }
    },
    setCurrentPage(page: number) {
      this.filters.currentPage = page;
    },
    async filterProducts(prodName?: string) {
      this.areFiltersLoading = true;
      const subDirs =
        this.filters.subdirectoryIds?.length > 0
          ? this.filters.subdirectoryIds.join(",")
          : null;
      const allBrands =
        this.filters?.brandId?.length > 0
          ? this.filters.brandId.join(",")
          : null;
      const categoriesId =
        this.filters?.categoryId?.length > 0
          ? this.filters.categoryId.join(",")
          : null;
      const name = prodName || this.filters.search || "";
      const query = {
        productName: name || null,
        categoriesId,
        subdirectoryIds: subDirs,
        minPrice: this.filters.minPrice || null,
        maxPrice: this.filters.maxPrice || null,
        brandId: allBrands,
        page: this.filters.currentPage,
        pageSize: this.filters.pageSize,
        colorType: null,
      };
      console.log("query", query);

      const authStore = useAuthStore();
      try {
        const response = await http.get(
          "/api/v1/Product/get-all-products-pagination",
          { params: query },
        );
        console.log("response filterProducts", response);
        if (response.status === 200) {
          this.areProdsReceived = true;
          this.filterProductTotal.totalItems = response.data.totalItems;
          this.filterProductTotal.totalPages = response.data.totalPages;
          this.noBrands = response.data.noBrand;
          const filtered = response.data.items?.map((item: Product) => {
            if (authStore.getSelectedLang === "kg") {
              return {
                ...item,
                name: item?.nameKg,
                shortDescription: item?.shortDescriptionKg,
              };
            } else {
              return {
                ...item,
                name: item?.nameRu,
                shortDescription: item?.shortDescriptionRu,
              };
            }
          });

          this.filteredProducts = filtered;


         
         
          setTimeout(() => {
            this.areFiltersLoading = false;
          }, 1000);
        }
      } catch (err) {
        this.areFiltersLoading = false;
      }
    },

    setCategoryId(categoryId: string) {
      this.filters.categoryId.push(categoryId);
      this.filterProducts();
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

        if (response.status === 200) {
          this.isProductBookmarked = response.data.message;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async deleteProduct(product: Product) {
      try {
        const response = await http.delete(
          `/api/v1/Product/delete-product-by-id/${product?.id}`,
        );
        if (response.status === 200) {
          console.log("response delete product", response);
          useNotif("success", "Продукт удален!", "Успешно");
        }
      } catch (err) {
        console.log(err);

        useNotif("error", "Ошибка при удалении продукта", "Ошибка");
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
    getProdTotal(state) {
      return state.filterProductTotal;
    },
    getLoadingState(state) {
      return state.areFiltersLoading;
    },
    getPopularProducts(state) {
      return state.popularProds;
    },
    getSpecialProducts(state) {
      return state.specialProducts;
    },
    getBenefProducts(state) {
      return state.beneficialProds;
    },
    getNoBrands(state) {
      return state.noBrands;
    },
  },
});
