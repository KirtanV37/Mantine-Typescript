import { ROLES, APP_TITLE } from "../utils/constants";

export const PLAIN_ROUTES = {
  root: { path: "/", url: "/", title: APP_TITLE },
  layout: {
    path: "/",
  },
  INDEX: {
    index: true,
    title: "Welcome",
    url: "/",
  },
  LOGIN: {
    title: "Login",
    path: "/login",
    url: "/login",
  },
  REGISTER: {
    title: "Register",
    path: "/register",
    url: "/register",
  },
  FORGOT_PASSWORD: {
    title: "Forgot Password",
    url: "/forgot-password",
    path: "/forgot-password",
  },
};

export const AUTH_ROUTES = {
  layout: {
    path: "/admin",
  },
  INDEX: {
    index: true,
    title: "Welcome",
    url: "/admin",
  },
  DASHBOARD: {
    roles: [ROLES.ADMIN],
    title: "Admin Dashboard",
    url: "/admin/users",
    path: "/admin/users",
  },
  TASKS: {
    roles: [ROLES.ADMIN],
    title: "All Tasks",
    url: "/admin/tasks",
    path: "/admin/tasks",
  },
};

export const PRIVATE_ROUTES = {
  layout: {
    path: "/user",
  },
  INDEX: {
    index: true,
    title: "Welcome",
    url: "/user",
  },
  USER_DASHBOARD: {
    roles: [ROLES.USER],
    title: "User Dashboard",
    url: "/user/dashboard",
    path: "/user/dashboard",
  },
  USER_TASK: {
    roles: [ROLES.USER],
    title: "Task Creation",
    url: "/user/add-task",
    path: "/user/add-task",
  },
};

/*
// Plain-routes:- everyone
// Private-routes:- authenticated person
// Protected-routes:- authenticated + role
*/
