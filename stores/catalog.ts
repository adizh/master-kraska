import { AllCatalog, SubDirHelper } from "~/types/Catalog";
import { Category, CategorySys } from "~/types/Category";
export const useCatalogStore = defineStore("catalogStore", {
  state: () => ({
    allCatalogs: [] as AllCatalog[],
    allCategories: [] as Category[],
    linkedCategories: [] as CategorySys[],
    allLinkedCategories: [] as CategorySys[],
    category: [] as Category[],
    allHelpersSubDir: [] as SubDirHelper[],
    allHelpersSubDirFilter: [] as SubDirHelper[],
    linkedCategory: {} as CategorySys,
    topCategories: [] as CategorySys[],
    allTopCategories: [] as CategorySys[],
    filteredSubcategories: [] as CategorySys[]
  }),
  actions: {
    async fetchAllCatalogs () {
      const authStore = useAuthStore();
      try {
        const response = await http("/api/v1/Helpers/get-all-catalogs");
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

    async fetchAllCategoriesLinked () {
      try {
        const response = await http("/api/v1/Category/get-all-categories");

        if (response.status === 200) {
          this.linkedCategories = response.data;
          this.allLinkedCategories = response.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    filterLinkedCategories (value: string) {
      console.log("allLinkedCategories", this.allLinkedCategories);
      this.linkedCategories = this.allLinkedCategories.filter(
        (item: CategorySys) =>
          item?.nameRu?.toLowerCase().includes(value?.toLowerCase())
      );
      console.log("value", value);
      console.log("linkedCategories", this.linkedCategories);
    },
    async fetchLinkedCategoryById (parentId: string) {
      try {
        const response = await http(
          `/api/v1/Category/get-category/${parentId}`
        );
        if (response.status === 200) {
          this.linkedCategory = response.data;
        }
      } catch (err) {
        console.log(err);
      }
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
          this.filteredSubcategories = this.category[0].subcategories;
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
      } catch (err) {
        console.log(err);
      }
    },

    async fetchAllCategories () {
      const authStore = useAuthStore();
      try {
        const response = await http("/api/v1/Category/get-all-top-categories");
        this.topCategories = response?.data?.map(
          (item: Category) => item?.category
        );
        this.allTopCategories = response?.data?.map(
          (item: Category) => item?.category
        );
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
    },

    async fetchCatalog (categoryId: string) {
      try {
        const response = await http(
          `/api/v1/Helpers/get-catalog/${categoryId}`
        );
        if (response.status === 200) {
          return response.data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    searchSubDirs (value: string) {
      this.allHelpersSubDir = this.allHelpersSubDirFilter.filter(
        (item) =>
          item?.nameRu?.toLowerCase().includes(value?.toLowerCase()) ||
          item?.category?.toLowerCase().includes(value?.toLowerCase())
      );
    },

    filterTopCategories (value: string) {
      this.topCategories = this.allTopCategories.filter((item) =>
        item?.nameRu?.toLowerCase().includes(value?.toLowerCase())
      );
    },
    
    async getHelpersSubDirs () {
      try {
        const response = await http("/api/v1/Helpers/get-all-subdirectories");
        if (response.status === 200) {
          const results = await Promise.all(
            response.data.map(async (helper: SubDirHelper) => {
              const result = await this.fetchCatalog(helper?.categoryId);
              return { ...helper, category: await result?.nameRu };
            })
          );

          this.allHelpersSubDir = results;
          this.allHelpersSubDirFilter = results;
          console.log("this.allHelpersSubDir", this.allHelpersSubDir);
        }
      } catch (error) {
        console.error("Error fetching helpers subdirectories:", error);
      }
    },
    filterSubcategoriesByCategory (value: string) {
      this.filteredSubcategories = this.category[0]?.subcategories?.filter(
        (item) => item?.nameRu?.toLowerCase()?.includes(value?.toLowerCase())
      );
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
    getLinkedCategories (state) {
      return state.linkedCategories;
    },
    getHelperSubDirs (state) {
      return state.allHelpersSubDir;
    },
    getLinkedCategory (state) {
      return state.linkedCategory;
    },
    getTopCategories (state) {
      return state.topCategories;
    },
    getFilteredSubcategories (state) {
      return state.filteredSubcategories;
    }
  }
});
