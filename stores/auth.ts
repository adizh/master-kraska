import http from "@/composables/http";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: {
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      email: "",
      image: "",
    },
    selectedLanguage: "ru",
  }),
  actions: {
    async fetchUser() {
      if (this.getUserId) {
        try {
          const response = await http(
            `/api/v1/User/get-user-by-id/${this.getUserId}`
          );
          console.log("response fetchUser", response);
          this.user.firstName = response.data.message.firstName;
          this.user.lastName = response.data.message.lastName;
          this.user.address = response.data.message.address;
          this.user.phone = response.data.message.phoneNumber;
          this.user.email = response.data.message.email;
          this.user.image = response.data.message.image;
        } catch (err) {
          console.log(err);
        }
      }
    },

    setLang(lang: string) {
      this.selectedLanguage = lang;
    },
  },
  getters: {
    getUserId: () => {
      if (process.client) {
        return localStorage.getItem("userId")
          ? localStorage.getItem("userId")
          : "";
      }
    },
    getSelectedLang(state) {
      if (process.client) {
        const localLan = localStorage.getItem("selectedLanguage");
        if (localLan) {
          return localLan;
        }
      }
      return state.selectedLanguage;
    },
    getUser: (state) => {
      return state.user;
    },
  },
});
