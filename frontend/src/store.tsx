import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebarSlice";
import productsReducer from "./features/productsSlice";
import searchReducer from "./features/searchSlice";
import cartReducer from "./features/cartSlice";
import tokenReducer from "./features/tokenSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    products: productsReducer,
    search: searchReducer,
    cart: cartReducer,
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
