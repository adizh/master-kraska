import http from "@/composables/http";
import { Product, ExtendedProduct } from "@/types/Product";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    cart: [] as ExtendedProduct[],
    countToBuy: 1,
  }),
  actions: {
    addToCart(prod: ExtendedProduct) {
      this.cart.push(prod);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    updateCartItem(updatedItem: ExtendedProduct) {
      const index = this.cart.findIndex((item) => item.id === updatedItem.id);
      if (index > -1) {
        this.cart.splice(index, 1, updatedItem);
      }
    },
    decreaseCount(item: ExtendedProduct) {
      if (item.count > 1) {
        const updatedItem = { ...item };
        updatedItem.count--;
        updatedItem.totalProdSum = updatedItem.count * updatedItem.price;
        this.updateCartItem(updatedItem);
      }
    },

    getTotalItemCount(count: number) {
      console.log("count ingetTotalItemCount", count);
      this.countToBuy = count;
      return this.countToBuy;
    },

    increaseCount(item: ExtendedProduct) {
      const updatedItem = { ...item };
      updatedItem.count++;
      updatedItem.totalProdSum = updatedItem.count * updatedItem.price;
      this.updateCartItem(updatedItem);
    },

    removeFromCart(item: ExtendedProduct) {
      this.cart = this.cart.filter((value) => value.id !== item.id);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    saveNewCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
  getters: {
    getAllCart(state) {
      if (process.client) {
        let items = localStorage.getItem("cart");
        if (items) {
          state.cart = JSON.parse(items);
        }
      }
      return state.cart;
    },

    numberOfProds(state) {
      return state.cart?.length;
    },

    totalOfTotalSum(state) {
      return state.cart.reduce(
        (acc: number, item: ExtendedProduct) => acc + item.totalProdSum,
        0
      );
    },
  },
});
