import axios from "axios";
export default function(Vue) {
  Vue.auth = {
    setToken(token, expiration) {
      localStorage.setItem("token", token);
      localStorage.setItem("expiration", expiration);
      axios.defaults.headers.common = {
        Authorization: "Bearer " + this.getToken()
      };
      // Vue.http.headers.common['Authorization'] = 'Bearer ' + this.getToken();
    },
    getToken() {
      var token = localStorage.getItem("token");
      var expiration = localStorage.getItem("expiration");
      if (!token || !expiration) return null;
      if (Date.now() > parseInt(expiration)) {
        this.destroyToken();
        return null;
      } else return token;
    },
    destroyToken() {
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
      this.destroyUser();
    },
    setUserName(user_name) {
      localStorage.setItem("user_name", user_name);
    },

    getUserName() {
      var user_name = localStorage.getItem("user_name");
      return user_name ? user_name : null;
    },
    setUserId(user_id) {
      localStorage.setItem("user_id", user_id);
    },

    getUserId() {
      var user_id = localStorage.getItem("user_id");
      return user_id ? user_id : null;
    },
    destroyUser() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_id");
    },
    isAuthenticated() {
      return this.getToken() ? true : false;
    },
    haveUser() {
      return this.getUserName() && this.getUserId() ? true : false;
    }
  };
  Object.defineProperties(Vue.prototype, {
    $auth: {
      get: () => {
        return Vue.auth;
      }
    }
  });
}
