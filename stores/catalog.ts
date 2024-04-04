import { AllCatalog } from "~/types/Catalog";
export const useCatalogStore = defineStore("catalogStore", {
  state: () => ({
    allCatalogs: [] as AllCatalog[],
  }),
  actions: {
    async fetchAllCatalogs() {
      try {
        const response = await http("/api/v1/Helpers/get-all-catalogs");
        console.log(response, "response get All catalogs");
        if (response.status === 200) {
          this.allCatalogs = response.data;
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
  },
  getters: {
    getAllCatalogs(state) {
      return state.allCatalogs;
    },
  },
});
