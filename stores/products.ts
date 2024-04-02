import http from "@/composables/http";
import { Product } from "@/types/Product";

//const toast = useToast();

export const useProductsSstore = defineStore("productsStore", {
  state: () => ({
    allProducts: [] as Product[],
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
  },
  getters: {
    getAllProducsts(state) {
      return state.allProducts;
    },
  },
});
