import client, { METHODS } from "./client";

export const api = {
  users: {
    getAll: ({ data, ...configs }: { data?: any; [key: string]: any }) =>
      client({ url: "/users", data, ...configs }),
    get: ({
      id,
      data,
      ...configs
    }: {
      id?: number;
      data?: any;
      [key: string]: any;
    }) => client({ url: `/users/${id}`, data, ...configs }),
    patch: ({
      id,
      data,
      ...configs
    }: {
      id?: number;
      data?: any;
      [key: string]: any;
    }) =>
      client({ method: METHODS.PATCH, url: `/users/${id}`, data, ...configs }),
    create: ({ data, ...configs }: { data?: any; [key: string]: any }) =>
      client({ method: METHODS.POST, url: "/users", data, ...configs }),
  },
  tasks: {
    getAll: ({ data, ...configs }: { data?: any; [key: string]: any }) =>
      client({
        url: "/tasks",
        data,
        ...configs,
      }),
  },
  auth: {
    register: ({ data, ...configs }: { data: any; [key: string]: any }) =>
      client({
        url: "/register",
        method: METHODS.POST,
        data,
        ...configs,
      }),
    login: ({ data, ...configs }: { data: any; [key: string]: any }) =>
      client({
        url: "/login",
        method: METHODS.POST,
        data,
        ...configs,
      }),
    forgotPassword: ({ data, ...configs }: { data: any; [key: string]: any }) =>
      client({
        url: "/forgot-password",
        method: METHODS.POST,
        data,
        ...configs,
      }),
  },
};
