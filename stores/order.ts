import { AddressList } from "@/types/Items";
import { Order, OrderItem, UserOrder } from "~/types/Order";
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
      houseNumber: { value: "", error: "", type: "string" },
      floorNumber: { value: "", error: "" },
      blockNumber: { value: "", error: "" },
    },

    selectedStatus:'',
    shops: [] as AddressList[],
    orders:{  "page": 0,
    "pageSize": 0,
    "totalItems": 0,
    "totalPages": 0,
    "items": []} as {page:number,pageSize:number, totalItems:number, totalPages:number, items:OrderItem[]}
  }),
  actions: {
    handleValues(
      fieldName: keyof typeof this.delForm,

      validationType: string | any,
    ) {
      const value = this.delForm[fieldName].value;
      this.delForm[fieldName].value = value;

      this.delForm[fieldName].error = "";

      if (fieldName === "phone" && !value.startsWith("+996")) {
        this.delForm[fieldName].error = "incorrectPhone";
      }

      if (validationType === "string") {
        if (value === "" || value == null) {
          this.delForm[fieldName].error = "requiredField";
        }
      } else if (validationType === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          this.delForm[fieldName].error = "incorrectEmail";
        }
      }
    },

    async fetchAllShops() {
      const authStore = useAuthStore();
      try {
        const response = await http("/api/v1/Order/get-all-shops");
        if (response.status === 200) {
          this.shops = response.data.map((shop: AddressList) => {
            if (authStore.getSelectedLang === "kg") {
              return { ...shop, name: shop?.nameKg, address: shop?.addressKg };
            } else {
              return { ...shop, name: shop?.nameRu, address: shop?.addressRu };
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    setInitUser(user: any) {
      this.delForm.name.value = user?.firstName;
      this.delForm.lastName.value = user?.lastName;
      this.delForm.address.value = user?.address;
      this.delForm.email.value = user?.email;
      this.delForm.phone.value = user?.phone;
    },
    async sendOrder(body: any, deliveryType: number) {
      try {
        const response = await http.post("/api/v1/Order/order-delivery", body);
        console.log("send order response", response);
        if (response.data.code === 200 && deliveryType === 0) {
          useNotifLocal("success", "orderSent!", "success");
        }
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
          cartStore.setCurrentOrder(response.data);
          console.log("reposne fetch single order", response);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async createOrder() {
      const cartStore = useCartStore();
      const authStore = useAuthStore();
      // isConfirmOpen.value = false;
      const allOrderItems = [] as Order[];
      for (const item of cartStore.getAllCart) {
        allOrderItems.push({
          customerId: authStore.getUserId ? authStore.getUserId : "",
          productId: item?.id,
          productName: item?.name,
          price: item?.initPrice,
          quantity: item?.count,
        });
      }
      try {
        const response = await http.post(
          "/api/v1/Order/create-order",
          allOrderItems,
        );
        console.log("response create order", response);
        if (response.status === 200) {
          useNotifLocal("success", "orderSent", "success");
          cartStore.setCurrentOrder(response?.data?.message);
          console.log("response data mesage", response?.data?.message);
          if (response.data.code === 200) {
            return navigateTo(`/place-order/${response.data?.message?.id}`);
          }
        }
      } catch (err: any) {
        console.log(err, "some err ");
        if (err?.response?.data?.code === 400) {
          //  isConfirmOpen.value = false;
        }
      }
    },
    setOrderAddress(value: string) {
      this.delForm.address.value = value;
    },
    setOrderCity(value: string) {
      this.delForm.city.value = value;
    },

    updateStatus(value:string){
this.selectedStatus= value;
console.log('updateStatus value',value)
this.fetchOrders()
    },

    async fetchOrders(){
      try{
        let params:{page:number,pageSize:number,statusType?:string}={
            page:1,
            pageSize:10
        }

        if(this.selectedStatus?.length>0){
          params['statusType']=this.selectedStatus
        }
        const response = await http({
          method:'GET',
          url:'api/v1/Order/get-all-orders',
        params:params
        });
        if(response.status===200){
this.orders.items= response.data.items
console.log('response data',response.data)
        }
      }catch(err){
        console.log(err)
      }
    }
  },
  getters: {
    deliveryForm(state) {
      return state.delForm;
    },
    getShops(state) {
      return state.shops;
    },
    getAllOrders(state){
      return state.orders.items
    }
  },
});
