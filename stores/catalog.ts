import { AllCatalog } from "~/types/Catalog";
import { Category } from "~/types/Category";
export const useCatalogStore = defineStore("catalogStore", {
  state: () => ({
    allCatalogs: [] as AllCatalog[],
    allCategories: [] as Category[],
  }),
  actions: {
    async fetchAllCatalogs() {
      const authStore = useAuthStore();
      try {
        const response = await http("/api/v1/Helpers/get-all-catalogs");
        console.log(response, "response get All catalogs");
        if (response.status === 200) {
          console.log(authStore.getSelectedLang, "authStore.getSelectedLang");
          const filteredCatalogByLang = response.data.map(
            (item: AllCatalog) => {
              let subdirectory = item.subdirectory.map((subItem: any) => {
                if (authStore.getSelectedLang === "kg") {
                  return { ...subItem, name: subItem?.nameKg };
                } else {
                  return { ...subItem, name: subItem?.nameRu };
                }
              });

              let itemName;
              if (authStore.getSelectedLang === "kg") {
                itemName = item.nameKg;
              } else {
                itemName = item.nameRu;
              }

              return { ...item, subdirectory, name: itemName };
            }
          );
          this.allCatalogs = filteredCatalogByLang;
          console.log("this.allCatalogs ", this.allCatalogs);
          console.log("filteredCatalogByLang", filteredCatalogByLang);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async getCatalogId(cagalogId: string) {
      try {
        const response = await http(`/api/v1/Helpers/get-catalog/${cagalogId}`);
        console.log("response getCatalogId", response);
        if (response.status === 200) {
          return response.data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async fetchSubCatalogs(catalogId: string) {
      try {
        const response = await http(
          `/api/v1/Helpers/get-all-subdirectories-by-directoryId?id=${catalogId}`
        );
        console.log("response fetchSubCatalogs", response);
        //return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async fetchAllCategories() {
      const authStore = useAuthStore();
      try {
        const response = await http("/api/v1/Category/get-all-top-categories");
        console.log("response all categories", response);
        if (response.status === 200) {
          const filtered = response.data.map((item: Category) => {
            if (authStore.getSelectedLang === "kg") {
              return {
                ...item,
                category: { ...item?.category, name: item?.category?.nameKg },
              };
            } else {
              return {
                ...item,
                category: { ...item?.category, name: item?.category?.nameKg },
              };
            }
          });

          this.allCategories = filtered;

          console.log(" this.allCategories in pinia", this.allCategories);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
    getAllCatalogs(state) {
      return state.allCatalogs;
    },
    getAllCategories(state) {
      return state.allCategories;
    },
  },
});
