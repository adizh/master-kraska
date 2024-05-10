import { ExtendedProduct } from '@/types/Product';
import { OrderItem } from '~/types/Order';

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cart: [] as ExtendedProduct[],
    countToBuy: 1,
    currentOrder: {} as OrderItem
  }),
  actions: {
    addToCart (prod: ExtendedProduct) {
      const prodIndex = this.cart.findIndex(el => el?.id === prod?.id);

      if (prodIndex === -1) {
        this.cart.push(prod);
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    },

    updateCartItem (updatedItem: ExtendedProduct) {
      const index = this.cart.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        this.cart.splice(index, 1, updatedItem);
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    },
    decreaseCount (item: ExtendedProduct) {
      if (item.count > 1) {
        const updatedItem = { ...item };
        updatedItem.count--;
        updatedItem.totalProdSum = updatedItem.count * updatedItem.initPrice;

        console.log('decreaseCount updatedItem', updatedItem);
        this.updateCartItem(updatedItem);
      }
    },

    getTotalItemCount (count: number) {
      this.countToBuy = count;

      return count;
    },

    increaseCount (item: ExtendedProduct) {
      const updatedItem = { ...item };
      updatedItem.count++;
      updatedItem.totalProdSum = updatedItem.count * updatedItem.initPrice;
      this.updateCartItem(updatedItem);
    },

    removeFromCart (item: ExtendedProduct) {
      this.cart = this.cart.filter(value => value.id !== item.id);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    saveNewCart () {
      localStorage.setItem('cart', JSON.stringify(this.cart));
      useNotif('success', 'Изменения сохранены', 'Успешно');
    },

    setCurrentOrder (item: OrderItem) {
      this.currentOrder = item;
    }
  },
  getters: {
    getAllCart (state) {
      if (process.client) {
        const items = localStorage.getItem('cart');
        if (items) {
          state.cart = JSON.parse(items);
        }
      }
      return state.cart;
    },
    getCurrentOrder (state) {
      return state.currentOrder;
    },

    numberOfProds (state) {
      return state.cart?.length;
    },

    totalOfTotalSum (state) {
      return state.cart.reduce(
        (acc: number, item: ExtendedProduct) => acc + item.totalProdSum,
        0
      );
    }
  }
});
