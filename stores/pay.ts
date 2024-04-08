import http from "@/composables/http";

export const usePayStore = defineStore("payStore", {
  state: () => ({}),

  actions: {
    async iniPayment() {
      try {
        const response = http.post(
          `/api/v1/Payment/initiate-payment-mbank?orderNumber=1516984`
        );
      } catch (err) {
        console.log(err);
      }
    },

    async checkPayment(params: any, orderNumber: string) {
      console.log("checkpayment orderNumber", orderNumber);
      try {
        const response = await http.get(
          `/api/v1/Payment/check-payment-mega-mbank`,
          {
            params,
          }
        );
        console.log("check payment response", response);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
