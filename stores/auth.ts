import http from "@/composables/http";
import { Roles } from "~/types/User";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: {
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      email: "",
      image: "",
      isNotificationsAllowed: false,
      accessToken: ""
    },
    isRefreshTokenSuccess: false,
    selectedLanguage: '',
  }),
  actions: {
    async fetchUser () {
      const accessToken = localStorage.getItem("token");
      if (this.getUserId) {
        try {
          const response = await http(
            `/api/v1/User/get-user-by-id/${this.getUserId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
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
        } catch (err: any) {
          console.log(err);
          if (err.response.status === 401) {
            this.refreshToken("static");
          }
        }
      }
    },

    setLang (lang: string) {
      const route = useRoute();
      if(route.query?.lang){
        this.selectedLanguage = lang;
      }
    },

    async refreshToken (type?: "static") {
      const accessToken = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refresh_Token");
      if (accessToken && refreshToken) {
        try {
          const response = await http.post("/api/v1/User/refresh", {
            access_Token: accessToken,
            refresh_Token: refreshToken
          });
          console.log("response refreshToken", response);

          if (response.status === 200) {
            this.isRefreshTokenSuccess = true;

            console.log("access_Token", response.data?.tokens?.access_Token);
            console.log("refresh_Token", response.data?.tokens?.refresh_Token);
            localStorage.setItem("token", response.data.tokens.access_Token);
            localStorage.setItem(
              "refresh_Token",
              response.data.tokens.refresh_Token
            );
            this.user.accessToken = response.data?.tokens?.access_Token;
            if (type !== "static") {
              useNotifLocal("success", "sendAgaingRequest", "success");
            }

            if (type === "static") {
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          } else {
            this.isRefreshTokenSuccess = false;
          }
        } catch (err) {
          console.log(err);
          this.isRefreshTokenSuccess = false;
        }
      }
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
    getAccessToken (state) {
      return state.user.accessToken;
    },
    getRole(): Roles {
      if (process.client) {
        const roleLocal = localStorage.getItem("role") as Roles;
    
        if (roleLocal!==undefined) {
          return roleLocal;
        }else{
         // return undefined; 
        }
      }
     
    },
    getRegreshTokenStatus (state) {
      
      return state.isRefreshTokenSuccess;
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
