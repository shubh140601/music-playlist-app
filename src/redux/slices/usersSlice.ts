import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  username: string;
  password: string;
  admin?: boolean;
}

// fetch users froom local storage if exisst
const storedUsers = localStorage.getItem("users");

let initialState: User[];

// to handle other cases of login added this try catch
// case:handle new user created login than logout than admin user login
try {
  const parsed = storedUsers ? JSON.parse(storedUsers) : null;
  initialState = Array.isArray(parsed)
    ? parsed
    : [
        {
          username: "shubham",
          password: "1234",
          admin: true,
        },
      ];
} catch (error) {
  console.error("Invalid users data in localStorage:", error);
  initialState = [
    {
      username: "shubham",
      password: "1234",
      admin: true,
    },
  ];
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state));
    },
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
