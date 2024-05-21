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
      isNotificationsAllowed: false
    },
    selectedLanguage: "ru"
  }),
  actions: {
    async fetchUser () {
      if (this.getUserId) {
        try {
          const response = await http(
            `/api/v1/User/get-user-by-id/${this.getUserId}`
          );
          console.log("response fetchUser", response);
          this.user.firstName = response.data.firstName;
          this.user.lastName = response.data.lastName;
          this.user.address = response.data.address;
          this.user.phone = response.data.phoneNumber;
          this.user.email = response.data.email;
          this.user.image = response.data.image;
          this.user.isNotificationsAllowed =
            response.data.isNotificationsAllowed;
        } catch (err) {
          console.log(err);
        }
      }
    },

    setLang (lang: string) {
      this.selectedLanguage = lang;
    }
  },
  getters: {
    getUserId: () => {
      if (process.client) {
        return localStorage.getItem("userId")
          ? localStorage.getItem("userId")
          : "";
      }
    },

    getRole () {
      if (process.client) {
        const role = localStorage.getItem("role");
        if (role) {
          return role;
        }
      } else {

      }
    },
    getSelectedLang (state) {
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
    }
  }
});
