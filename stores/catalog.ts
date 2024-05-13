import { AllCatalog } from "~/types/Catalog";
import { Category, CategorySys } from "~/types/Category";
export const useCatalogStore = defineStore("catalogStore", {
  state: () => ({
    allCatalogs: [] as AllCatalog[],
    allCategories: [] as Category[],
    linkedCategories: [] as CategorySys[],
    allLinkedCategories: [] as CategorySys[],
    category: [] as Category[]
  }),
  actions: {
    async fetchAllCatalogs () {
      const authStore = useAuthStore();
      try {
        const response = await http("/api/v1/Helpers/get-all-catalogs");
        console.log(response, "response get All catalogs");
        if (response.status === 200) {
          const filteredCatalogByLang = response.data.map(
            (item: AllCatalog) => {
              const subdirectory = item.subdirectory.map((subItem: any) => {
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
        }
      } catch (err) {
        console.log(err);
      }
    },

    async fetchAllCategoriesLinked(){
      try {
        const response = await http("/api/v1/Category/get-all-categories");
        console.log("response all categories", response);
        if (response.status === 200) {
          this.linkedCategories = response.data
          this.allLinkedCategories = response.data
        }
      } catch (err) {
        console.log(err);
      }
    },
    filterLinkedCategories(value:string){
      console.log('allLinkedCategories',this.allLinkedCategories)
      this.linkedCategories = this.allLinkedCategories.filter((item:CategorySys)=>item?.nameRu?.toLowerCase().includes(value?.toLowerCase()));
      console.log('value',value)
      console.log('linkedCategories',this.linkedCategories)
    },
    async fetchCategoryById (categoryId: string) {
      const authStore = useAuthStore();
      try {
        const response = await http(
          `/api/v1/Category/get-top-category-by-id?id=${categoryId}`
        );
        if (response.status === 200) {
          console.log("respons get top category byif", response);
          const filtered = response.data.map((item: Category) => {
            if (authStore?.getSelectedLang === "kg") {
              return {
                ...item,
                category: { ...item?.category, name: item?.category?.nameKg },
                subcategories: response.data[0].subcategories?.map(
                  (subItem: CategorySys) => ({
                    ...subItem,
                    name: subItem?.nameKg
                  })
                )
              };
            } else {
              return {
                ...item,
                category: { ...item?.category, name: item?.category?.nameRu },
                subcategories: response.data[0].subcategories?.map(
                  (subItem: CategorySys) => ({
                    ...subItem,
                    name: subItem?.nameRu
                  })
                )
              };
            }
          });

          this.category = filtered;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async getCatalogId (cagalogId: string) {
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

    async fetchSubCatalogs (catalogId: string) {
      try {
        const response = await http(
          `/api/v1/Helpers/get-all-subdirectories-by-directoryId?id=${catalogId}`
        );
        console.log("response fetchSubCatalogs", response);
        // return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async fetchAllCategories () {
      const authStore = useAuthStore();
      try {
        const response = await http("/api/v1/Category/get-all-top-categories");
        console.log("response all categories", response);
        if (response.status === 200) {
          const filtered = response.data.map((item: Category) => {
            if (authStore.getSelectedLang === "kg") {
              return {
                ...item,
                category: { ...item?.category, name: item?.category?.nameKg }
              };
            } else {
              return {
                ...item,
                category: { ...item?.category, name: item?.category?.nameRu }
              };
            }
          });
          this.allCategories = filtered;
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  getters: {
    getAllCatalogs (state) {
      return state.allCatalogs;
    },
    getAllCategories (state) {
      return state.allCategories;
    },
    getCategory (state) {
      return state.category;
    },
    getLinkedCategories(state){
      return state.linkedCategories
    }
  }
});
