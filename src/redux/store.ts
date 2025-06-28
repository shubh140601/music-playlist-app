import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import playlistReducer from "./slices/playlistSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // for auth-login, logout
    playlists: playlistReducer, // to store playlist
    users: usersReducer, // to store all created users
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
