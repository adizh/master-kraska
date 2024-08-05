import http from "@/composables/http";

export const usePayStore = defineStore("payStore", {
  state: () => ({
    initMbankRes: {} as { quid: string },

    canExit: false,
    mbank: {
      otp: { value: "", error: "" },
      openConfirm: false,
      mbankPhone: { value: "", error: "" },
      status: "",
      payId: "",
      statusCode: "",
    },
    megapay: {
      otp: { value: "", error: "" },
      openConfirm: false,
      megaPhone: { value: "", error: "" },
      megaAccount: { value: "", error: "" },
      user: { value: "", error: "" },
      status: "",
      payId: "",
      statusCode: "",
    },
  }),

  actions: {
    setExit(value: boolean) {
      this.canExit = value;
    },
    clearError(field: "otp" | "mbankPhone") {
      this.mbank[field].error = "";
    },
    clearErrorMega(field: "otp" | "megaPhone" | "megaAccount" | "user") {
      this.megapay[field].error = "";
    },
    async checkPaymentStatus() {
      try {
        const response = await http(
          `/api/v1/Payment/get-status-payment?payId=${this.mbank?.payId}&paymentType=mbank`,
        );
        console.log("response check payment statys", response);
        if (response.data.code === "201" && response.data.data === "AWAIT") {
          this.mbank.statusCode = "201";
          return (this.mbank.status = "Платеж в обработке...");
        }
      } catch (err) {
        console.log(err);
      }
    },

    async checkPaymentStatusMega(payId: string) {
      try {
        const response = await http(
          `/api/v1/Payment/get-status-payment?payId=${payId}&paymentType=mega`,
        );
        console.log("response check payment statys MEGA", response);
        if (response.data.code === "201" && response.data.data === "AWAIT") {
          // this.mbank.statusCode = "201";
          // return (this.mbank.status = "Платеж в обработке...");
        } else if (response.data.code === "1") {
          useNotifLocal("error", "errOccurred", "error");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async confirmMbank() {
      try {
        const response = await http.post(
          `/api/v1/Payment/confirm-payment-mbank?quid=${this.initMbankRes.quid}&otp=${this.mbank.otp.value}`,
        );
        console.log("response confirm mbank payment", response);
        if (response.data.code === "120") {
          //  this.mbank.status = "MBank payment confirmed";
          return this.checkPaymentStatus();
        } else if (response.data.code === "124") {
          this.mbank.otp.error = "Неправильный код";
          return this.mbank.otp.error;
        }
        return response;
      } catch (err) {
        console.log(err);
      }
    },
    async iniPaymentMbank(params: any, orderNumber: string) {
      try {
        const body = {
          phone: params?.phone,
          amount: 1,
          comment: "",
        };
        const response = await http.post(
          `/api/v1/Payment/initiate-payment-mbank?orderNumber=${orderNumber}`,
          body,
        );
        console.log("response initpayment", response);
        if (response?.data?.code === 110) {
          this.initMbankRes = response.data.data;
          this.mbank.payId = response.data.data.quid;
          this.mbank.openConfirm = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async iniPaymentMegapay(params: any, orderNumber: string) {
      try {
        const response = await http.post(
          `/api/v1/Payment/initiate-payment-megapay?orderNumber=${orderNumber}`,
          params,
        );
        if (response.data.code === "152") {
          this.megapay.otp.error = "Неправильный пин-код";
        } else if (response.data.code === "120") {
          this.megapay.status = "Платеж оформлен";
          this.megapay.payId = response.data.data.transactionId;
          this.checkPaymentStatusMega(response.data?.data?.transactionId);
        }
        console.log("response iniPaymentMegapay", response);
      } catch (err) {
        console.log(err);
      }
    },
    async initPaymentElcart() {
      const cartStore = useCartStore();
      try {
        const response = await http({
          method: "post",
          url: "/api/v1/Payment/initiate-payment-elcart",
          params: {
            orderNumber: cartStore.getCurrentOrder?.orderNumber,
            amount: cartStore?.getCurrentOrder?.total,
            language: "en",
          },
        });
        console.log("response init payment elcart", response);
      } catch (err) {
        console.log(err);
      }
    },

    async checkPayment(
      params: any,
      orderNumber: string,
      type: "mbank" | "megapay",
    ) {
      console.log("checkpayment orderNumber", orderNumber);
      try {
        const response = await http.get(
          "/api/v1/Payment/check-payment-mega-mbank",
          {
            params,
          },
        );
        console.log("check payment response", response);
        if (type === "mbank") {
          if (response.data.code === "404") {
            this.mbank.mbankPhone.error = "Пользователь не найден";
          }
          if (
            response.status === 200 &&
            response.data.message === "USER_FOUND"
          ) {
            this.mbank.mbankPhone.error = "";
            this.iniPaymentMbank(params, orderNumber);
          }
        } else if (type === "megapay") {
          if (
            response.data.code === "110" &&
            response.data.message === "CREATED"
          ) {
            this.megapay.openConfirm = true;
            // const paramsObj = {
            //   account: params.account,
            //   amount: params.amount
            // };
            // this.iniPaymentMegapay()
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
    getMbank(state) {
      return state.mbank;
    },
    getMega(state) {
      return state.megapay;
    },
    getExit(state) {
      return state.canExit;
    },
  },
});
