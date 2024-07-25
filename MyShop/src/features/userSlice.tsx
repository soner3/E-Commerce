import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthType, UserType } from "../interfaces";

const initialState: AuthType = {
  user: null,
  isAuthenticated: false,
};

const user: UserType = {
  name: "Max",
  username: "max10",
  email: "max@mustermann.com",
  password: "maxmustermann",
};

interface LoginData {
  usernameOrEmail: string;
  password: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: {
      prepare(loginData: LoginData) {
        return {
          payload: {
            usernameOrEmail: loginData.usernameOrEmail,
            password: loginData.password,
          },
        };
      },

      reducer(state, action: PayloadAction<LoginData>) {
        if (state.user !== null) {
          return;
        } else {
          if (
            (action.payload.usernameOrEmail === user.username ||
              action.payload.usernameOrEmail === user.email) &&
            action.payload.password === user.password
          ) {
            state.user = user;
            state.isAuthenticated = true;
          }
        }
      },
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
