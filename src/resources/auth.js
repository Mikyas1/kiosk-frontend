import store from "./store"; // your vuex store

export function NonAuth(to, from, next) {
  if (!store.getters["auth/loggedIn"]) {
    next();
    return;
  }
  next("/dashboard");
}

export function Auth(to, from, next) {
  if (store.getters["auth/loggedIn"]) {
    next();
    return;
  }
  next("/login");
}
