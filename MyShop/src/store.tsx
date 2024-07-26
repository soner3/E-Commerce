import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebarSlice";
import searchReducer from "./features/searchSlice";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/userSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    search: searchReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
