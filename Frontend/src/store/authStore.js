import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  login: (data) =>
    set({
      user: data.data,
      token: data.data.accessToken,
    }),

  logout: () =>
    set({
      user: null,
      token: null,
    }),
}));