import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useSessionStore = defineStore({
  id: "SessionStore",
  state: () => ({
    authToken: "",
    authUser: null,
    authLoading: true,
    isAdmin: () => {
      return this.authUser.type === "ADMIN";
    },
  }),
  actions: {
    setAuthToken(token) {
      this.authToken = token;
    },
    setAuthUser(user) {
      this.authUser = user;
    },
    setIsAuthLoading(value) {
      this.authLoading = value;
    },
    login({ username, password }) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await $fetch("/api/auth/login", {
            method: "POST",
            body: {
              username,
              password,
            },
          });
          this.setAuthToken(data.accessToken);
          this.setAuthUser(data.user);
          navigateTo("/");
          resolve(true);
        } catch (err) {
          reject(err);
        }
      });
    },
    refreshToken() {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await $fetch("/api/auth/refresh", {
            method: "POST",
          });
          this.setAuthToken(data.accessToken);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },
    reRefreshAccessToken() {
      const authToken = this.authToken;
      if (!authToken) {
        return;
      }
      const jwt = jwtDecode(authToken);

      const newRefreshTime = jwt.exp - 60000;

      setTimeout(async () => {
        await this.refreshToken();
        this.reRefreshAccessToken();
      }, newRefreshTime);
    },
    getUser() {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await useFetchApi("/api/auth/user");
          this.setAuthUser(data.user);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },
    logout() {
      return new Promise(async (resolve, reject) => {
        try {
          await $fetch("/api/auth/logout", {
            method: "POST",
          });
          this.setAuthToken(null);
          this.setAuthUser(null);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },
    initAuth() {
      return new Promise(async (resolve, reject) => {
        this.setIsAuthLoading(true);

        try {
          await this.refreshToken();
          await this.getUser();
          this.reRefreshAccessToken();
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});
