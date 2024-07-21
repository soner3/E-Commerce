import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "../interfaces";
import { jwtDecode } from "jwt-decode";

export interface TokenType {
  access: string;
  refresh: string;
  username: string;
  loading: boolean;
  error: boolean;
  logedIn: boolean;
}

const initialState: TokenType = {
  access: "",
  refresh: "",
  username: "",
  loading: false,
  error: false,
  logedIn: false,
};

interface LoginPayload {
  username_or_email: string;
  password: string;
}

interface RefreshPayload {
  refresh: string;
}

export const fetchToken = createAsyncThunk<
  TokenType,
  LoginPayload,
  AsyncThunkConfig
>("token/getToken", async (payload) => {
  const res = await fetch("http://localhost:8000/api/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username_or_email: payload.username_or_email,
      password: payload.password,
    }),
  });

  const data = await res.json();
  return data;
});

export const fetchRefreshToken = createAsyncThunk<
  TokenType,
  RefreshPayload,
  AsyncThunkConfig
>("token/getRefreshToken", async (payload) => {
  const res = await fetch("http://localhost:8000/api/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: payload.refresh,
    }),
  });

  const data = await res.json();
  return data;
});

const tokenSlice = createSlice({
  name: "token",
  initialState: initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        if (action.payload.access && action.payload.username) {
          state.access = action.payload.access;
          state.username = action.payload.username;
          state.refresh = action.payload.refresh;
        }

        state.logedIn = true;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchToken.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });

    builder
      .addCase(fetchRefreshToken.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchRefreshToken.fulfilled, (state, action) => {
        state.access = action.payload.access;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchRefreshToken.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default tokenSlice.reducer;

interface DecodedToken {
  exp: number;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Fehler beim Decodieren des Tokens:", error);
    return true;
  }
};
