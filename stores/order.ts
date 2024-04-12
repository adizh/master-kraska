import { User } from "@/types/User";
export const useOrderStore = defineStore("orderStore", {
  state: () => ({
    delForm: {
      name: { value: "", error: "", type: "string" },
      lastName: { value: "", error: "", type: "string" },
      email: { value: "", error: "", type: "email" },
      phone: { value: "", error: "", type: "string" },
      city: { value: "", error: "", type: "string" },
      address: { value: "", error: "", type: "string" },
      comment: { value: "", error: "" },
    },
  }),
  actions: {
    handleValues(
      fieldName: keyof typeof this.delForm,
      validationType: string | any
    ) {
      const value = this.delForm[fieldName].value;
      this.delForm[fieldName].value = value;

      this.delForm[fieldName].error = "";

      console.log("validationType", validationType);
      console.log("value", value);
      if (validationType === "string") {
        if (value === "" || value == null) {
          this.delForm[fieldName].error = "Это поле обязательно";
        }
      } else if (validationType === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          this.delForm[fieldName].error = "Неправильный формат почты";
        }
      }
      console.log("delForm", this.delForm);
    },

    setInitUser(user: any) {
      this.delForm.name.value = user?.firstName;
      this.delForm.lastName.value = user?.lastName;
      this.delForm.address.value = user?.address;
      this.delForm.email.value = user?.email;
      this.delForm.phone.value = user?.phone;
    },
    async sendOrder(body: any) {
      try {
        const response = await http.post("/api/v1/Order/order-delivery", body);
        console.log("send order response", response);
        return response;
      } catch (err) {
        console.log(err);
      }
    },

    async fetchOrderById(id: string) {
      const cartStore = useCartStore();
      try {
        const response = await http.get(`/api/v1/Order/get-order-id/${id}`);
        if (response.status === 200) {
          //  orderById.value = response.data;
          cartStore.setCurrentOrder(response.data);

          console.log("reposne fetch single order", response);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
    deliveryForm(state) {
      return state.delForm;
    },
  },
});
