import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null;
  token: string | null;
  admin?: boolean;
}

const initialState: AuthState = JSON.parse(
  localStorage.getItem("auth") || "null"
) || {
  user: null,
  token: null,
  admin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // update redux & add in localstorage
    login: (
      state,
      action: PayloadAction<{ user: string; token: string; admin?: boolean }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.admin = action.payload.admin ?? false;

      localStorage.setItem("auth", JSON.stringify(state));
    },
    // update redux & remove auth from localstorage
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.admin = false;
      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
